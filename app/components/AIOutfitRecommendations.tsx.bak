"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";
import Image from "next/image";

import { getProducts }
from "@/lib/firestoreProducts";

export default function AIOutfitRecommendations({
  product,
}: any) {

  const [
    recommendations,
    setRecommendations,
  ] = useState<any[]>([]);

  useEffect(() => {

    async function loadRecommendations() {

      const products =
        await getProducts();

      const filtered =
        products
          .filter(
            (item: any) =>
              item.id !== product.id
          )
          .filter(
            (item: any) => {

              if (
                product.category ===
                "T-Shirt"
              ) {

                return (
                  item.category ===
                    "Shirt" ||
                  item.category ===
                    "Streetwear"
                );

              }

              if (
                product.category ===
                "Shirt"
              ) {

                return (
                  item.category ===
                    "T-Shirt" ||
                  item.category ===
                    "Streetwear"
                );

              }

              if (
                product.category ===
                "Streetwear"
              ) {

                return (
                  item.category ===
                    "T-Shirt" ||
                  item.category ===
                    "Shirt"
                );

              }

              return true;

            }
          )
          .slice(0, 4);

      setRecommendations(
        filtered
      );

    }

    loadRecommendations();

  }, [product]);

  return (

    <section
      className="
        mt-24
        bg-white
        rounded-[32px]
        p-8
      "
    >

      <p
        className="
          uppercase
          tracking-[6px]
          text-sm
          text-gray-500
          mb-3
        "
      >
        AI Fashion Assistant
      </p>

      <h2
        className="
          text-5xl
          font-black
          text-black
          mb-8
        "
      >
        AI Styled With
      </h2>

      <div
        className="
          grid
          md:grid-cols-2
          gap-6
        "
      >

        {recommendations.map(
          (item) => (

            <Link
              key={item.id}
              href={`/products/${item.id}`}
              className="
                flex
                gap-4
                bg-[#f5f5f5]
                rounded-[24px]
                p-4
                hover:shadow-lg
                transition-all
              "
            >

              <Image
                src={item.image}
                alt={item.name}
                width={120}
                height={120}
                className="
                  w-24
                  h-24
                  rounded-xl
                  object-cover
                "
              />

              <div>

                <p
                  className="
                    text-xs
                    uppercase
                    tracking-[2px]
                    text-gray-500
                    mb-1
                  "
                >
                  {item.category}
                </p>

                <h3
                  className="
                    text-lg
                    font-bold
                    text-black
                    mb-2
                  "
                >
                  {item.name}
                </h3>

                <p
                  className="
                    text-gray-500
                    mb-2
                  "
                >
                  {item.color}
                </p>

                <p
                  className="
                    text-xl
                    font-black
                    text-black
                  "
                >
                  Rs. {item.price}
                </p>

              </div>

            </Link>

          )
        )}

      </div>

    </section>

  );

}