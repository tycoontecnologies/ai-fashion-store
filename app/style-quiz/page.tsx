"use client";
import {
  saveStyleProfile,
} from "@/lib/firestoreStyleProfile";

import { useState } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import ProductGrid from "@/components/ProductGrid";

import { products } from "@/lib/products";

export default function StyleQuizPage() {

  const [style, setStyle] =
    useState("");

  const [occasion, setOccasion] =
    useState("");

  const [color, setColor] =
    useState("");

  const [showResults, setShowResults] =
    useState(false);

  const recommendedProducts =
    products.filter((product) => {

      const matchesStyle =
        style
          ? product.style === style
          : true;

      const matchesOccasion =
        occasion
          ? product.occasion ===
            occasion
          : true;

      const matchesColor =
        color
          ? product.color === color
          : true;

      return (
        matchesStyle &&
        matchesOccasion &&
        matchesColor
      );

    });

  return (

    <main className="
      bg-[#f5f5f5]
      min-h-screen
    ">

      <Navbar />

      <section className="
        max-w-7xl
        mx-auto
        px-8
        py-24
      ">

        {/* HEADER */}

        <div className="mb-16">

          <p className="
            uppercase
            tracking-[6px]
            text-gray-500
            text-sm
            mb-3
          ">
            AI Personalization
          </p>

          <h1 className="
            text-7xl
            font-black
            text-black
            mb-6
          ">
            Style Quiz
          </h1>

          <p className="
            text-xl
            text-gray-600
            max-w-2xl
          ">
            Answer a few questions and let AI
            build your personalized wardrobe.
          </p>

        </div>

        {/* QUIZ */}

        <div className="
          bg-white
          rounded-[40px]
          p-10
          shadow-sm
          mb-20
        ">

          <div className="
            grid
            lg:grid-cols-3
            gap-6
            mb-8
          ">

            {/* STYLE */}

            <select
              value={style}
              onChange={(e) =>
                setStyle(e.target.value)
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

            {/* OCCASION */}

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

            {/* COLOR */}

            <select
              value={color}
              onChange={(e) =>
                setColor(e.target.value)
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

              <option value="Green">
                Green
              </option>

              <option value="Blue">
                Blue
              </option>

            </select>

          </div>

          <button
  onClick={async () => {

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

  }}
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

        {/* RESULTS */}

        {showResults && (

          <div>

            <div className="mb-14">

              <p className="
                uppercase
                tracking-[6px]
                text-gray-500
                text-sm
                mb-3
              ">
                AI Generated
              </p>

              <h2 className="
                text-5xl
                font-black
                text-black
              ">
                Your Personalized Fits
              </h2>

            </div>

            <ProductGrid
              products={recommendedProducts}
            />

          </div>

        )}

      </section>

      <Footer />

    </main>

  );
}