"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";

import { getProducts } from "@/lib/firestoreProducts";

import AIMatchScore from "./AIMatchScore";

export default function RelatedProducts({
  currentProduct,
}: any) {

  const [
    relatedProducts,
    setRelatedProducts,
  ] = useState<any[]>([]);

  useEffect(() => {

    async function loadProducts() {

      const products =
        await getProducts();

      const filtered =
        products
          .filter(
            (item: any) =>
              item.id !==
              currentProduct.id
          )
          .slice(0, 4);

      setRelatedProducts(
        filtered
      );

    }

    loadProducts();

  }, [currentProduct]);

  return (

    <section className="mt-24">

      <div className="mb-10">

        <p
          className="
            uppercase
            tracking-[6px]
            text-sm
            text-gray-500
            mb-3
          "
        >
          AI Powered Suggestions
        </p>

        <h2
          className="
            text-5xl
            font-black
            text-black
          "
        >
          Related Products
        </h2>

      </div>

      <div
        className="
          grid
          md:grid-cols-2
          lg:grid-cols-4
          gap-6
        "
      >

        {relatedProducts.map(
          (product) => (

            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="
                bg-white
                rounded-[24px]
                overflow-hidden
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
                  h-[280px]
                  object-cover
                "
              />

              <div className="p-4">

                <AIMatchScore
                  currentProduct={
                    currentProduct
                  }
                  comparedProduct={
                    product
                  }
                />

                <p
                  className="
                    text-xs
                    uppercase
                    tracking-[3px]
                    text-gray-500
                    mb-2
                  "
                >
                  {product.category}
                </p>

                <h3
                  className="
                    text-lg
                    font-bold
                    text-black
                    mb-2
                  "
                >
                  {product.name}
                </h3>

                <p
                  className="
                    text-xl
                    font-black
                    text-black
                  "
                >
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

