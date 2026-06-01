"use client";

import {
  useEffect,
  useState,
} from "react";

import Image from "next/image";

import {
  useParams,
} from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import ProductActions from "@/components/ProductActions";
import ProductRating from "@/components/ProductRating";
import ProductReviews from "@/components/ProductReviews";
import AIOutfitRecommendations from "@/components/AIOutfitRecommendations";
import RecentlyViewed from "@/components/RecentlyViewed";
import RelatedProducts from "@/components/RelatedProducts";

import {
  getProductById,
} from "@/lib/firestoreProducts";

export default function ProductPage() {

  const params =
    useParams();

  const [
    product,
    setProduct,
  ] = useState<any>(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  useEffect(() => {

    async function loadProduct() {

      try {

        const data =
          await getProductById(
            params.id as string
          );

        setProduct(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    }

    if (params.id) {

      loadProduct();

    }

  }, [params.id]);

  if (loading) {

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
          py-20
        ">

          <h1 className="
            text-4xl
            font-black
            text-black
          ">
            Loading...
          </h1>

        </div>

      </main>

    );

  }

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
          py-20
        ">

          <h1 className="
            text-5xl
            font-black
            text-black
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
          gap-14
        ">

          <div className="
            bg-white
            rounded-[32px]
            overflow-hidden
          ">

            <Image
              src={
                product.image ||
                "/products/1.png"
              }
              alt={product.name}
              width={900}
              height={1000}
              priority
              className="
                w-full
                h-[700px]
                object-cover
              "
            />

          </div>

          <div>

            <p className="
              uppercase
              tracking-[4px]
              text-sm
              text-gray-500
              mb-3
            ">
              {product.category}
            </p>

            <h1 className="
              text-5xl
              lg:text-6xl
              font-black
              text-black
              mb-4
            ">
              {product.name}
            </h1>

            <div className="mb-4">

              <ProductRating
                rating={4.8}
              />

            </div>

            <h2 className="
              text-3xl
              font-bold
              text-black
              mb-8
            ">
              Rs. {product.price}
            </h2>

            <div className="
              flex
              flex-wrap
              gap-3
              mb-8
            ">

              {product.color && (

                <span className="
                  px-4
                  py-2
                  bg-white
                  rounded-full
                  text-black
                  border
                ">
                  {product.color}
                </span>

              )}

            </div>

            <p className="
              text-lg
              text-gray-600
              leading-relaxed
              mb-8
            ">
              {product.description}
            </p>

            <ProductActions
              product={product}
            />

            <div className="
              mt-10
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
                Pair this item with
                neutral sneakers and
                minimal accessories
                for a clean modern look.
              </p>

            </div>

          </div>

        </div>

      </section>

      <ProductReviews
        productId={product.id}
      />

      <RelatedProducts
        currentProduct={product}
      />

      <RecentlyViewed
        currentId={product.id}
      />

      <AIOutfitRecommendations
        product={product}
      />

      <Footer />

    </main>

  );

}