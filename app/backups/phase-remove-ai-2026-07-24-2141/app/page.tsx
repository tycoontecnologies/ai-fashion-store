"use client";

import Hero from "@/components/home/Hero";
import TrendingSection from "@/components/TrendingSection";
import Navbar from "@/components/Navbar";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import FilterBar from "@/components/FilterBar";
import { useMemo, useState } from "react";
import { getProducts } from "@/lib/products";
import { useEffect } from "react";

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedColor, setSelectedColor] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [initialProducts,setInitialProducts]=useState<any[]>([]);

useEffect(()=>{
getProducts().then(setInitialProducts);
},[]);

const filteredProducts = useMemo(() => {
    return initialProducts.filter((product: any) => {
      const matchesSearch =
        !search ||
        product.name?.toLowerCase().includes(search.toLowerCase());

      const matchesColor =
        selectedColor === "All" ||
        (product.color || "")
          .toLowerCase()
          .includes(selectedColor.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        product.category === selectedCategory;

      return (
        matchesSearch &&
        matchesColor &&
        matchesCategory
      );
    });
  }, [search, selectedColor, selectedCategory]);

  return (
    <main className="bg-[#f5f5f5] min-h-screen">
      <Navbar />

      <Hero />

      <TrendingSection />

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-10">
          <div>
            <p className="uppercase tracking-[6px] text-gray-500 text-sm mb-3">
              Recommended
            </p>

            <h2 className="text-5xl lg:text-7xl font-black text-black leading-none">
              Trending
              <br />
              Collection
            </h2>
          </div>

          <SearchBar
            search={search}
            setSearch={setSearch}
          />
        </div>

        <div className="mb-12">
          <FilterBar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
        </div>

        <ProductGrid products={filteredProducts} />
      </section>

      <Footer />
    </main>
  );
}
