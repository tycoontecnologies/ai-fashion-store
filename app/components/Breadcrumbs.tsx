"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumbs() {

  const pathname = usePathname();

  const parts =
    pathname
      .split("/")
      .filter(Boolean);

  return (

    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3 text-sm">

      <Link
        href="/"
        className="text-[#d6aa5a]"
      >
        Home
      </Link>

      {parts.map((part,index)=>(

        <span key={index}>

          {" / "}

          <span className="theme-text capitalize">
            {part.replace(/-/g," ")}
          </span>

        </span>

      ))}

    </div>

  );

}
