"use client"; 
import ProductRating
from "@/components/ProductRating";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  ShoppingBag,
  Eye,
} from "lucide-react";

import { useCart } from "@/app/context/CartContext";
import QuickView from "@/components/QuickView";

export default function ProductCard({
  product,
}: any) {

  const {
    addToCart,
    addToWishlist,
  } = useCart();

  const [openQuickView, setOpenQuickView] =
    useState(false);

  return (
    <>
      <QuickView
        product={product}
        open={openQuickView}
        onClose={() =>
          setOpenQuickView(false)
        }
      />

      <div
        className="
          group
          bg-white
          rounded-[24px]
          overflow-hidden
          border
          border-gray-100
          hover:shadow-xl
          transition-all
          duration-500
        "
      >

        {/* IMAGE */}

        <div className="relative">

            <Link
              href={`/product/${product.id}`}
            >

            <Image
              src={product.image}
              alt={product.name}
              width={800}
              height={1000}
              loading="eager"
              className="
                w-full
                h-[360px]
                object-cover
                transition-all
                duration-500
                group-hover:scale-105
              "
            />

          </Link>

          {/* MATCH SCORE */}

          <div
            className="
              absolute
              top-4
              left-4
              px-3
              py-1
              rounded-full
              bg-white
              text-black
              text-xs
              font-bold
              shadow-md
            "
          >
            96% Match
          </div>

          {/* ACTIONS */}

          <div
            className="
              absolute
              top-4
              right-4
              flex
              flex-col
              gap-2
            "
          >

            <button
              onClick={() =>
                addToWishlist(product)
              }
              className="
                w-10
                h-10
                rounded-full
                bg-white
                flex
                items-center
                justify-center
                shadow-md
              "
            >
              <Heart
                size={16}
                className="text-black"
              />
            </button>

            <button
              onClick={() =>
                setOpenQuickView(true)
              }
              className="
                w-10
                h-10
                rounded-full
                bg-white
                flex
                items-center
                justify-center
                shadow-md
              "
            >
              <Eye
                size={16}
                className="text-black"
              />
            </button>

          </div>

        </div>

        {/* CONTENT */}

        <div className="p-5">

          <p
            className="
              text-xs
              uppercase
              tracking-[3px]
              text-gray-500
              mb-2
            "
          >
            {product.category}
          </p>

          <h3
            className="
              text-xl
              font-bold
              text-black
              mb-3
            "
          >
            {product.name}
          </h3>
          <ProductRating
  rating={4.8}
/>

          {/* TAGS */}

          <div
            className="
              flex
              gap-2
              flex-wrap
              mb-4
            "
          >

            <span
              className="
                px-2
                py-1
                bg-gray-100
                rounded-full
                text-[11px]
                text-black
              "
            >
              {product.style}
            </span>

            <span
              className="
                px-2
                py-1
                bg-gray-100
                rounded-full
                text-[11px]
                text-black
              "
            >
              {product.fit}
            </span>

          </div>

          {/* PRICE + BUTTON */}

          <div
            className="
              flex
              items-center
              justify-between
            "
          >

            <div>

              <p
                className="
                  text-gray-500
                  text-xs
                "
              >
                Price
              </p>

              <h4
                className="
                  text-2xl
                  font-black
                  text-black
                "
              >
                Rs. {product.price}
              </h4>

            </div>

            <button
              onClick={() =>
                addToCart(product)
              }
              className="
                px-5
                py-2.5
                rounded-full
                bg-black
                text-white
                flex
                items-center
                gap-2
                text-sm
                font-semibold
                hover:scale-105
                transition-all
              "
            >

              <ShoppingBag size={15} />

              Add

            </button>

          </div>

        </div>

      </div>
    </>
  );
}

