import { NextResponse } from "next/server";
import { getProducts } from "@/lib/products";

export async function GET() {
  const products = await getProducts();

  return NextResponse.json(
    products.map((p:any)=>({
      id:p.id,
      name:p.name,
      image:p.image,
      gallery:p.gallery,
      variants:p.variants
    }))
  );
}
