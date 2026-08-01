import { NextRequest, NextResponse } from "next/server";
import { readJson, writeJson } from "@/lib/cms/storage";

export async function GET(){
  return NextResponse.json(readJson("products.json"));
}

export async function POST(req:NextRequest){
  const products=readJson("products.json");
  const body=await req.json();

  body.id=body.id||Date.now().toString();

  products.push(body);

  writeJson("products.json",products);

  return NextResponse.json(body);
}

export async function PUT(req:NextRequest){
  const products=readJson("products.json");
  const body=await req.json();

  const index=products.findIndex((p:any)=>p.id===body.id);

  if(index===-1){
    return NextResponse.json({error:"Not found"},{status:404});
  }

  products[index]={
    ...products[index],
    ...body
  };

  writeJson("products.json",products);

  return NextResponse.json(products[index]);
}

export async function DELETE(req:NextRequest){
  const products=readJson("products.json");
  const {id}=await req.json();

  const filtered=products.filter((p:any)=>p.id!==id);

  writeJson("products.json",filtered);

  return NextResponse.json({success:true});
}
