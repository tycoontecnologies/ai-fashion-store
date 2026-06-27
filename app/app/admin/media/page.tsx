"use client";

import {
  useState
} from "react";

import { storage }
from "@/lib/firebase";

import {
  ref,
  uploadBytes,
  getDownloadURL
}
from "firebase/storage";

export default function MediaManager(){

  const [uploading,setUploading] =
    useState(false);

  const [images,setImages] =
    useState<string[]>([]);

  async function upload(
    file:any
  ){

    setUploading(true);

    const imageRef =
      ref(
        storage,
        `media/${Date.now()}-${file.name}`
      );

    await uploadBytes(
      imageRef,
      file
    );

    const url =
      await getDownloadURL(
        imageRef
      );

    setImages(
      prev=>[
        url,
        ...prev
      ]
    );

    setUploading(false);

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
        Media Library
      </h1>

      <div
        className="
          bg-white
          rounded-3xl
          p-8
          mb-8
        "
      >

        <input
          type="file"
          accept="image/*"
          onChange={(e)=>{

            const file =
              e.target.files?.[0];

            if(file)
              upload(file);

          }}
        />

        {uploading && (
          <div
            className="
              mt-4
            "
          >
            Uploading...
          </div>
        )}

      </div>

      <div
        className="
          grid
          md:grid-cols-4
          gap-6
        "
      >

        {images.map(
          (img)=>(
            <div
              key={img}
              className="
                bg-white
                p-4
                rounded-3xl
              "
            >

              <img
                src={img}
                className="
                  w-full
                  h-48
                  object-cover
                  rounded-xl
                "
              />

              <button
                onClick={()=>
                  navigator
                    .clipboard
                    .writeText(
                      img
                    )
                }
                className="
                  mt-3
                  w-full
                  bg-black
                  text-white
                  p-3
                  rounded-xl
                "
              >
                Copy URL
              </button>

            </div>
          )
        )}

      </div>

    </div>

  );

}
