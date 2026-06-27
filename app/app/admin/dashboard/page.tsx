"use client";

import { useEffect,useState } from "react";
import {
  Search,
  Plus,
  Pencil,
  Trash2
} from "lucide-react";

import {
  getProducts,
  deleteProduct
} from "@/lib/adminProducts";

export default function Dashboard(){

  const [products,setProducts] =
    useState<any[]>([]);

  const [search,setSearch] =
    useState("");

  async function load(){

    const data =
      await getProducts();

    setProducts(data);

  }

  useEffect(()=>{
    load();
  },[]);

  async function removeProduct(
    id:string
  ){

    if(
      !confirm(
        "Delete Product?"
      )
    ) return;

    await deleteProduct(id);

    await load();

  }

  const filtered =
    products.filter((p:any)=>

      (p.name || "")
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )

    );

  return (

    <div className="min-h-screen flex bg-[#f6f7f9]">



      {/* MAIN */}

      <main className="flex-1 p-8">

        <div className="grid grid-cols-4 gap-5 mb-8">

          <div className="bg-white rounded-3xl p-6">
            <div className="text-gray-500">
              Products
            </div>
            <div className="text-4xl font-black">
              {products.length}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6">
            <div className="text-gray-500">
              Categories
            </div>
            <div className="text-4xl font-black">
              17
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6">
            <div className="text-gray-500">
              Featured
            </div>
            <div className="text-4xl font-black">
              {
                products.filter(
                  (p:any)=>
                    p.featured
                ).length
              }
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6">
            <div className="text-gray-500">
              Trending
            </div>
            <div className="text-4xl font-black">
              {
                products.filter(
                  (p:any)=>
                    p.trending
                ).length
              }
            </div>
          </div>

        </div>

        <div className="bg-white rounded-3xl p-6">

          <div className="flex justify-between mb-8">

            <h2 className="text-3xl font-black">
              Products
            </h2>

            <button
              className="
              bg-[#d6aa5a]
              px-5
              py-3
              rounded-xl
              flex
              items-center
              gap-2
            "
            >
              <Plus size={18}/>
              Add Product
            </button>

          </div>

          <div className="relative mb-8">

            <Search
              size={18}
              className="
              absolute
              left-4
              top-4
            "
            />

            <input
              value={search}
              onChange={(e)=>
                setSearch(
                  e.target.value
                )
              }
              placeholder="Search Products"
              className="
              w-full
              h-12
              pl-12
              border
              rounded-xl
            "
            />

          </div>

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left p-4">
                  Product
                </th>

                <th className="text-left p-4">
                  Category
                </th>

                <th className="text-left p-4">
                  Price
                </th>

                <th className="text-left p-4">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filtered.map(
                (p:any)=>(
                  <tr
                    key={p.id}
                    className="
                    border-b
                  "
                  >

                    <td className="p-4">
                      {p.name}
                    </td>

                    <td className="p-4">
                      {p.category}
                    </td>

                    <td className="p-4">
                      Rs. {p.price}
                    </td>

                    <td className="p-4">

                      <div className="flex gap-2">

                        <button
                          className="
                          bg-blue-500
                          text-white
                          p-2
                          rounded
                        "
                        >
                          <Pencil size={16}/>
                        </button>

                        <button
                          onClick={()=>
                            removeProduct(
                              p.id
                            )
                          }
                          className="
                          bg-red-500
                          text-white
                          p-2
                          rounded
                        "
                        >
                          <Trash2 size={16}/>
                        </button>

                      </div>

                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

      </main>

    </div>

  );

}
