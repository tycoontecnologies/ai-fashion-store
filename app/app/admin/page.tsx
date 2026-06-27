"use client";

import AdminGuard from "./AdminGuard";
import { useEffect, useState } from "react";
import Image from "next/image";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { saveProduct } from "@/lib/adminProducts";
import { getProducts } from "@/lib/firestoreProducts";
import { getOrders } from "@/lib/firestoreOrders";

import { storage } from "@/lib/storage";

import {
  ref,
  uploadBytes,
  getDownloadURL
} from "firebase/storage";

import {
  Sparkles,
  ImageIcon
} from "lucide-react";

export default function AdminPage() {

  const [file,setFile] = useState<File | null>(null);
  const [preview,setPreview] = useState<string | null>(null);
  const [fileName,setFileName] = useState("");

  const [loading,setLoading] = useState(false);

  const [productName,setProductName] = useState("");
  const [productCategory,setProductCategory] = useState("");
  const [productColor,setProductColor] = useState("");
  const [productDescription,setProductDescription] = useState("");
  const [productPrice,setProductPrice] = useState("");

  const [analysis,setAnalysis] = useState<any>(null);

  const [productCount,setProductCount] = useState(0);
  const [orderCount,setOrderCount] = useState(0);
  const [revenue,setRevenue] = useState(0);

  useEffect(() => {

    async function loadAnalytics() {

      const products = await getProducts();
      const orders = await getOrders();

      setProductCount(products.length);
      setOrderCount(orders.length);

      const totalRevenue =
        orders.reduce(
          (sum:number,order:any)=>
            sum + Number(order.total || 0),
          0
        );

      setRevenue(totalRevenue);
    }

    loadAnalytics();

  }, []);

  function handleFileUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {

    const selected =
      e.target.files?.[0];

    if (!selected) return;

    setFile(selected);

    setFileName(selected.name);

    setPreview(
      URL.createObjectURL(selected)
    );

  }

  async function uploadImage() {

    if (!file)
      throw new Error("No image");

    const imageRef = ref(
      storage,
      `products/${Date.now()}-${file.name}`
    );

    await uploadBytes(
      imageRef,
      file
    );

    return await getDownloadURL(
      imageRef
    );

  }

  async function analyzeProduct() {

    try {

      if (!file) {
        alert("Upload image first");
        return;
      }

      setLoading(true);

      const imageUrl =
        await uploadImage();

      const response =
        await fetch(
          "/api/analyze",
          {
            method:"POST",
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify({
              imageUrl
            })
          }
        );

      const data =
        await response.json();

      setAnalysis(data);

      setProductName(
        data.name || ""
      );

      setProductCategory(
        data.category || ""
      );

      setProductColor(
        data.color || ""
      );

      setProductDescription(
        data.description || ""
      );

      setPreview(imageUrl);

    } catch(error) {

      console.error(error);

      alert("Analysis failed");

    } finally {

      setLoading(false);

    }

  }

  async function handleSaveProduct() {

    try {

      await saveProduct({

        name: productName,
        category: productCategory,
        color: productColor,
        price: Number(productPrice),
        description: productDescription,
        image: preview || ""

      });

      alert("Product saved");

    } catch(error) {

      console.error(error);

      alert("Save failed");

    }

  }

  return (

    <AdminGuard>

      <main>

        <Navbar />

        <section className="max-w-7xl mx-auto px-6 py-20">

          <div className="grid md:grid-cols-3 gap-6 mb-12">

            <div className="bg-white rounded-[24px] p-6">
              Products: {productCount}
            </div>

            <div className="bg-white rounded-[24px] p-6">
              Orders: {orderCount}
            </div>

            <div className="bg-white rounded-[24px] p-6">
              Revenue: Rs. {revenue}
            </div>

          </div>

          <div className="grid lg:grid-cols-2 gap-10">

            <div className="bg-white rounded-[32px] p-8">

              <label className="relative h-[400px] border-2 border-dashed rounded-[24px] flex items-center justify-center cursor-pointer overflow-hidden">

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />

                {!preview ? (
                  <ImageIcon size={60}/>
                ) : (
                  <Image
                    src={preview}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                )}

              </label>

              <p className="mt-4">
                {fileName}
              </p>

            </div>

            <div className="bg-black text-white rounded-[32px] p-8">

              <h2 className="text-3xl font-black mb-8">
                AI Analysis
              </h2>

              <div className="space-y-4">

                <div>
                  Color: {analysis?.color}
                </div>

                <div>
                  Category: {analysis?.category}
                </div>

                <div>
                  Style: {analysis?.style}
                </div>

              </div>

              <button
                onClick={analyzeProduct}
                className="mt-8 w-full h-14 bg-white text-black rounded-full font-bold"
              >
                {loading
                  ? "Analyzing..."
                  : "Analyze Product"}
              </button>

            </div>

          </div>

          <div className="mt-10 bg-white rounded-[32px] p-8">

            <input
              value={productName}
              onChange={(e)=>setProductName(e.target.value)}
              placeholder="Product Name"
              className="w-full h-14 px-5 mb-4 bg-gray-100 rounded-xl"
            />

            <input
              value={productCategory}
              onChange={(e)=>setProductCategory(e.target.value)}
              placeholder="Category"
              className="w-full h-14 px-5 mb-4 bg-gray-100 rounded-xl"
            />

            <input
              value={productColor}
              onChange={(e)=>setProductColor(e.target.value)}
              placeholder="Color"
              className="w-full h-14 px-5 mb-4 bg-gray-100 rounded-xl"
            />

            <input
              type="number"
              value={productPrice}
              onChange={(e)=>setProductPrice(e.target.value)}
              placeholder="Price"
              className="w-full h-14 px-5 mb-4 bg-gray-100 rounded-xl"
            />

            <textarea
              value={productDescription}
              onChange={(e)=>setProductDescription(e.target.value)}
              placeholder="Description"
              className="w-full h-40 p-5 bg-gray-100 rounded-xl"
            />

            <button
              onClick={handleSaveProduct}
              className="mt-6 h-14 px-8 bg-black text-white rounded-full"
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
