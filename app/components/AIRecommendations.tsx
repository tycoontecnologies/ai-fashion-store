"use client";

import Link from "next/link";
import Image from "next/image";

import { products } from "@/lib/products";

export default function AIRecommendations({
  currentProduct,
}: any) {

  const recommendations =
    products.filter((item) => {

      if (
        item.id === currentProduct.id
      ) {
        return false;
      }

      const sameStyle =
        item.style ===
        currentProduct.style;

      const sameOccasion =
        item.occasion ===
        currentProduct.occasion;

      return (
        sameStyle ||
        sameOccasion
      );

    }).slice(0, 3);

  return (

    <section className="
      max-w-7xl
      mx-auto
      px-8
      py-24
    ">

      <div className="mb-14">

        <p className="
          uppercase
          tracking-[6px]
          text-gray-500
          text-sm
          mb-3
        ">
          AI Suggestions
        </p>

        <h2 className="
          text-5xl
          font-black
          text-black
        ">
          Complete The Look
        </h2>

      </div>

      <div className="
        grid
        md:grid-cols-2
        lg:grid-cols-3
        gap-10
      ">

        {recommendations.map((product) => (

          <Link
            href={`/product/${product.id}`}
            key={product.id}
            className="
              bg-white
              rounded-[32px]
              overflow-hidden
              shadow-sm
              hover:-translate-y-2
              transition-all
            "
          >

            <Image
              src={product.image}
              alt={product.name}
              width={700}
              height={900}
              className="
                w-full
                h-[450px]
                object-cover
              "
            />

            <div className="p-8">

              <div className="
                flex
                flex-wrap
                gap-2
                mb-5
              ">

                <div className="
                  px-3
                  py-1
                  rounded-full
                  bg-[#f5f5f5]
                  text-xs
                  font-semibold
                ">
                  {product.style}
                </div>

                <div className="
                  px-3
                  py-1
                  rounded-full
                  bg-[#f5f5f5]
                  text-xs
                  font-semibold
                ">
                  {product.occasion}
                </div>

              </div>

              <h3 className="
                text-3xl
                font-black
                text-black
                mb-4
              ">
                {product.name}
              </h3>

              <p className="
                text-gray-600
                mb-6
              ">
                {product.description}
              </p>

              <h4 className="
                text-3xl
                font-black
                text-black
              ">
                Rs. {product.price}
              </h4>

            </div>

          </Link>

        ))}

      </div>

    </section>

  );
}