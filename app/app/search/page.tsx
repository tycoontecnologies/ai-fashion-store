"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";

export default function SearchPage() {
  const searchParams = useSearchParams();

  const query = searchParams.get("q") || "";

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const results = products.filter((product: any) => {
    const q = query.toLowerCase();

    return (
      (product.name || "").toLowerCase().includes(q) ||
      (product.category || "").toLowerCase().includes(q) ||
      (product.color || "").toLowerCase().includes(q)
    );
  });

  return (
    <main className="min-h-screen bg-[#f5f5f5]">
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-20">
        <p className="uppercase tracking-[6px] text-sm text-gray-500 mb-3">
          Search Results
        </p>

        <h1 className="text-5xl lg:text-7xl font-black text-black mb-4">
          {query || "All Products"}
        </h1>

        <p className="text-gray-600 mb-12">
          {loading
            ? "Loading..."
            : `${results.length} products found`}
        </p>

        {!loading && <ProductGrid products={results} />}
      </section>

      <Footer />
    </main>
  );
}