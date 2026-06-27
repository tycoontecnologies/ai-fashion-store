"use client";

import Link from "next/link";
import Image from "next/image";

import { products } from "@/lib/products";

export default function TrendingSection() {

  const trending =
    products.slice(0, 4);

  return (

    <section className="
      max-w-7xl
      mx-auto
      px-6
      py-16
    ">

      <p className="
        uppercase
        tracking-[6px]
        text-sm
        text-gray-500
        mb-3
      ">
        Most Popular
      </p>

      <h2 className="
        text-5xl
        lg:text-6xl
        font-black
        text-black
        mb-10
      ">
        Trending This Week
      </h2>

      <div className="
        grid
        md:grid-cols-2
        lg:grid-cols-4
        gap-6
      ">

        {trending.map(
          (product) => (

            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="
                bg-white
                rounded-[24px]
                overflow-hidden
                hover:-translate-y-1
                hover:shadow-xl
                transition-all
              "
            >

              <Image
                src={product.image}
                alt={product.name}
                width={600}
                height={700}
                className="
                  w-full
                  h-[260px]
                  object-cover
                "
              />

              <div className="p-5">

                <h3 className="
                  text-lg
                  font-bold
                  text-black
                  mb-2
                ">
                  {product.name}
                </h3>

                <p className="
                  text-gray-500
                  mb-2
                ">
                  Trending Product
                </p>

                <p className="
                  text-2xl
                  font-black
                  text-black
                ">
                  Rs. {product.price}
                </p>

              </div>

            </Link>

          )
        )}

      </div>

    </section>

  );  

}