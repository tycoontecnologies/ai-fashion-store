import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(),"data","cms");

export function readJson(file:string, fallback:any=[]){
  try{
    return JSON.parse(
      fs.readFileSync(path.join(DATA_DIR,file),"utf8")
    );
  }catch{
    return fallback;
  }
}

export function writeJson(file:string,data:any){
  fs.writeFileSync(
    path.join(DATA_DIR,file),
    JSON.stringify(data,null,2)
  );
}
