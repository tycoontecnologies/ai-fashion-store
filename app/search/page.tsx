"use client";

import { useSearchParams } from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";

import { products } from "@/lib/products";

export default function SearchPage() {

  const searchParams =
    useSearchParams();

  const query =
    searchParams.get("q") || "";

  const results =
    products.filter(
      (product) =>
        product.name
          .toLowerCase()
          .includes(
            query.toLowerCase()
          ) ||
        product.color
          .toLowerCase()
          .includes(
            query.toLowerCase()
          ) ||
        product.category
          .toLowerCase()
          .includes(
            query.toLowerCase()
          )
    );

  return (

    <main className="
      min-h-screen
      bg-[#f5f5f5]
    ">

      <Navbar />

      <section className="
        max-w-7xl
        mx-auto
        px-6
        py-20
      ">

        <p className="
          uppercase
          tracking-[6px]
          text-sm
          text-gray-500
          mb-3
        ">
          Search Results
        </p>

        <h1 className="
          text-5xl
          lg:text-7xl
          font-black
          text-black
          mb-4
        ">
          {query || "All Products"}
        </h1>

        <p className="
          text-gray-600
          mb-12
        ">
          {results.length}
          {" "}
          products found
        </p>

        <ProductGrid
          products={results}
        />

      </section>

      <Footer />

    </main>

  );

}