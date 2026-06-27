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

const snap=await db.collection("products").get();

for(const doc of snap.docs){

 const p=doc.data();

 if(
   p.color!=="Unknown" &&
   p.style!=="Casual"
 ){
   continue;
 }

 const imageUrl=
   "https://guess360.com.pk" + p.image;

 console.log("AI:",doc.id);

 try{

   const r=
   await openai.chat.completions.create({
     model:"gpt-4o-mini",
     response_format:{type:"json_object"},
     messages:[
       {
         role:"user",
         content:[
           {
             type:"text",
             text:`Analyze fashion product.

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
               url:imageUrl
             }
           }
         ]
       }
     ]
   });

   const meta=
     JSON.parse(
       r.choices[0].message.content
     );

   await doc.ref.update({
     name:meta.name || p.name,
     color:meta.color || p.color,
     category:meta.category || p.category,
     style:meta.style || p.style,
     description:
       meta.description || p.description
   });

   console.log("UPDATED:",meta.name);

 }catch(e){

   console.log(
     "FAILED:",
     doc.id,
     e.message
   );

 }

}

console.log("ENRICHMENT COMPLETE");

})();
