"use client";

import AdminGuard from "./AdminGuard";

import { useEffect, useState } from "react";
import Image from "next/image";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { saveProduct } from "@/lib/adminProducts";
import { getProducts } from "@/lib/firestoreProducts";
import { getOrders } from "@/lib/firestoreOrders";

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

  const [productPrice,
    setProductPrice] =
    useState("");

  const [analysis, setAnalysis] =
    useState<any>(null);

  const [productCount,
    setProductCount] =
    useState(0);

  const [orderCount,
    setOrderCount] =
    useState(0);

  const [revenue,
    setRevenue] =
    useState(0);

  useEffect(() => {

    async function loadAnalytics() {

      try {

        const products =
          await getProducts();

        const orders =
          await getOrders();

        setProductCount(
          products.length
        );

        setOrderCount(
          orders.length
        );

        const totalRevenue =
          orders.reduce(
            (
              sum: number,
              order: any
            ) =>
              sum +
              Number(
                order.total || 0
              ),
            0
          );

        setRevenue(
          totalRevenue
        );

      } catch (error) {

        console.error(error);

      }

    }

    loadAnalytics();

  }, []);

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

  name: productName,

  category: productCategory,

  color: productColor,

  price: Number(productPrice),

  description: productDescription,

  image: preview || "",

  gallery: [],

  variants: [],

  featured: false,

  trending: false,

  bestseller: false,

  newArrival: true,

  active: true,

});

      alert(
        "Product saved successfully."
      );

      setProductName("");
      setProductCategory("");
      setProductColor("");
      setProductDescription("");
      setProductPrice("");

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

        <section
          className="
            max-w-7xl
            mx-auto
            px-6
            py-20
          "
        >

          {/* ANALYTICS */}

          <div
            className="
              grid
              md:grid-cols-3
              gap-6
              mb-12
            "
          >

            <div
              className="
                bg-white
                rounded-[24px]
                p-6
                shadow-sm
              "
            >
              <p className="text-gray-500">
                Products
              </p>

              <h2
                className="
                  text-4xl
                  font-black
                  text-black
                "
              >
                {productCount}
              </h2>
            </div>

            <div
              className="
                bg-white
                rounded-[24px]
                p-6
                shadow-sm
              "
            >
              <p className="text-gray-500">
                Orders
              </p>

              <h2
                className="
                  text-4xl
                  font-black
                  text-black
                "
              >
                {orderCount}
              </h2>
            </div>

            <div
              className="
                bg-white
                rounded-[24px]
                p-6
                shadow-sm
              "
            >
              <p className="text-gray-500">
                Revenue
              </p>

              <h2
                className="
                  text-4xl
                  font-black
                  text-black
                "
              >
                Rs. {revenue}
              </h2>
            </div>

          </div>

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

              <p
                className="
                  uppercase
                  tracking-[6px]
                  text-sm
                  text-gray-500
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
                  mb-4
                "
              >
                Product AI Studio
              </h1>

              <p
                className="
                  text-xl
                  text-gray-600
                "
              >
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

          {/* KEEP THE REST OF YOUR EXISTING PRODUCT AI STUDIO BELOW THIS LINE */}

        </section>

        <Footer />

      </main>

    </AdminGuard>

  );

}