"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductActions from "@/components/ProductActions";
import RelatedProducts from "@/components/RelatedProducts";
import AIOutfitRecommendations from "@/components/AIOutfitRecommendations";

import { getProductById } from "@/lib/firestoreProducts";

export default function ProductPage() {

  const params = useParams();

  const [product, setProduct] = useState<any>(null);

  const [selectedImage, setSelectedImage] =
    useState("");

  useEffect(() => {

    if (!params.id) return;

    getProductById(params.id as string)
      .then((p: any) => {

        setProduct(p);

        setSelectedImage(
          p?.gallery?.length
            ? p.gallery[0]
            : p?.image || ""
        );

      })
      .catch(console.error);

  }, [params.id]);

  if (!product) {

    return (

      <main className="min-h-screen bg-[#f2f2f2]">

        <Navbar />

        <div className="max-w-7xl mx-auto px-6 py-24 text-black text-2xl">

          Loading...

        </div>

        <Footer />

      </main>

    );

  }

  const gallery =

    product.gallery?.length

      ? product.gallery

      : [product.image];

  return (

    <main className="min-h-screen bg-[#f2f2f2]">

      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid lg:grid-cols-2 gap-16 items-start">

          <div>

            <div className="bg-white rounded-[32px] overflow-hidden shadow-sm">

              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-[700px] object-cover"
              />

            </div>

            <div className="flex gap-3 mt-5 overflow-x-auto">

              {gallery.map((img: string) => (

                <button
                  key={img}
                  onClick={() =>
                    setSelectedImage(img)
                  }
                  className={`
                    rounded-xl
                    overflow-hidden
                    border-2
                    flex-shrink-0
                    ${
                      selectedImage === img
                        ? "border-black"
                        : "border-gray-200"
                    }
                  `}
                >

                  <img
                    src={img}
                    alt={product.name}
                    className="w-24 h-24 object-cover"
                  />

                </button>

              ))}

            </div>

          </div>

          <div className="text-black">

            <p className="uppercase tracking-[5px] text-gray-500 mb-4">

              {product.category}

            </p>

            <h1 className="text-6xl font-black mb-6">

              {product.name}

            </h1>

            <div className="flex gap-3 flex-wrap mb-6">

              <span className="px-4 py-2 bg-white border rounded-full">

                {product.color}

              </span>

              <span className="px-4 py-2 bg-white border rounded-full">

                {product.style || "Casual"}

              </span>

            </div>

            <div className="text-4xl font-black mb-8">

              Rs. {product.price}

            </div>

            <p className="text-lg leading-8 text-gray-700 mb-10">

              {product.description}

            </p>

            <ProductActions
              product={product}
            />

          </div>

        </div>

        <AIOutfitRecommendations
          product={product}
        />

        <RelatedProducts
          currentProduct={product}
        />

      </section>

      <Footer />

    </main>

  );

}