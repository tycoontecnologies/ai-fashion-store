import fs from "fs";
import path from "path";

const filePath = path.join(
 process.cwd(),
 "data/cms/products.json"
);


export function getLocalProducts(){

 if(!fs.existsSync(filePath)){
  return [];
 }

 return JSON.parse(
  fs.readFileSync(filePath,"utf8")
 );

}
