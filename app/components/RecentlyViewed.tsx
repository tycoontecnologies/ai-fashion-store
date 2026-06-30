"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function RecentlyViewed({
  currentId,
}: {
  currentId: string | number;
}) {
  const [products, setProducts] = useState<any[]>([]);
  const [recentProducts, setRecentProducts] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();

        const allProducts = Array.isArray(data) ? data : [];

        setProducts(allProducts);

        const stored = JSON.parse(
          localStorage.getItem("recent-products") || "[]"
        );

        const updated = [
          String(currentId),
          ...stored.filter(
            (id: string) => String(id) !== String(currentId)
          ),
        ].slice(0, 6);

        localStorage.setItem(
          "recent-products",
          JSON.stringify(updated)
        );

        const recent = updated
          .filter(
            (id: string) => String(id) !== String(currentId)
          )
          .map((id: string) =>
            allProducts.find(
              (p: any) => String(p.id) === String(id)
            )
          )
          .filter(Boolean);

        setRecentProducts(recent);
      } catch (err) {
        console.error(err);
      }
    }

    load();
  }, [currentId]);

  if (recentProducts.length === 0) return null;

  return (
    <section className="mt-24">
      <div className="mb-10">
        <p className="uppercase tracking-[6px] text-sm text-gray-500 mb-3">
          Your History
        </p>

        <h2 className="text-5xl font-black text-black">
          Recently Viewed
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recentProducts.map((product: any) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="bg-white rounded-[24px] overflow-hidden hover:shadow-xl transition-all"
          >
            <Image
              src={
                product?.image && product.image.trim() !== ""
                  ? product.image
                  : "/products/product_0001.png"
              }
              alt={product?.name || "Product"}
              width={600}
              height={700}
              className="w-full h-[260px] object-cover"
            />

            <div className="p-4">
              <h3 className="text-lg font-bold text-black mb-2">
                {product.name}
              </h3>

              <p className="text-xl font-black text-black">
                Rs. {product.price}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}