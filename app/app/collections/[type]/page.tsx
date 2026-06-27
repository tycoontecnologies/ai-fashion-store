import Link from "next/link";
import { getProducts } from "@/lib/adminProducts";

export default async function Page({
  params,
}:{
  params:Promise<{type:string}>
}){

  const { type } = await params;

  const products:any[] =
    await getProducts();

  let items = products;

  if(type==="featured"){
    items =
      products.filter(
        (p:any)=>p.featured
      );
  }

  if(type==="trending"){
    items =
      products.filter(
        (p:any)=>p.trending
      );
  }

  if(type==="best-sellers"){
    items =
      products.filter(
        (p:any)=>
          p.bestseller ||
          p.bestSeller
      );
  }

  if(type==="new-arrivals"){
    items =
      products.filter(
        (p:any)=>p.newArrival
      );
  }

  return (

    <main className="max-w-7xl mx-auto p-8">

      <h1
        className="
          text-4xl
          font-black
          mb-10
          capitalize
        "
      >
        {type.replaceAll("-"," ")}
      </h1>

      <div
        className="
          grid
          grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          gap-6
        "
      >

        {items.map((p:any)=>(

          <Link
            key={p.id}
            href={`/product/${p.id}`}
            className="
              bg-white
              rounded-2xl
              overflow-hidden
              border
              hover:shadow-lg
            "
          >

            <img
              src={
                p.image ||
                "/products/1.png"
              }
              alt={p.name}
              className="
                w-full
                h-72
                object-cover
              "
            />

            <div className="p-4">

              <div
                className="
                  font-bold
                  text-lg
                "
              >
                {p.name}
              </div>

              <div
                className="
                  text-gray-500
                  text-sm
                "
              >
                {p.category}
              </div>

              <div
                className="
                  mt-2
                  font-black
                  text-xl
                "
              >
                Rs {p.price}
              </div>

            </div>

          </Link>

        ))}

      </div>

    </main>

  );

}
