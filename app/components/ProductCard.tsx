"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/app/context/CartContext";
import QuickView from "@/components/QuickView";
import ProductRating from "@/components/ProductRating";

export default function ProductCard({ product }: any) {

  const { addToCart, addToWishlist } = useCart();
  const [openQuickView,setOpenQuickView]=useState(false);

  const productUrl="/product/"+(product.id || product.slug);

  return(
    <>
      <QuickView
        product={product}
        open={openQuickView}
        onClose={()=>setOpenQuickView(false)}
      />

      <div className="group bg-white rounded-[24px] overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-500">

        <Link href={productUrl} prefetch={false}>

          <Image
            src={
              product.image && String(product.image).trim()!==""
                ? product.image
                : "/products/product_0001.png"
            }
            alt={product.name}
            width={800}
            height={1000}
            className="w-full h-[360px] object-cover"
          />

        </Link>

        <div className="p-5">

          <h3 className="text-xl font-bold text-black mb-2">
            {product.name}
          </h3>

          <ProductRating rating={4.8}/>

          <div className="flex justify-between items-center mt-4">

            <div className="text-2xl font-black">
              Rs. {product.price}
            </div>

            <div className="flex gap-2">

              <button
                onClick={()=>setOpenQuickView(true)}
                className="w-10 h-10 rounded-full border flex items-center justify-center">
                <Eye size={16}/>
              </button>

              <button
                onClick={()=>addToWishlist(product)}
                className="w-10 h-10 rounded-full border flex items-center justify-center">
                <Heart size={16}/>
              </button>

              <button
                onClick={()=>addToCart(product)}
                className="px-4 h-10 rounded-full bg-black text-white flex items-center gap-2">
                <ShoppingBag size={14}/>
                Add
              </button>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}
