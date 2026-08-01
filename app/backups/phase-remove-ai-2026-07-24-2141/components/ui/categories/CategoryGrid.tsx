"use client";

import Image from "next/image";
import Link from "next/link";
import { categories } from "./categoryData";

const layout = [
  "col-span-2 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-2",
  "col-span-2 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-2",
  "col-span-2 row-span-1",
  "col-span-1 row-span-1",
];

export default function CategoryGrid() {
  return (
    <section className="mx-auto max-w-[1700px] px-6 py-20">

      <div className="mb-10">
        <h2 className="text-center text-4xl font-semibold tracking-wide">
          Shop By Category
        </h2>
      </div>

      <div className="grid auto-rows-[220px] grid-cols-4 gap-[2px] bg-neutral-300">

        {categories.map((item, i) => (

          <Link
            key={item.name}
            href={item.href}
            className={`group relative overflow-hidden bg-white ${layout[i % layout.length]}`}
          >

            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition" />

            <div className="absolute bottom-5 left-5">

              <div className="rounded-full bg-white/95 px-5 py-2 shadow-lg backdrop-blur">

                <span className="text-xs font-semibold uppercase tracking-[0.18em]">
                  {item.name}
                </span>

              </div>

            </div>

          </Link>

        ))}

      </div>

    </section>
  );
}
