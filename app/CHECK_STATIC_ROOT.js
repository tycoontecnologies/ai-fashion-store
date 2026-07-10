const fs = require("fs");
const path = require("path");

console.log("process.cwd() =", process.cwd());

const publicDir = path.join(process.cwd(), "public");
const uploadsDir = path.join(publicDir, "uploads", "products");

console.log("public exists:", fs.existsSync(publicDir));
console.log("uploads exists:", fs.existsSync(uploadsDir));

if (fs.existsSync(uploadsDir)) {
    const files = fs.readdirSync(uploadsDir).slice(-10);
    console.log("\nRecent upload files:");
    console.log(files);
}

const target = path.join(
    uploadsDir,
    "1783612199596-4.png"
);

console.log("\nTarget exists:", fs.existsSync(target));

if (fs.existsSync(target)) {
    console.log("Size:", fs.statSync(target).size);
}
