const admin = require("firebase-admin");
const sa = require("./firebase-service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(sa)
});

console.log("PROJECT:", sa.project_id);
console.log("OPEN THIS URL:");
console.log(`https://console.firebase.google.com/project/${sa.project_id}/storage`);
