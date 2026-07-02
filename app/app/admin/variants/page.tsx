"use client";

import {
  useEffect,
  useState
} from "react";
import Image from "next/image";

import {
  getProducts
} from "@/lib/adminProducts";

import {
  saveVariants
} from "@/lib/adminVariants";

export default function VariantsAdmin(){

  const [products,setProducts] =
    useState<any[]>([]);

  const [productId,setProductId] =
    useState("");

  const [variants,setVariants] =
    useState<any[]>([]);

  const [form,setForm] =
    useState({
      color:"",
      size:"",
      stock:0,
      price:0,
      image:""
    });

  useEffect(()=>{

    async function load(){

      const data =
        await getProducts();

      setProducts(data);

    }

    load();

  },[]);



  async function uploadImage(
    file:File
  ){

    const fd=new FormData();

    fd.append(
      "file",
      file
    );

    const res=await fetch(
      "/api/admin/upload",
      {
        method:"POST",
        body:fd
      }
    );

    const json=
      await res.json();

    if(json.success){

      setForm({
        ...form,
        image:json.url
      });

    }

  }

  function addVariant(){

    setVariants([
      ...variants,
      {
        id:Date.now().toString(),
        ...form
      }
    ]);

    setForm({
      color:"",
      size:"",
      stock:0,
      price:0,
      image:""
    });

  }

  async function save(){

  console.log("PRODUCT ID =", productId);
  console.log("VARIANTS =", variants);

  if(!productId){
    alert("No product selected");
    return;
  }

  await saveVariants(
    productId,
    variants
  );

  console.log("SAVED");

  alert("Variants Saved");

}

  return (

    <div className="p-10">

      <h1
        className="
          text-4xl
          font-black
          mb-8
        "
      >
        Variant & Duplicate Product Manager
      </h1>

      <div
        className="
          bg-white
          p-6
          rounded-3xl
          mb-8
        "
      >

        <select
          value={productId}
          onChange={(e)=>{

            const id=e.target.value;

            setProductId(id);

            const product=
              products.find(
                (p:any)=>
                  p.id===id
              );

            setVariants(
              product?.variants || []
            );

          }}
          className="
            border
            p-3
            rounded-xl
            w-full
            mb-4
          "
        >

          <option value="">
            Select Product
          </option>

          {products.map(
            (p:any)=>(
              <option
                key={p.id}
                value={p.id}
              >
                {p.name}
              </option>
            )
          )}

        </select>

        <div
          className="
            grid
            md:grid-cols-5
            gap-3
          "
        >

          <input
            placeholder="Color"
            value={form.color}
            onChange={(e)=>
              setForm({
                ...form,
                color:e.target.value
              })
            }
            className="
              border
              p-3
              rounded
            "
          />

          <input
            placeholder="Size"
            value={form.size}
            onChange={(e)=>
              setForm({
                ...form,
                size:e.target.value
              })
            }
            className="
              border
              p-3
              rounded
            "
          />

          <input
            placeholder="Stock"
            value={form.stock}
            onChange={(e)=>
              setForm({
                ...form,
                stock:Number(
                  e.target.value
                )
              })
            }
            className="
              border
              p-3
              rounded
            "
          />

          <input
            placeholder="Price"
            value={form.price}
            onChange={(e)=>
              setForm({
                ...form,
                price:Number(
                  e.target.value
                )
              })
            }
            className="
              border
              p-3
              rounded
            "
          />

          <div className="space-y-2">

            <input
              type="file"
              accept="image/*"
              onChange={(e)=>{

                const f=e.target.files?.[0];

                if(f){

                  uploadImage(f);

                }

              }}
              className="
                border
                p-2
                rounded
                w-full
              "
            />

            {form.image && (

              <img
                src={form.image}
                className="
                  h-16
                  w-16
                  object-cover
                  rounded
                  border
                "
              />

            )}

          </div>

        </div>

        <button
          onClick={addVariant}
          className="
            bg-black
            text-white
            px-6
            py-3
            rounded-xl
            mt-4
          "
        >
          Add Variant
        </button>

      </div>

      <div
        className="
          bg-white
          rounded-3xl
          overflow-hidden
        "
      >

        <table
          className="w-full"
        >

          <thead>

            <tr
              className="
                border-b
              "
            >

              <th className="p-4">
                Image
              </th>

              <th className="p-4">
                Color
              </th>

              <th className="p-4">
                Size
              </th>

              <th className="p-4">
                Stock
              </th>

              <th className="p-4">
                Price
              </th>

            </tr>

          </thead>

          <tbody>

            {variants.map(
              (v:any)=>(
                <tr
                  key={v.id}
                  className="
                    border-b
                  "
                >

                  <td className="p-4">

                    {v.image ? (

                      <Image
                        src={v.image}
                        alt={v.color || "Variant"}
                        width={64}
                        height={64}
                        className="
                          w-16
                          h-16
                          object-cover
                          rounded-xl
                          border
                        "
                        unoptimized
                      />

                    ) : (

                      <div
                        className="
                          w-16
                          h-16
                          rounded-xl
                          border
                          bg-gray-100
                          text-xs
                          flex
                          items-center
                          justify-center
                          text-gray-400
                        "
                      >
                        No Image
                      </div>

                    )}

                  </td>

                  <td className="p-4">
                    {v.color}
                  </td>

                  <td className="p-4">
                    {v.size}
                  </td>

                  <td className="p-4">
                    {v.stock}
                  </td>

                  <td className="p-4">
                    {v.price}
                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

      <hr className="my-10"/>



<button
        onClick={save}
        className="
          bg-green-600
          text-white
          px-8
          py-4
          rounded-xl
          mt-8
        "
      >
        Save Variants
      </button>

    </div>

  );

}

