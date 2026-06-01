"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  getProducts,
} from "@/lib/firestoreProducts";

export default function FirestoreTestPage() {

  const [products, setProducts] =
    useState<any[]>([]);

  useEffect(() => {

    async function loadProducts() {

      const data =
        await getProducts();

      setProducts(data);

    }

    loadProducts();

  }, []);

  return (

    <main className="
      min-h-screen
      p-10
      bg-white
    ">

      <h1 className="
        text-4xl
        font-black
        text-black
        mb-10
      ">
        Firestore Test
      </h1>

      {products.map(
        (product) => (

          <div
            key={product.id}
            className="
              border
              p-5
              rounded-xl
              mb-5
            "
          >

            <h2 className="
              text-2xl
              font-bold
              text-black
            ">
              {product.name}
            </h2>

            <p>
              {product.category}
            </p>

            <p>
              {product.color}
            </p>

            <p>
              Rs. {product.price}
            </p>

          </div>

        )
      )}

    </main>

  );

}