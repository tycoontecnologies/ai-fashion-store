"use client";

import {
  useState,
  useEffect,
} from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";

import {
  saveStyleProfile,
} from "@/lib/firestoreStyleProfile";

import {
  getProducts,
} from "@/lib/firestoreProducts";

export default function StyleQuizPage() {

  const [style, setStyle] =
    useState("");

  const [occasion, setOccasion] =
    useState("");

  const [color, setColor] =
    useState("");

  const [showResults, setShowResults] =
    useState(false);

  const [products, setProducts] =
    useState<any[]>([]);

  useEffect(() => {

    async function loadProducts() {

      try {

        const data =
          await getProducts();

        setProducts(data);

      } catch (error) {

        console.error(error);

      }

    }

    loadProducts();

  }, []);

  const recommendedProducts =
    products.filter(
      (product: any) => {

        const matchesColor =
          color
            ? product.color
                ?.toLowerCase()
                .includes(
                  color.toLowerCase()
                )
            : true;

        return matchesColor;

      }
    );

  async function handleGenerateRecommendations() {

    if (
      !style &&
      !occasion &&
      !color
    ) {

      alert(
        "Please select at least one preference."
      );

      return;

    }

    try {

      await saveStyleProfile({

        style,

        occasion,

        color,

      });

      setShowResults(true);

    } catch (error) {

      console.error(error);

      alert(
        "Failed to save style profile."
      );

    }

  }

  return (

    <main
      className="
        bg-[#f5f5f5]
        min-h-screen
      "
    >

      <Navbar />

      <section
        className="
          max-w-7xl
          mx-auto
          px-8
          py-24
        "
      >

        <div className="mb-16">

          <p
            className="
              uppercase
              tracking-[6px]
              text-gray-500
              text-sm
              mb-3
            "
          >
            AI Personalization
          </p>

          <h1
            className="
              text-7xl
              font-black
              text-black
              mb-6
            "
          >
            Style Quiz
          </h1>

          <p
            className="
              text-xl
              text-gray-600
              max-w-2xl
            "
          >
            Answer a few questions and let AI
            build your personalized wardrobe.
          </p>

        </div>

        <div
          className="
            bg-white
            rounded-[40px]
            p-10
            shadow-sm
            mb-20
          "
        >

          <div
            className="
              grid
              lg:grid-cols-3
              gap-6
              mb-8
            "
          >

            <select
              value={style}
              onChange={(e) =>
                setStyle(
                  e.target.value
                )
              }
              className="
                h-16
                rounded-2xl
                px-6
                bg-[#f5f5f5]
                outline-none
              "
            >

              <option value="">
                Select Style
              </option>

              <option value="Minimal">
                Minimal
              </option>

              <option value="Streetwear">
                Streetwear
              </option>

              <option value="Luxury">
                Luxury
              </option>

            </select>

            <select
              value={occasion}
              onChange={(e) =>
                setOccasion(
                  e.target.value
                )
              }
              className="
                h-16
                rounded-2xl
                px-6
                bg-[#f5f5f5]
                outline-none
              "
            >

              <option value="">
                Select Occasion
              </option>

              <option value="Casual">
                Casual
              </option>

              <option value="Office">
                Office
              </option>

              <option value="Formal">
                Formal
              </option>

            </select>

            <select
              value={color}
              onChange={(e) =>
                setColor(
                  e.target.value
                )
              }
              className="
                h-16
                rounded-2xl
                px-6
                bg-[#f5f5f5]
                outline-none
              "
            >

              <option value="">
                Favorite Color
              </option>

              <option value="Black">
                Black
              </option>

              <option value="White">
                White
              </option>

              <option value="Grey">
                Grey
              </option>

              <option value="Navy Blue">
                Navy Blue
              </option>

              <option value="Olive Green">
                Olive Green
              </option>

            </select>

          </div>

          <button
            onClick={
              handleGenerateRecommendations
            }
            className="
              h-16
              px-10
              rounded-full
              bg-black
              text-white
              text-lg
              font-semibold
              hover:opacity-90
              transition-all
            "
          >
            Generate AI Recommendations
          </button>

        </div>

        {showResults && (

          <div>

            <div className="mb-14">

              <p
                className="
                  uppercase
                  tracking-[6px]
                  text-gray-500
                  text-sm
                  mb-3
                "
              >
                AI Generated
              </p>

              <h2
                className="
                  text-5xl
                  font-black
                  text-black
                "
              >
                Your Personalized Fits
              </h2>

            </div>

            <ProductGrid
              products={
                recommendedProducts
              }
            />

          </div>

        )}

      </section>

      <Footer />

    </main>

  );

}