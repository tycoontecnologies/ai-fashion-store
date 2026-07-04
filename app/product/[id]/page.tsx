"use client";
import { getVariantGroup } from "@/lib/firestoreProducts";
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

  const [selectedVariant,setSelectedVariant]=useState<any>(null);
  const [variantProducts,setVariantProducts]=useState<any[]>([]);

const [selectedImage,setSelectedImage]=useState("");

  useEffect(() => {

    if (!params.id) return;

    getProductById(params.id as string)
      .then(async (p:any)=>{


setProduct(p);
if(p?.variantGroup){

const group=await getVariantGroup(p.variantGroup);

setVariantProducts(group);

}

console.log("PRODUCT",p);
console.log("VARIANTS",p?.variants);

setSelectedImage(p.image || "");

if (p?.variants?.length) {
  setSelectedVariant(null);
}

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

  const gallery = [
  product.image,
  ...(product.gallery || []),
  ...(product.variants || []).map((v:any) => v.image)
].filter(Boolean).filter(
  (img, index, arr) => arr.indexOf(img) === index
);

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

               {selectedVariant?.color || product.color || "Default"}

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
           {variantProducts.length > 0 && (

<div className="mb-8">

<p className="font-bold mb-3">

Color

</p>

<div className="flex gap-3 flex-wrap">

{variantProducts.map((v:any,index:number)=>(

<button
key={v.id || index}
onClick={() => {
  setSelectedVariant(v);
  setSelectedImage(v.image || product.image);
}}
className={`border rounded-xl p-2 ${
selectedVariant?.id===v.id
?"border-black"
:"border-gray-300"
}`}
>

<img
src={v.image || product.image}
className="w-16 h-16 object-cover rounded-lg"
/>

<div className="text-xs mt-2 text-center">
{v.color || `Variant ${index+1}`}
</div>

</button>

))}

</div>

</div>

)}
<ProductActions
  product={{
    ...product,
    image:selectedImage,
    selectedVariant
  }}
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



