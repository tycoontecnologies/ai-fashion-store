"use client";

import { useEffect,useState } from "react";

import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory
} from "@/lib/adminCategories";

export default function Categories(){

  const [items,setItems] =
    useState<any[]>([]);

  const [name,setName] =
    useState("");

  async function load(){

    const data =
      await getCategories();

    setItems(data);

  }

  useEffect(()=>{
    load();
  },[]);

  async function create(){

    if(!name) return;

    await addCategory(name);

    setName("");

    await load();

  }

  async function edit(
    id:string,
    current:string
  ){

    const value =
      prompt(
        "Category",
        current
      );

    if(!value) return;

    await updateCategory(
      id,
      value
    );

    await load();

  }

  async function remove(
    id:string
  ){

    if(
      !confirm(
        "Delete Category?"
      )
    ) return;

    await deleteCategory(id);

    await load();

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
        Categories
      </h1>

      <div
        className="
          flex
          gap-3
          mb-8
        "
      >

        <input
          value={name}
          onChange={(e)=>
            setName(
              e.target.value
            )
          }
          placeholder="Category"
          className="
            border
            p-3
            rounded-xl
            flex-1
          "
        />

        <button
          onClick={create}
          className="
            bg-black
            text-white
            px-6
            rounded-xl
          "
        >
          Add
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

              <th
                className="
                  p-4
                  text-left
                "
              >
                Category
              </th>

              <th
                className="
                  p-4
                  text-left
                "
              >
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {items.map(
              (c:any)=>(
                <tr
                  key={c.id}
                  className="
                    border-b
                  "
                >

                  <td
                    className="
                      p-4
                    "
                  >
                    {c.name}
                  </td>

                  <td
                    className="
                      p-4
                    "
                  >

                    <div
                      className="
                        flex
                        gap-2
                      "
                    >

                      <button
                        onClick={()=>
                          edit(
                            c.id,
                            c.name
                          )
                        }
                        className="
                          bg-blue-600
                          text-white
                          px-4
                          py-2
                          rounded
                        "
                      >
                        Edit
                      </button>

                      <button
                        onClick={()=>
                          remove(
                            c.id
                          )
                        }
                        className="
                          bg-red-600
                          text-white
                          px-4
                          py-2
                          rounded
                        "
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}
