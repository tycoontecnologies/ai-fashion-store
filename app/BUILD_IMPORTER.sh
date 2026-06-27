#!/bin/bash
set -e

mkdir -p scripts imports logs

cat > scripts/import_products.js << 'NODE'
const fs = require("fs");
const path = require("path");
const admin = require("firebase-admin");
const { OpenAI } = require("openai");

const serviceAccount = require("../firebase-service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "guess360-d6c98.firebasestorage.app"
});

const db = admin.firestore();
const bucket = admin.storage().bucket();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const SOURCE = "/root/import_products";
const REPORT = [];
const IMPORTED_FILE = "imports/imported.json";

let imported = [];
if (fs.existsSync(IMPORTED_FILE)) {
  imported = JSON.parse(fs.readFileSync(IMPORTED_FILE,"utf8"));
}

(async () => {

  const files = fs.readdirSync(SOURCE)
    .filter(f => /\.(png|jpg|jpeg|webp)$/i.test(f))
    .sort();

  let counter = imported.length;

  for (const file of files) {

    if (imported.includes(file)) continue;

    counter++;

    const ext = path.extname(file);
    const newName =
      `product_${String(counter).padStart(4,"0")}${ext}`;

    const localPath =
      path.join(SOURCE,file);

    console.log("IMPORTING:",file);

    const destination =
      `products/${newName}`;

    await bucket.upload(localPath,{
      destination
    });

    const firebaseFile =
      bucket.file(destination);

    await firebaseFile.makePublic();

    const imageUrl =
      `https://storage.googleapis.com/${bucket.name}/${destination}`;

    const ai =
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
                image_url:{url:imageUrl}
              }
            ]
          }
        ]
      });

    const meta =
      JSON.parse(
        ai.choices[0].message.content
      );

    await db.collection("products").add({
      name: meta.name || newName,
      color: meta.color || "Unknown",
      category: meta.category || "Fashion",
      style: meta.style || "Casual",
      description: meta.description || "",
      image: imageUrl,
      price: 2990,
      createdAt: new Date().toISOString()
    });

    imported.push(file);

    fs.writeFileSync(
      IMPORTED_FILE,
      JSON.stringify(imported,null,2)
    );

    REPORT.push({
      file,
      imageUrl,
      name: meta.name
    });

    console.log("DONE:",file);
  }

  fs.writeFileSync(
    "imports/import_report.json",
    JSON.stringify(REPORT,null,2)
  );

  console.log("IMPORT COMPLETE");
})();
NODE

echo "READY"
