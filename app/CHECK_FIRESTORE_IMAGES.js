const { initializeApp } = require("firebase/app");
const {
  getFirestore,
  collection,
  getDocs
} = require("firebase/firestore");

require("dotenv").config({ path: ".env.local" });

const app = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
});

const db = getFirestore(app);

(async () => {
  const snap = await getDocs(collection(db, "products"));

  snap.forEach(doc => {
    const p = doc.data();

    console.log("====================================");
    console.log("ID:", doc.id);
    console.log("NAME:", p.name);
    console.log("IMAGE:", p.image);

    if (Array.isArray(p.gallery))
      console.log("GALLERY:", p.gallery);

    if (Array.isArray(p.variants)) {
      p.variants.forEach((v,i)=>{
        console.log(
          "VARIANT",
          i,
          "IMAGE:",
          v.image
        );
      });
    }
  });
})();
