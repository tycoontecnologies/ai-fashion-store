"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  getProducts,
  deleteProduct,
} from "@/lib/adminProducts";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  async function load() {
    const data = await getProducts();
    setProducts(data);
  }

  useEffect(() => {
    load();
  }, []);

  async function remove(id: string) {
    if (!confirm("Delete product?")) return;

    await deleteProduct(id);
    await load();
  }

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    if (!q) return products;

    return products.filter((p: any) => {
      return (
        (p.name || "").toLowerCase().includes(q) ||
        (p.category || "").toLowerCase().includes(q) ||
        (p.description || "").toLowerCase().includes(q)
      );
    });
  }, [products, search]);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-black">Products</h1>

          <p className="text-gray-500 mt-2">
            {filtered.length} Products
          </p>
        </div>

        <Link
          href="/admin/product"
          className="bg-black text-white px-6 py-3 rounded-xl"
        >
          + Add Product
        </Link>
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products..."
        className="w-full mb-6 rounded-xl border p-4"
      />

      <div className="bg-white rounded-3xl overflow-hidden border">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-left">
                Image
              </th>

              <th className="p-4 text-left">
                Product
              </th>

              <th className="p-4 text-left">
                Category
              </th>

              <th className="p-4 text-left">
                Price
              </th>

              <th className="p-4 text-center">
                Variants
              </th>

              <th className="p-4 text-center">
                Variant Thumbnail
              </th>

              <th className="p-4 text-center">
                Gallery
              </th>

              <th className="p-4 text-center">
                Status
              </th>

              <th className="p-4 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
  {filtered.map((p: any) => {
    const firstVariant = (p.variants || [])[0];

   const variantThumb =
  firstVariant?.image?.trim() ||
  firstVariant?.images?.[0]?.trim() ||
  "";

    return (
      <tr
        key={p.id}
        className="border-t hover:bg-gray-50"
      >
        {/* Product Image */}
        <td className="p-4">
          {p.image ? (
            <Image
              src={p.image}
              alt={p.name}
              width={70}
              height={70}
              className="rounded-xl border object-cover"
            />
          ) : (
            <div className="w-[70px] h-[70px] rounded-xl border flex items-center justify-center text-xs text-gray-400">
              No Image
            </div>
          )}
        </td>

        {/* Product */}
        <td className="p-4 font-semibold">
          {p.name}
        </td>

        {/* Category */}
        <td className="p-4">
          {p.category}
        </td>

        {/* Price */}
        <td className="p-4">
          Rs {p.price}
        </td>

        {/* Variant Count */}
        <td className="p-4 text-center">
          {(p.variants || []).length}
        </td>

        {/* Variant Thumbnail */}
        <td className="p-4 text-center">
          {variantThumb ? (
            <Image
              src={variantThumb}
              alt="Variant"
              width={40}
              height={40}
              className="w-10 h-10 rounded-lg border object-cover mx-auto"
            />
          ) : (
            <div className="w-10 h-10 rounded-lg border flex items-center justify-center text-[10px] text-gray-400 mx-auto">
              No Image
            </div>
          )}
        </td>

        {/* Gallery */}
        <td className="p-4 text-center">
          {(p.gallery || []).length}
        </td>

        {/* Status */}
        <td className="p-4 text-center">
          <div className="flex flex-col gap-1">
            {p.featured && (
              <span className="bg-blue-100 text-blue-700 rounded px-2 py-1 text-xs">
                Featured
              </span>
            )}

            {p.trending && (
              <span className="bg-green-100 text-green-700 rounded px-2 py-1 text-xs">
                Trending
              </span>
            )}

            {p.bestseller && (
              <span className="bg-yellow-100 text-yellow-700 rounded px-2 py-1 text-xs">
                Best Seller
              </span>
            )}

            {p.newArrival && (
              <span className="bg-purple-100 text-purple-700 rounded px-2 py-1 text-xs">
                New Arrival
              </span>
            )}
          </div>
        </td>

        {/* Actions */}
        <td className="p-4">
          <div className="flex gap-2 justify-center">
            <Link
              href={`/admin/product?id=${p.id}`}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Edit
            </Link>

            <button
              onClick={() => remove(p.id)}
              className="bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
    );
  })}
</tbody>

        </table>

      </div>

    </div>

  );

}