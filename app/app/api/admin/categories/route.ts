import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const FILE = path.join(
  process.cwd(),
  "data",
  "cms",
  "categories.json"
);

function read(){
  if(!fs.existsSync(FILE)) return [];
  return JSON.parse(fs.readFileSync(FILE,"utf8"));
}

function write(data:any[]){
  fs.writeFileSync(
    FILE,
    JSON.stringify(data,null,2)
  );
}

export async function GET(){
  return NextResponse.json(read());
}

export async function POST(req:Request){

  const body = await req.json();

  const categories = read();

  const item={
    id:Date.now().toString(),
    name:body.name,
    slug:body.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g,"-")
  };

  categories.push(item);

  write(categories);

  return NextResponse.json(item);
}

export async function PUT(req:Request){

  const body=await req.json();

  const categories=read();

  const updated=categories.map((c:any)=>
    c.id===body.id
    ? {
        ...c,
        name:body.name,
        slug:body.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g,"-")
      }
    : c
  );

  write(updated);

  return NextResponse.json({success:true});
}

export async function DELETE(req:Request){

  const body=await req.json();

  const categories=
    read().filter(
      (c:any)=>c.id!==body.id
    );

  write(categories);

  return NextResponse.json({success:true});
}
