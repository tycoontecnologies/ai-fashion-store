import fs from "fs";
import path from "path";

const file=
path.join(
 process.cwd(),
 "data/orders.json"
);

export async function GET(){

 let orders=[];

 try{
  orders=JSON.parse(
   fs.readFileSync(file,"utf8")
  );
 }catch{}

 return Response.json(orders);
}
