"use client";

import {
  useEffect,
  useState,
} from "react";

import Image from "next/image";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import {
  AdminProduct,
  getProducts,
  deleteProduct,
} from "@/lib/adminProducts";

export default function AdminProductsPage() {

  const [products, setProducts] =
    useState<AdminProduct[]>([]);

  useEffect(() => {

    async function loadProducts() {

      try {

        const data =
          await getProducts();

        setProducts(data);

      } catch (error) {

        console.error(
          "Failed to load products:",
          error
        );

      }

    }

    loadProducts();

  }, []);

  async function handleDelete(
    id: string
  ) {

    try {

      await deleteProduct(id);

      const data =
        await getProducts();

      setProducts(data);

    } catch (error) {

      console.error(
        "Failed to delete product:",
        error
      );

    }

  }

  return (

    <main
      className="
        min-h-screen
        bg-[#f5f5f5]
      "
    >

      <Navbar />

      <section
        className="
          max-w-7xl
          mx-auto
          px-6
          py-20
        "
      >

        <div className="mb-12">

          <p
            className="
              uppercase
              tracking-[6px]
              text-gray-500
              text-sm
              mb-3
            "
          >
            Admin Dashboard
          </p>

          <h1
            className="
              text-5xl
              lg:text-7xl
              font-black
              text-black
            "
          >
            Product Library
          </h1>

        </div>

        {products.length === 0 ? (

          <div
            className="
              bg-white
              rounded-[32px]
              p-12
              text-center
            "
          >

            <h2
              className="
                text-3xl
                font-bold
                text-black
                mb-4
              "
            >
              No Products Yet
            </h2>

            <p className="text-gray-500">
              Save products from the AI Studio first.
            </p>

          </div>

        ) : (

          <div
            className="
              grid
              md:grid-cols-2
              lg:grid-cols-3
              gap-8
            "
          >

            {products.map(
              (
                product,
                index
              ) => (

                <div
                  key={
                    product.id ??
                    index
                  }
                  className="
                    bg-white
                    rounded-[24px]
                    overflow-hidden
                    shadow-sm
                  "
                >

                  {product.image && (

                    <div
                      className="
                        relative
                        h-[280px]
                      "
                    >

                      <Image
                        src={
                          product.image
                        }
                        alt={
                          product.name
                        }
                        fill
                        className="
                          object-cover
                        "
                      />

                    </div>

                  )}

                  <div className="p-6">

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
                        text-2xl
                        font-bold
                        text-black
                        mb-3
                      "
                    >
                      {product.name}
                    </h3>

                    <p
                      className="
                        text-sm
                        text-gray-500
                        mb-3
                      "
                    >
                      Color:{" "}
                      {product.color}
                    </p>

                    <p
                      className="
                        text-lg
                        font-bold
                        text-black
                        mb-3
                      "
                    >
                      Rs. {product.price}
                    </p>

                    <p
                      className="
                        text-gray-600
                        mb-6
                      "
                    >
                      {
                        product.description
                      }
                    </p>

                    <button
                      onClick={() => {

                        if (
                          product.id
                        ) {

                          handleDelete(
                            product.id
                          );

                        }

                      }}
                      className="
                        w-full
                        h-12
                        rounded-full
                        bg-black
                        text-white
                        font-semibold
                      "
                    >
                      Delete Product
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