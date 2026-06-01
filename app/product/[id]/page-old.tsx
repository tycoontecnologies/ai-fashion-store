"use client";

import Image from "next/image";
import { useParams } from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { products } from "@/lib/products";

export default function ProductPage() {

  const params =
    useParams();

  const product =
    products.find(
      (item) =>
        item.id.toString() ===
        params.id
    );

  if (!product) {

    return (

      <main className="
        min-h-screen
        bg-[#f5f5f5]
      ">

        <Navbar />

        <div className="
          max-w-7xl
          mx-auto
          px-6
          py-24
        ">

          <h1 className="
            text-5xl
            font-black
          ">
            Product Not Found
          </h1>

        </div>

        <Footer />

      </main>

    );

  }

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

        <div className="
          grid
          lg:grid-cols-2
          gap-16
          items-start
        ">

          {/* IMAGE */}

          <div className="
            bg-white
            rounded-[32px]
            overflow-hidden
          ">

            <Image
              src={product.image}
              alt={product.name}
              width={800}
              height={900}
              priority
              className="
                w-full
                h-[700px]
                object-cover
              "
            />

          </div>

          {/* INFO */}

          <div>

            <p className="
              uppercase
              tracking-[4px]
              text-gray-500
              text-sm
              mb-3
            ">
              {product.category}
            </p>

            <h1 className="
              text-5xl
              font-black
              text-black
              mb-6
            ">
              {product.name}
            </h1>

            <div className="
              text-3xl
              font-bold
              mb-8
            ">
              ${product.price}
            </div>

            <div className="
              space-y-4
              mb-10
            ">

              <div>
                <span className="
                  font-bold
                ">
                  Color:
                </span>
                {" "}
                {product.color}
              </div>

              <div>
                <span className="
                  font-bold
                ">
                  Category:
                </span>
                {" "}
                {product.category}
              </div>

            </div>

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
              gap-4
            ">

              <button
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

              <button
                className="
                  h-14
                  px-8
                  rounded-full
                  border
                  border-black
                  font-bold
                "
              >
                Add To Wishlist
              </button>

            </div>

            <div className="
              mt-12
              bg-white
              rounded-[24px]
              p-6
            ">

              <p className="
                uppercase
                tracking-[4px]
                text-xs
                text-gray-500
                mb-2
              ">
                AI Styling Tip
              </p>

              <p className="
                text-gray-700
              ">
                Pair this piece with
                neutral sneakers and
                slim-fit trousers for a
                modern casual look.
              </p>

            </div>

          </div>

        </div>

      </section>

      <Footer />

    </main>

  );
}