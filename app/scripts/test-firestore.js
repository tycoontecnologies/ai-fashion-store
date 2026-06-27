const admin=require("firebase-admin");
const sa=require("./firebase-service-account.json");

admin.initializeApp({
  credential:admin.credential.cert(sa)
});

(async()=>{

const db=admin.firestore();

const snap=await db.collection("products").limit(5).get();

console.log("COUNT:",snap.size);

snap.forEach(doc=>{
  console.log(doc.id,doc.data().name);
});

process.exit(0);

})();
