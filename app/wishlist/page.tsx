"use client";

import Link from "next/link";
import Image from "next/image";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { useCart } from "@/app/context/CartContext";

export default function WishlistPage() {

  const {
    wishlist,
    removeFromWishlist,
  } = useCart();

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
          My Collection
        </p>

        <h1 className="
          text-5xl
          lg:text-7xl
          font-black
          text-black
          mb-12
        ">
          Wishlist
        </h1>

        {wishlist.length === 0 ? (

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
              Your Wishlist Is Empty
            </h2>

            <p className="
              text-gray-500
            ">
              Save products you love
              and they'll appear here.
            </p>

          </div>

        ) : (

          <div className="
            grid
            md:grid-cols-2
            lg:grid-cols-4
            gap-6
          ">

            {wishlist.map(
              (product) => (

                <div
                  key={product.id}
                  className="
                    bg-white
                    rounded-[24px]
                    overflow-hidden
                  "
                >

                  <Link
                    href={`/product/${product.id}`}
                  >

                    <Image
                      src={product.image}
                      alt={product.name}
                      width={600}
                      height={700}
                      className="
                        w-full
                        h-[280px]
                        object-cover
                      "
                    />

                  </Link>

                  <div className="p-5">

                    <h3 className="
                      text-xl
                      font-bold
                      text-black
                      mb-2
                    ">
                      {product.name}
                    </h3>

                    <p className="
                      text-2xl
                      font-black
                      text-black
                      mb-5
                    ">
                      Rs. {product.price}
                    </p>

                    <button
                      onClick={() =>
                        removeFromWishlist(
                          product.id
                        )
                      }
                      className="
                        w-full
                        h-12
                        rounded-full
                        bg-black
                        text-white
                        font-bold
                      "
                    >
                      Remove
                    </button>

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </section>

      <Footer />

    </main>

  );

}

