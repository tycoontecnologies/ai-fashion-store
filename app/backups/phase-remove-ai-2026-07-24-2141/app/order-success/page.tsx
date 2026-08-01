"use client";

import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function OrderSuccessPage() {

  return (

    <main className="
      min-h-screen
      bg-[#f5f5f5]
    ">

      <Navbar />

      <section className="
        flex
        items-center
        justify-center
        py-32
      ">

        <div className="
          bg-white
          rounded-[32px]
          p-12
          text-center
          max-w-xl
        ">

          <h1 className="
            text-5xl
            font-black
            text-black
            mb-4
          ">
            Order Placed
          </h1>

          <p className="
            text-gray-600
            mb-8
          ">
            Thank you for shopping
            with GUESS360.
          </p>

          <div className="
            flex
            flex-col
            sm:flex-row
            justify-center
            gap-4
          ">

            <Link
              href="/"
              className="
                h-14
                px-8
                rounded-full
                bg-black
                text-white
                font-bold
                flex
                items-center
              "
            >
              Continue Shopping
            </Link>

            <Link
              href="/orders"
              className="
                h-14
                px-8
                rounded-full
                border
                border-black
                text-black
                font-bold
                flex
                items-center
              "
            >
              View Orders
            </Link>

          </div>

        </div>

      </section>

      <Footer />

    </main>

  );

}