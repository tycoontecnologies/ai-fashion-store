const fs = require("fs");

const file = "./public/data/products.json";

if (!fs.existsSync(file)) {
  console.log("products.json not found");
  process.exit(0);
}

const products = JSON.parse(fs.readFileSync(file));

products.forEach((p,index)=>{
  if(p.name.startsWith("product_")){
    p.pendingAiNaming = true;
    p.pendingCategory = true;
  }
});

fs.writeFileSync(
  file,
  JSON.stringify(products,null,2)
);

console.log("AI naming queue prepared");
