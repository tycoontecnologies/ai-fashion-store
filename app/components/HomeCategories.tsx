"use client";

import Link from "next/link";

const categories = [
  "Home",
  "Men",
  "Women",
  "T-Shirts",
  "Shirts",
  "Polo",
  "Streetwear",
  "Jeans",
  "Shoes",
  "Accessories",
  "New Arrivals",
  "Trending",
  "Featured"
];

export default function HomeCategories() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-4">
      <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm">
        {categories.map((category) => (
          <Link
            key={category}
            href={`/collections/${category.toLowerCase().replace(/\s+/g,"-")}`}
            className="
              text-gray-600
              hover:text-[#d6aa5a]
              hover:underline
              transition-all
              font-medium
            "
          >
            {category}
          </Link>
        ))}
      </div>
    </section>
  );
}
