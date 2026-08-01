"use client";

import { useState } from "react";

import { useCart } from "@/app/context/CartContext";

export default function ProductActions({
  product,
}: any) {

  const { addToCart } =
    useCart();

  const [size, setSize] =
    useState("M");

  const [quantity, setQuantity] =
    useState(1);

  const sizes = [
    "XS",
    "S",
    "M",
    "L",
    "XL",
  ];

  function handleAddToCart() {

    addToCart({
      ...product,
      size,
      quantity,
    });

  }

  return (

    <div className="mt-10">

      <div className="mb-8">

        <p className="
          text-sm
          font-bold
          mb-3
        ">
          Size
        </p>

        <div className="
          flex
          gap-3
        ">

          {sizes.map((item) => (

            <button
              key={item}
              onClick={() =>
                setSize(item)
              }
              className={`
                w-12
                h-12
                rounded-full
                border
                font-semibold
                ${
                  size === item
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }
              `}
            >
              {item}
            </button>

          ))}

        </div>

      </div>

      <div className="mb-8">

        <p className="
          text-sm
          font-bold
          mb-3
        ">
          Quantity
        </p>

        <div className="
          flex
          items-center
          gap-3
        ">

          <button
            onClick={() =>
              setQuantity(
                Math.max(
                  1,
                  quantity - 1
                )
              )
            }
            className="
              w-10
              h-10
              rounded-full
              bg-white
            "
          >
            -
          </button>

          <span className="
            text-lg
            font-bold
          ">
            {quantity}
          </span>

          <button
            onClick={() =>
              setQuantity(
                quantity + 1
              )
            }
            className="
              w-10
              h-10
              rounded-full
              bg-white
            "
          >
            +
          </button>

        </div>

      </div>

      <button
        onClick={
          handleAddToCart
        }
        className="
          h-14
          px-8
          rounded-full
          bg-black
          text-white
          font-bold
        "
      >
        Add To Cart
      </button>

    </div>

  );
}