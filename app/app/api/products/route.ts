import { NextResponse } from "next/server";
import { getProducts } from "@/lib/adminProducts";

export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return NextResponse.json([], { status: 500 });
  }
}