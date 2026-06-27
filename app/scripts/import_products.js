const fs = require("fs");
const path = require("path");
const admin = require("firebase-admin");
const { OpenAI } = require("openai");

const serviceAccount = require("../firebase-service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const SOURCE = "/root/import_products";
const PUBLIC = "/root/ai-fashion-store/public/products";

const REPORT = [];
const IMPORTED_FILE = "imports/imported.json";

if (!fs.existsSync("imports")) fs.mkdirSync("imports");
if (!fs.existsSync(PUBLIC)) fs.mkdirSync(PUBLIC,{recursive:true});

let imported = [];

if (fs.existsSync(IMPORTED_FILE)) {
  imported = JSON.parse(
    fs.readFileSync(IMPORTED_FILE,"utf8")
  );
}

(async()=>{

  const files =
    fs.readdirSync(SOURCE)
      .filter(f =>
        /\.(png|jpg|jpeg|webp)$/i.test(f)
      )
      .sort();

  let counter = imported.length;

  for(const file of files){

    if(imported.includes(file))
      continue;

    counter++;

    const ext =
      path.extname(file);

    const newName =
      `product_${String(counter).padStart(4,"0")}${ext}`;

    const src =
      path.join(SOURCE,file);

    const dst =
      path.join(PUBLIC,newName);

    console.log("IMPORTING:",file);

    fs.copyFileSync(src,dst);

    const imageUrl =
      `/products/${newName}`;

    await db.collection("products").add({

      name:
        path.basename(
          newName,
          ext
        ),

      color:"Unknown",
      category:"Fashion",
      style:"Casual",
      description:"",
      image:imageUrl,
      price:2990,
      createdAt:new Date().toISOString()

    });

    imported.push(file);

    fs.writeFileSync(
      IMPORTED_FILE,
      JSON.stringify(
        imported,
        null,
        2
      )
    );

    REPORT.push({
      file,
      imageUrl
    });

    console.log("DONE:",file);
  }

  fs.writeFileSync(
    "imports/import_report.json",
    JSON.stringify(
      REPORT,
      null,
      2
    )
  );

  console.log("IMPORT COMPLETE");

})();
