const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const CMS = path.join(process.cwd(), "data/cms/products.json");
const IMG_DIR = path.join(process.cwd(), "public/products");

const cms = JSON.parse(fs.readFileSync(CMS, "utf8"));

const existingImages = new Set();
const existingGallery = new Set();
const existingNames = new Set();
const existingSlugs = new Set();

for (const p of cms) {
    if (p.image)
        existingImages.add(p.image.toLowerCase());

    if (Array.isArray(p.gallery)) {
        for (const g of p.gallery)
            existingGallery.add(String(g).toLowerCase());
    }

    if (p.name)
        existingNames.add(String(p.name).trim().toLowerCase());

    if (p.slug)
        existingSlugs.add(String(p.slug).trim().toLowerCase());
}

const files = fs.readdirSync(IMG_DIR)
    .filter(f => /\.(png|jpg|jpeg|webp)$/i.test(f))
    .sort();

let added = 0;
let skipped = 0;

for (const file of files) {

    const img = "/products/" + file;
    const slug = file.replace(/\.[^.]+$/, "").toLowerCase();
    const name =
        slug
            .replace(/[_-]+/g, " ")
            .replace(/\b\w/g, c => c.toUpperCase());

    if (
        existingImages.has(img.toLowerCase()) ||
        existingGallery.has(img.toLowerCase()) ||
        existingSlugs.has(slug) ||
        existingNames.has(name.toLowerCase())
    ) {
        skipped++;
        continue;
    }

    cms.push({
        id: crypto.randomUUID(),
        name,
        slug,
        description: "",
        category: "Uncategorized",
        color: "Unknown",
        image: img,
        gallery: [img],
        price: 0,
        featured: false,
        trending: false,
        newArrival: false,
        bestSeller: false,
        variants: [{
            sku: crypto.randomUUID(),
            size: "Default",
            color: "Default",
            stock: 0,
            price: 0
        }]
    });

    existingImages.add(img.toLowerCase());
    existingSlugs.add(slug);
    existingNames.add(name.toLowerCase());

    added++;
}

const backup =
    CMS +
    "." +
    new Date().toISOString().replace(/[:.]/g, "-") +
    ".bak";

fs.copyFileSync(CMS, backup);

fs.writeFileSync(
    CMS,
    JSON.stringify(cms, null, 2)
);

console.log("--------------------------------");
console.log("Backup :", backup);
console.log("Existing:", cms.length - added);
console.log("Added   :", added);
console.log("Skipped :", skipped);
console.log("Total   :", cms.length);
console.log("--------------------------------");
