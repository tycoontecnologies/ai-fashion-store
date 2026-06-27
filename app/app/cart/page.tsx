"use client";

import Image from "next/image";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { useCart } from "@/app/context/CartContext";

export default function CartPage() {

  const {
    cart,
    removeFromCart,
  } = useCart();

  const subtotal =
    cart.reduce(
      (sum, item) =>
        sum +
        item.price *
        (item.quantity || 1),
      0
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
          Shopping Bag
        </p>

        <h1 className="
          text-5xl
          lg:text-7xl
          font-black
          text-black
          mb-12
        ">
          Cart
        </h1>

        {cart.length === 0 ? (

          <div className="
            bg-white
            rounded-[32px]
            p-12
            text-center
          ">

            <h2 className="
              text-3xl
              font-black
              text-black
              mb-4
            ">
              Your Cart Is Empty
            </h2>

            <p className="
              text-gray-500
              mb-8
            ">
              Add some products to
              continue shopping.
            </p>

            <Link
              href="/"
              className="
                inline-flex
                h-14
                px-8
                rounded-full
                bg-black
                text-white
                font-bold
                items-center
              "
            >
              Continue Shopping
            </Link>

          </div>

        ) : (

          <div className="
            grid
            lg:grid-cols-[1fr_380px]
            gap-10
          ">

            {/* CART ITEMS */}

            <div className="
              space-y-6
            ">

              {cart.map(
                (item, index) => (

                  <div
                    key={index}
                    className="
                      bg-white
                      rounded-[24px]
                      p-5
                      flex
                      gap-5
                    "
                  >

                    <Image
                      src={item.image}
                      alt={item.name}
                      width={120}
                      height={140}
                      className="
                        rounded-2xl
                        object-cover
                      "
                    />

                    <div className="
                      flex-1
                    ">

                      <h3 className="
                        text-xl
                        font-bold
                        text-black
                        mb-2
                      ">
                        {item.name}
                      </h3>

                      <p className="
                        text-gray-500
                        mb-2
                      ">
                        Quantity:
                        {" "}
                        {item.quantity || 1}
                      </p>

                      <p className="
                        text-2xl
                        font-black
                        text-black
                      ">
                        Rs. {item.price}
                      </p>

                    </div>

                    <button
                      onClick={() =>
                        removeFromCart(
                          item.id
                        )
                      }
                      className="
                        h-10
                        px-4
                        rounded-full
                        bg-red-500
                        text-white
                        font-semibold
                      "
                    >
                      Remove
                    </button>

                  </div>

                )
              )}

            </div>

            {/* SUMMARY */}

            <div
              className="
                bg-white
                rounded-[32px]
                p-8
                h-fit
              "
            >

              <h2 className="
                text-3xl
                font-black
                text-black
                mb-8
              ">
                Order Summary
              </h2>

              <div className="
                flex
                justify-between
                mb-4
              ">

                <span className="
                  text-gray-600
                ">
                  Items
                </span>

                <span className="
                  text-black
                ">
                  {cart.length}
                </span>

              </div>

              <div className="
                flex
                justify-between
                mb-8
              ">

                <span className="
                  text-gray-600
                ">
                  Subtotal
                </span>

                <span className="
                  text-black
                  font-bold
                ">
                  Rs. {subtotal}
                </span>

              </div>

              <Link
                href="/checkout"
                className="
                  w-full
                  h-14
                  rounded-full
                  bg-black
                  text-white
                  font-bold
                  flex
                  items-center
                  justify-center
                "
              >
                Proceed To Checkout
              </Link>

            </div>

          </div>

        )}

      </section>

      <Footer />

    </main>

  );

}