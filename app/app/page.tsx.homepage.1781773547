"use client";

import { useEffect, useState } from "react";

import TrendingSection from "@/components/TrendingSection";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import AIStylist from "@/components/AIStylist";
import AIChatStylist from "@/components/AIChatStylist";
import FilterBar from "@/components/FilterBar";

import { getProducts } from "@/lib/firestoreProducts";

export default function Home() {

  const [search, setSearch] =
    useState("");

  const [
    selectedColor,
    setSelectedColor,
  ] = useState("All");

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("All");

  const [
    products,
    setProducts,
  ] = useState<any[]>([]);

  useEffect(() => {

    async function loadProducts() {

      try {

        const data =
          await getProducts();

        setProducts(data);

      } catch (error) {

        console.error(
          "Failed to load products:",
          error
        );

      }

    }

    loadProducts();

  }, []);

  const filteredProducts =
    products.filter((product) => {

      const matchesSearch =
        product.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesColor =
        selectedColor === "All"
          ? true
          : product.color
              ?.toLowerCase()
              .includes(
                selectedColor.toLowerCase()
              );

      const matchesCategory =
        selectedCategory === "All"
          ? true
          : product.category ===
            selectedCategory;

      return (
        matchesSearch &&
        matchesColor &&
        matchesCategory
      );

    });

  return (

    <main
      className="
        bg-[#f5f5f5]
        min-h-screen
      "
    >

      <Navbar />

      <Hero />

      <TrendingSection />

      <section
        className="
          max-w-7xl
          mx-auto
          px-6
          lg:px-8
          py-12
        "
      >

        <div
          className="
            flex
            flex-col
            lg:flex-row
            lg:items-end
            lg:justify-between
            gap-8
            mb-10
          "
        >

          <div>

            <p
              className="
                uppercase
                tracking-[6px]
                text-gray-500
                text-sm
                mb-3
              "
            >
              AI Recommended
            </p>

            <h2
              className="
                text-5xl
                lg:text-7xl
                font-black
                text-black
                leading-none
              "
            >
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
            selectedCategory={
              selectedCategory
            }
            setSelectedCategory={
              setSelectedCategory
            }
            selectedColor={
              selectedColor
            }
            setSelectedColor={
              setSelectedColor
            }
          />

        </div>

        <ProductGrid
          products={filteredProducts}
        />

      </section>

      <AIStylist />

      <AIChatStylist />

      <Footer />

    </main>

  );

}