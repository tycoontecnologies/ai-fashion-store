"use client";

import {
  useEffect,
  useState
} from "react";

import {
  getProducts
} from "@/lib/adminProducts";

import {
  getHomepageSettings,
  saveHomepageSettings
} from "@/lib/adminHomepage";

export default function HomepageManager(){

  const [products,setProducts] =
    useState<any[]>([]);

  const [settings,setSettings] =
    useState<any>({
      featured:[],
      trending:[],
      bestseller:[],
      newArrival:[]
    });

  async function load(){

    const p =
      await getProducts();

    const s =
      await getHomepageSettings();

    setProducts(p);
    setSettings(s);

  }

  useEffect(()=>{
    load();
  },[]);

  function toggle(
    section:string,
    id:string
  ){

    const current =
      settings[section] || [];

    const exists =
      current.includes(id);

    setSettings({

      ...settings,

      [section]:
      exists
      ? current.filter(
          (x:string)=>
            x !== id
        )
      : [
          ...current,
          id
        ]

    });

  }

  async function save(){

    await saveHomepageSettings(
      settings
    );

    alert(
      "Homepage Saved"
    );

  }

  const sections = [

    {
      key:"featured",
      title:"Featured Products"
    },

    {
      key:"trending",
      title:"Trending Products"
    },

    {
      key:"bestseller",
      title:"Best Sellers"
    },

    {
      key:"newArrival",
      title:"New Arrivals"
    }

  ];

  return (

    <div className="p-10">

      <h1
        className="
          text-4xl
          font-black
          mb-8
        "
      >
        Homepage Manager
      </h1>

      {sections.map(
        (section)=>(
          <div
            key={section.key}
            className="
              bg-white
              p-6
              rounded-3xl
              mb-8
            "
          >

            <h2
              className="
                text-2xl
                font-bold
                mb-4
              "
            >
              {section.title}
            </h2>

            <div
              className="
                grid
                md:grid-cols-2
                gap-3
              "
            >

              {products.map(
                (p:any)=>(
                  <label
                    key={p.id}
                    className="
                      flex
                      items-center
                      gap-3
                      border
                      p-3
                      rounded-xl
                    "
                  >

                    <input
                      type="checkbox"
                      checked={
                        (
                          settings[
                            section.key
                          ] || []
                        ).includes(
                          p.id
                        )
                      }
                      onChange={()=>
                        toggle(
                          section.key,
                          p.id
                        )
                      }
                    />

                    <span>
                      {p.name}
                    </span>

                  </label>
                )
              )}

            </div>

          </div>
        )
      )}

      <button
        onClick={save}
        className="
          bg-black
          text-white
          px-8
          py-4
          rounded-xl
        "
      >
        Save Homepage
      </button>

    </div>

  );

}
