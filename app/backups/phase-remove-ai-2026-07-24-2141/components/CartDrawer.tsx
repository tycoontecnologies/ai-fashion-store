"use client";

import {
  X,
  Trash2,
} from "lucide-react";

import { useCart } from "@/app/context/CartContext";

export default function CartDrawer({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (
    open: boolean
  ) => void;
}) {

  const {
    cart,
    removeFromCart,
  } = useCart();

  const subtotal =
    cart.reduce(
      (
        acc,
        item
      ) =>
        acc +
        item.price *
          (item.quantity || 1),
      0
    );

  return (

    <>

      <div
        onClick={() =>
          setOpen(false)
        }
        className={`
          fixed
          inset-0
          bg-black/40
          z-[90]
          transition-all
          duration-300
          ${
            open
              ? "opacity-100 visible"
              : "opacity-0 invisible"
          }
        `}
      />

      <div
        className={`
          fixed
          top-0
          right-0
          h-screen
          w-full
          md:w-[520px]
          bg-white
          z-[100]
          shadow-2xl
          flex
          flex-col
          transition-all
          duration-300
          ${
            open
              ? "translate-x-0"
              : "translate-x-full"
          }
        `}
      >

        <div
          className="
            flex
            items-center
            justify-between
            px-6
            py-6
            border-b
          "
        >

          <div>

            <p
              className="
                uppercase
                tracking-[5px]
                text-gray-500
                text-xs
                mb-2
              "
            >
              Shopping
            </p>

            <h2
              className="
                text-4xl
                font-black
              "
            >
              Cart
            </h2>

          </div>

          <button
            onClick={() =>
              setOpen(false)
            }
            className="
              w-12
              h-12
              rounded-full
              border
              flex
              items-center
              justify-center
            "
          >
            <X size={22} />
          </button>

        </div>

        <div
          className="
            flex-1
            overflow-y-auto
            p-6
            space-y-5
          "
        >

          {cart.length === 0 && (

            <div
              className="
                h-full
                flex
                items-center
                justify-center
                text-gray-500
                text-xl
              "
            >
              Your cart is empty
            </div>

          )}

          {cart.map(
            (item) => (

              <div
                key={item.id}
                className="
                  bg-[#f5f5f5]
                  rounded-[28px]
                  p-4
                  flex
                  gap-4
                "
              >

                <img
                  src={item.image}
                  alt={item.name}
                  className="
                    w-28
                    h-28
                    rounded-2xl
                    object-cover
                  "
                />

                <div
                  className="
                    flex-1
                    flex
                    flex-col
                    justify-between
                  "
                >

                  <div>

                    <h3
                      className="
                        text-xl
                        font-bold
                        leading-tight
                      "
                    >
                      {item.name}
                    </h3>

                    <p
                      className="
                        text-lg
                        font-semibold
                        mt-3
                      "
                    >
                      Rs. {item.price}
                    </p>

                  </div>

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      mt-4
                    "
                  >

                    <div
                      className="
                        px-4
                        py-2
                        rounded-full
                        bg-white
                        text-sm
                        font-semibold
                      "
                    >
                      Qty:{" "}
                      {item.quantity || 1}
                    </div>

                    <button
                      onClick={() =>
                        removeFromCart(
                          item.id
                        )
                      }
                      className="
                        w-10
                        h-10
                        rounded-full
                        bg-red-100
                        text-red-500
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>

                </div>

              </div>

            )
          )}

        </div>

        <div
          className="
            border-t
            p-6
            bg-white
          "
        >

          <div
            className="
              flex
              items-center
              justify-between
              mb-6
            "
          >

            <div>

              <p
                className="
                  text-gray-500
                  text-sm
                  uppercase
                  tracking-[4px]
                "
              >
                Subtotal
              </p>

              <h3
                className="
                  text-4xl
                  font-black
                  mt-2
                "
              >
                Rs. {subtotal}
              </h3>

            </div>

          </div>

          <button
            className="
              w-full
              bg-black
              text-white
              py-5
              rounded-full
              text-lg
              font-semibold
            "
          >
            Proceed To Checkout
          </button>

        </div>

      </div>

    </>

  );

}