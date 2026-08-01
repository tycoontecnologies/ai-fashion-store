"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function AIRecommendations({
  currentProduct,
}: any) {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      }
    }

    load();
  }, []);

  const recommendations = products
    .filter((item: any) => {
      if (item.id === currentProduct?.id) return false;

      if (
        item.category &&
        currentProduct?.category &&
        item.category === currentProduct.category
      )
        return true;

      if (
        item.color &&
        currentProduct?.color &&
        item.color === currentProduct.color
      )
        return true;

      return false;
    })
    .slice(0, 3);

  return (
    <section className="max-w-7xl mx-auto px-8 py-24">
      <div className="mb-14">
        <p className="uppercase tracking-[6px] text-gray-500 text-sm mb-3">
          AI Suggestions
        </p>

        <h2 className="text-5xl font-black text-black">
          Complete The Look
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {recommendations.map((product: any) => (
          <Link
            href={`/product/${product.id}`}
            key={product.id}
            className="bg-white rounded-[32px] overflow-hidden shadow-sm hover:-translate-y-2 transition-all"
          >
            <Image
              src={product.image}
              alt={product.name}
              width={700}
              height={900}
              className="w-full h-[450px] object-cover"
            />

            <div className="p-8">
              <div className="flex flex-wrap gap-2 mb-5">
                <div className="px-3 py-1 rounded-full bg-[#f5f5f5] text-xs font-semibold">
                  {product.category || "Fashion"}
                </div>

                <div className="px-3 py-1 rounded-full bg-[#f5f5f5] text-xs font-semibold">
                  {product.color || "Unknown"}
                </div>
              </div>

              <h3 className="text-3xl font-black text-black mb-4">
                {product.name}
              </h3>

              <p className="text-gray-600 mb-6">
                {product.description}
              </p>

              <h4 className="text-3xl font-black text-black">
                Rs. {product.price}
              </h4>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}