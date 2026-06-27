const fs=require("fs");
const path=require("path");
const admin=require("firebase-admin");
const OpenAI=require("openai").OpenAI;

const sa=require("../firebase-service-account.json");

admin.initializeApp({
 credential:admin.credential.cert(sa)
});

const db=admin.firestore();

const openai=new OpenAI({
 apiKey:process.env.OPENAI_API_KEY
});

(async()=>{

 const snap=
 await db.collection("products").get();

 for(const doc of snap.docs){

   const p=doc.data();

   if(
     p.color!=="Unknown" &&
     p.style!=="Casual"
   ){
     continue;
   }

   try{

     const img=
       path.join(
         __dirname,
         "..",
         "public",
         p.image
       );

     if(!fs.existsSync(img)){
       console.log("MISSING:",img);
       continue;
     }

     const base64=
       fs.readFileSync(img)
       .toString("base64");

     console.log("AI:",p.image);

     const result=
     await openai.chat.completions.create({

       model:"gpt-4o-mini",

       response_format:{
         type:"json_object"
       },

       messages:[
         {
           role:"user",
           content:[
             {
               type:"text",
               text:`Analyze fashion item.

Return JSON:

{
 "name":"",
 "color":"",
 "category":"",
 "style":"",
 "description":""
}`
             },
             {
               type:"image_url",
               image_url:{
                 url:`data:image/png;base64,${base64}`
               }
             }
           ]
         }
       ]
     });

     const meta=
       JSON.parse(
         result.choices[0]
         .message.content
       );

     await doc.ref.update({

       name:
         meta.name ||
         p.name,

       color:
         meta.color ||
         p.color,

       category:
         meta.category ||
         p.category,

       style:
         meta.style ||
         p.style,

       description:
         meta.description ||
         p.description

     });

     console.log(
       "UPDATED:",
       meta.name
     );

   }catch(err){

     console.log(
       "FAILED:",
       doc.id,
       err.message
     );

   }

 }

 console.log(
   "ENRICHMENT COMPLETE"
 );

})();
