"use client";
import AdminGuard
from "./AdminGuard";

import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { saveProduct } from "@/lib/adminProducts";

import {
  Sparkles,
  ImageIcon,
} from "lucide-react";

export default function AdminPage() {

  const [preview, setPreview] =
    useState<string | null>(null);

  const [fileName, setFileName] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [productName, setProductName] =
    useState("");

  const [productCategory, setProductCategory] =
    useState("");

  const [productColor, setProductColor] =
    useState("");

  const [productDescription,
    setProductDescription] =
    useState("");
    
    
    const [productPrice, setProductPrice] =
  useState("");

  const [analysis, setAnalysis] =
    useState<any>(null);

  function handleFileUpload(
  e: React.ChangeEvent<HTMLInputElement>
) {

  const file =
    e.target.files?.[0];

  if (!file) return;

  setFileName(
    file.name
  );

  setPreview(
    `/products/${file.name}`
  );

}
  async function analyzeProduct() {

    try {

      setLoading(true);

      const response =
        await fetch(
          "/api/analyze",
          {
            method: "POST",
          }
        );

      const data =
        await response.json();

      setAnalysis(data);

      setProductName(
        data.name
      );

      setProductCategory(
        data.category
      );

      setProductColor(
        data.color
      );

      setProductDescription(
        data.description
      );

    } catch (error) {

      console.error(error);

      alert(
        "Failed to analyze product."
      );

    } finally {

      setLoading(false);

    }

  }

 async function handleSaveProduct() {

  if (!productName) {

    alert(
      "Analyze a product first."
    );

    return;

  }

  try {

    await saveProduct({

  name:
    productName,

  category:
    productCategory,

  color:
    productColor,

  price:
    Number(productPrice),

  description:
    productDescription,

  image:
    preview || "",

});

    alert(
      "Product saved successfully."
    );

    setProductName("");
    setProductCategory("");
    setProductColor("");
    setProductDescription("");

    setPreview(null);
    setFileName("");

    setAnalysis(null);

  } catch (error) {

    console.error(error);

    alert(
      "Failed to save product."
    );

  }

}
  return (

  <AdminGuard>

    <main>

      <Navbar />

      <section className="
        max-w-7xl
        mx-auto
        px-6
        py-20
      ">

        <div
          className="
            flex
            flex-col
            lg:flex-row
            lg:items-center
            lg:justify-between
            gap-6
            mb-14
          "
        >

          <div>

            <p className="
              uppercase
              tracking-[6px]
              text-sm
              text-gray-500
              mb-3
            ">
              Admin Dashboard
            </p>

            <h1 className="
              text-5xl
              lg:text-7xl
              font-black
              text-black
              mb-4
            ">
              Product AI Studio
            </h1>

            <p className="
              text-xl
              text-gray-600
            ">
              Upload products,
              review AI results,
              edit details and save.
            </p>

          </div>

          <a
            href="/admin/products"
            className="
              h-14
              px-8
              rounded-full
              bg-black
              text-white
              font-bold
              flex
              items-center
              justify-center
            "
          >
            Product Library
          </a>

        </div>

        <div className="
          grid
          lg:grid-cols-2
          gap-10
        ">

          {/* UPLOAD */}

          <div className="
            bg-white
            rounded-[32px]
            p-8
            shadow-sm
          ">

            <h2 className="
              text-3xl
              font-black
              text-black
              mb-6
            ">
              Upload Product
            </h2>

            <label
              className="
                relative
                h-[400px]
                border-2
                border-dashed
                border-gray-300
                rounded-[24px]
                overflow-hidden
                flex
                items-center
                justify-center
                cursor-pointer
              "
            >

              <input
                type="file"
                accept="image/*"
                onChange={
                  handleFileUpload
                }
                className="hidden"
              />

              {!preview ? (

                <div className="
                  flex
                  flex-col
                  items-center
                ">

                  <ImageIcon
                    size={64}
                    className="
                      text-gray-400
                      mb-4
                    "
                  />

                  <p className="
                    font-semibold
                    text-black
                  ">
                    Upload Product Image
                  </p>

                </div>

              ) : (

                <Image
                  src={preview}
                  alt="Preview"
                  fill
                  className="
                    object-cover
                  "
                />

              )}

            </label>

            {fileName && (

              <p className="
                mt-4
                text-gray-600
              ">
                {fileName}
              </p>

            )}

          </div>

          {/* AI */}

          <div className="
            bg-black
            text-white
            rounded-[32px]
            p-8
          ">

            <div className="
              flex
              items-center
              gap-3
              mb-8
            ">

              <Sparkles size={28} />

              <h2 className="
                text-3xl
                font-black
              ">
                AI Analysis
              </h2>

            </div>

            <div className="
              space-y-4
            ">

              <div className="bg-white/10 rounded-xl p-4">
                Color: {analysis?.color ?? "Waiting..."}
              </div>

              <div className="bg-white/10 rounded-xl p-4">
                Category: {analysis?.category ?? "Waiting..."}
              </div>

              <div className="bg-white/10 rounded-xl p-4">
                Style: {analysis?.style ?? "Waiting..."}
              </div>

            </div>

            <button
              onClick={
                analyzeProduct
              }
              disabled={loading}
              className="
                mt-8
                w-full
                h-14
                rounded-full
                bg-white
                text-black
                font-bold
              "
            >
              {loading
                ? "Analyzing..."
                : "Analyze Product"}
            </button>

          </div>

        </div>

        {/* EDITABLE PRODUCT */}

        <div className="
          mt-10
          bg-white
          rounded-[32px]
          p-8
          shadow-sm
        ">

          <h2 className="
            text-3xl
            font-black
            text-black
            mb-6
          ">
            Product Details
          </h2>

          <div className="
            grid
            md:grid-cols-2
            gap-6
          ">

            <input
              value={productName}
              onChange={(e) =>
                setProductName(
                  e.target.value
                )
              }
              placeholder="Product Name"
              className="
                h-14
                rounded-xl
                bg-[#f5f5f5]
                px-5
              "
            />

            <input
              value={productCategory}
              onChange={(e) =>
                setProductCategory(
                  e.target.value
                )
              }
              placeholder="Category"
              className="
                h-14
                rounded-xl
                bg-[#f5f5f5]
                px-5
              "
            />

            <input
              value={productColor}
              onChange={(e) =>
                setProductColor(
                  e.target.value
                )
              }
              placeholder="Color"
              className="
                h-14
                rounded-xl
                bg-[#f5f5f5]
                px-5
              "
            />
<input
  value={productPrice}
  onChange={(e) =>
    setProductPrice(
      e.target.value
    )
  }
  placeholder="Price"
  type="number"
  className="
    h-14
    rounded-xl
    bg-[#f5f5f5]
    px-5
  "
/>
          </div>

          <textarea
            value={
              productDescription
            }
            onChange={(e) =>
              setProductDescription(
                e.target.value
              )
            }
            placeholder="Description"
            className="
              mt-6
              w-full
              h-[180px]
              rounded-xl
              bg-[#f5f5f5]
              p-5
              resize-none
            "
          />

          <button
            onClick={
              handleSaveProduct
            }
            className="
              mt-6
              h-14
              px-8
              rounded-full
              bg-black
              text-white
              font-bold
            "
          >
            Save Product
          </button>

        </div>

      </section>

      <Footer />

    </main>

</AdminGuard>

);
}