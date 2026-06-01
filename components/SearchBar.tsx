"use client";

import { Search } from "lucide-react";

interface Props {
  search: string;
  setSearch: (value: string) => void;
}

export default function SearchBar({
  search,
  setSearch,
}: Props) {

  return (

    <div
      className="
        w-full
        lg:w-[700px]
        relative
      "
    >

      <Search
        size={24}
        className="
          absolute
          left-7
          top-1/2
          -translate-y-1/2
          text-gray-500
        "
      />

      <input
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        placeholder="Search products, styles, colors, occasions..."
        className="
          w-full
          h-20
          pl-16
          pr-8
          rounded-full
          bg-white
          border
          border-gray-200
          text-black
          placeholder:text-gray-400
          text-xl
          outline-none
          shadow-md
          focus:border-black
          transition-all
        "
      />

    </div>

  );
}