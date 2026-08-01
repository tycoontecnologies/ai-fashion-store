import {NextResponse} from "next/server";
import {getLocalProducts} from "@/lib/localProducts.server";


export async function GET(){

 return NextResponse.json(
   getLocalProducts()
 );

}
