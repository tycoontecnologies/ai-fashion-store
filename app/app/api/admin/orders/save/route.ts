import fs from "fs";
import path from "path";

const file=
path.join(
 process.cwd(),
 "data/orders.json"
);

export async function POST(req:any){

 const body=await req.json();

 let orders=[];

 try{
  orders=JSON.parse(
   fs.readFileSync(file,"utf8")
  );
 }catch{}

 orders.unshift({
  id:Date.now(),
  ...body
 });

 fs.writeFileSync(
  file,
  JSON.stringify(
   orders,
   null,
   2
  )
 );

 return Response.json({
  success:true
 });

}
