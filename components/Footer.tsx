import Link from "next/link";

import {
  Star,
  Timer,
  BadgePlus,
  Play,
} from "lucide-react";

export default function Footer() {

  return (

    <footer className="
      mt-24
      border-t
      border-black/10
      bg-[#ececec]
    ">

      <div className="
        max-w-[1600px]
        mx-auto
        px-6
        md:px-10
        py-20
      ">

        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-4
          gap-16
        ">

          {/* BRAND */}

          <div>

            <h2 className="
              text-5xl
              font-black
              tracking-[8px]
              text-black
              mb-6
            ">
              GUESS360
            </h2>

            <p className="
              text-gray-600
              text-lg
              leading-relaxed
              max-w-[320px]
            ">
              AI powered fashion shopping,
              styling, recommendations and
              virtual try-on experiences.
            </p>

          </div>

          {/* SHOP */}

          <div>

            <h3 className="
              text-xl
              font-bold
              mb-6
            ">
              Shop
            </h3>

            <div className="
              flex
              flex-col
              gap-4
              text-gray-600
            ">

              <Link href="/">
                Men
              </Link>

              <Link href="/">
                Women
              </Link>

              <Link href="/">
                Trending
              </Link>

              <Link href="/">
                New Arrivals
              </Link>

            </div>

          </div>

          {/* COMPANY */}

          <div>

            <h3 className="
              text-xl
              font-bold
              mb-6
            ">
              Company
            </h3>

            <div className="
              flex
              flex-col
              gap-4
              text-gray-600
            ">

              <Link href="/">
                About
              </Link>

              <Link href="/">
                Careers
              </Link>

              <Link href="/">
                Contact
              </Link>

              <Link href="/">
                Privacy
              </Link>

            </div>

          </div>

          {/* SOCIAL */}

          <div>

            <h3 className="
              text-xl
              font-bold
              mb-6
            ">
              Follow Us
            </h3>

            <div className="
              flex
              items-center
              gap-4
            ">

              <button className="
                w-14
                h-14
                rounded-full
                bg-black
                text-white
                flex
                items-center
                justify-center
                hover:scale-110
                transition-all
              ">
                <Star size={22} />
              </button>

              <button className="
                w-14
                h-14
                rounded-full
                bg-black
                text-white
                flex
                items-center
                justify-center
                hover:scale-110
                transition-all
              ">
                <Timer size={22} />
              </button>

              <button className="
                w-14
                h-14
                rounded-full
                bg-black
                text-white
                flex
                items-center
                justify-center
                hover:scale-110
                transition-all
              ">
               <BadgePlus size={22} />
              </button>

              <button className="
                w-14
                h-14
                rounded-full
                bg-black
                text-white
                flex
                items-center
                justify-center
                hover:scale-110
                transition-all
              ">
                <Play size={22} />
              </button>

            </div>

          </div>

        </div>

        {/* BOTTOM */}

        <div className="
          mt-20
          pt-8
          border-t
          border-black/10
          flex
          flex-col
          md:flex-row
          items-center
          justify-between
          gap-6
        ">

          <p className="
            text-gray-500
          ">
            © 2025 GUESS360.
            All rights reserved.
          </p>

          <div className="
            flex
            gap-6
            text-gray-500
          ">

            <Link href="/">
              Terms
            </Link>

            <Link href="/">
              Privacy
            </Link>

            <Link href="/">
              Cookies
            </Link>

          </div>

        </div>

      </div>

    </footer>

  );
}