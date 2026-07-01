import { NextRequest, NextResponse } from "next/server";
import products from "@/data/cms/products.json";

let data: any[] = (products as any[]).map((p) => ({
  ...p,

  image:
    p.image && String(p.image).trim() !== ""
      ? p.image
      : "/products/product_0001.png",

  gallery: Array.isArray(p.gallery)
    ? p.gallery.filter(
        (img: string) => img && img.trim() !== ""
      )
    : [],
}));

export async function GET() {
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  body.id = body.id || Date.now().toString();

  body.image =
    body.image && body.image.trim() !== ""
      ? body.image
      : "/products/product_0001.png";

  body.gallery = Array.isArray(body.gallery)
    ? body.gallery
    : [];

  data.push(body);

  return NextResponse.json(body);
}

export async function PUT(req: NextRequest) {
  const body = await req.json();

  body.image =
    body.image && body.image.trim() !== ""
      ? body.image
      : "/products/product_0001.png";

  body.gallery = Array.isArray(body.gallery)
    ? body.gallery
    : [];

  data = data.map((p: any) =>
    String(p.id) === String(body.id)
      ? { ...p, ...body }
      : p
  );

  return NextResponse.json(body);
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const id = searchParams.get("id");

  data = data.filter(
    (p: any) => String(p.id) !== String(id)
  );

  return NextResponse.json({
    success: true,
  });
}