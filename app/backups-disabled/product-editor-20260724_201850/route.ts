import { NextRequest, NextResponse } from "next/server";
import { readJson, writeJson } from "@/lib/cms/storage";

export async function GET(){
  return NextResponse.json(readJson("products.json"));
}

export async function POST(req:NextRequest){
  const products = readJson("products.json");
  const body = await req.json();

  body.id = body.id || Date.now().toString();

  products.push(body);

  writeJson("products.json",products);

  return NextResponse.json(body);
}
