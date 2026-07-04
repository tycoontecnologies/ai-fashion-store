"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { products } from "@/lib/products";

export default function RecentlyViewed({
  currentId,
}: {
  currentId: number;
}) {

  const [recentProducts,
    setRecentProducts] =
    useState<any[]>([]);

  useEffect(() => {

    const stored =
      JSON.parse(
        localStorage.getItem(
          "recent-products"
        ) || "[]"
      );

    const updated = [

      currentId,

      ...stored.filter(
        (id: number) =>
          id !== currentId
      ),

    ].slice(0, 6);

    localStorage.setItem(
      "recent-products",
      JSON.stringify(updated)
    );

    const recent =
      updated
        .filter(
          (id: number) =>
            id !== currentId
        )
        .map(
          (id: number) =>
            products.find(
              (product) =>
                product.id === id
            )
        )
        .filter(Boolean);

    setRecentProducts(recent);

  }, [currentId]);

  if (
    recentProducts.length === 0
  ) {
    return null;
  }

  return (

    <section className="mt-24">

      <div className="mb-10">

        <p className="
          uppercase
          tracking-[6px]
          text-sm
          text-gray-500
          mb-3
        ">
          Your History
        </p>

        <h2 className="
          text-5xl
          font-black
          text-black
        ">
          Recently Viewed
        </h2>

      </div>

      <div className="
        grid
        md:grid-cols-2
        lg:grid-cols-4
        gap-6
      ">

        {recentProducts.map(
          (product: any) => (

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
                  h-[260px]
                  object-cover
                "
              />

              <div className="p-4">

                <h3 className="
                  text-lg
                  font-bold
                  text-black
                  mb-2
                ">
                  {product.name}
                </h3>

                <p className="
                  text-xl
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

