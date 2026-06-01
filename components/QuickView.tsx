"use client";

import Image from "next/image";

import {
  X,
  ShoppingBag,
  Heart,
} from "lucide-react";

import { useCart } from "@/app/context/CartContext";

export default function QuickView({
  product,
  open,
  onClose,
}: any) {

  const {
    addToCart,
    addToWishlist,
  } = useCart();

  if (!open || !product)
    return null;

  return (

    <div className="
      fixed
      inset-0
      z-[999]
      bg-black/60
      backdrop-blur-sm
      flex
      items-center
      justify-center
      p-6
    ">

      <div className="
        bg-white
        rounded-[40px]
        overflow-hidden
        max-w-6xl
        w-full
        grid
        lg:grid-cols-2
        relative
      ">

        {/* CLOSE */}

        <button
          onClick={onClose}
          className="
            absolute
            top-6
            right-6
            z-10
            w-12
            h-12
            rounded-full
            bg-white
            flex
            items-center
            justify-center
            shadow-lg
          "
        >

          <X size={20} />

        </button>

        {/* IMAGE */}

        <div className="
          bg-[#f5f5f5]
        ">

          <Image
            src={product.image}
            alt={product.name}
            width={900}
            height={1200}
            className="
              w-full
              h-full
              object-cover
            "
          />

        </div>

        {/* CONTENT */}

        <div className="
          p-10
          lg:p-14
          flex
          flex-col
          justify-center
        ">

          <p className="
            uppercase
            tracking-[5px]
            text-sm
            text-gray-500
            mb-4
          ">
            {product.category}
          </p>

          <h2 className="
            text-5xl
            font-black
            text-black
            mb-6
          ">
            {product.name}
          </h2>

          <p className="
            text-lg
            text-gray-600
            leading-relaxed
            mb-10
          ">
            {product.description}
          </p>

          <div className="
            flex
            gap-3
            flex-wrap
            mb-10
          ">

            <div className="
              px-5
              py-3
              rounded-full
              bg-[#f5f5f5]
              font-medium
            ">
              {product.color}
            </div>

            <div className="
              px-5
              py-3
              rounded-full
              bg-[#f5f5f5]
              font-medium
            ">
              {product.pattern}
            </div>

          </div>

          <h3 className="
            text-5xl
            font-black
            text-black
            mb-10
          ">
            Rs. {product.price}
          </h3>

          <div className="
            flex
            gap-4
          ">

            <button
              onClick={() =>
                addToCart(product)
              }
              className="
                flex-1
                h-16
                rounded-full
                bg-black
                text-white
                text-lg
                font-semibold
                flex
                items-center
                justify-center
                gap-3
              "
            >

              <ShoppingBag size={20} />

              Add To Cart

            </button>

            <button
              onClick={() =>
                addToWishlist(product)
              }
              className="
                w-16
                h-16
                rounded-full
                border
                border-gray-200
                flex
                items-center
                justify-center
              "
            >

              <Heart size={20} />

            </button>

          </div>

        </div>

      </div>

    </div>

  );
}