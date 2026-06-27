import { NextRequest, NextResponse } from "next/server";
import products from "@/lib/products.local.json";

let data:any[] = products as any[];

export async function GET() {
  return NextResponse.json(data);
}

export async function POST(req:NextRequest) {
  const body = await req.json();

  body.id =
    body.id ||
    Date.now().toString();

  data.push(body);

  return NextResponse.json(body);
}

export async function PUT(req:NextRequest) {
  const body = await req.json();

  data = data.map((p:any)=>
    String(p.id)===String(body.id)
      ? {...p,...body}
      : p
  );

  return NextResponse.json(body);
}

export async function DELETE(req:NextRequest) {
  const { searchParams } =
    new URL(req.url);

  const id =
    searchParams.get("id");

  data = data.filter(
    (p:any)=>
      String(p.id)!==String(id)
  );

  return NextResponse.json({
    success:true
  });
}
