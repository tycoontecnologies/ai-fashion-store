"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  ShoppingBag,
  Search,
  User,
  Heart,
  Menu,
  X,
} from "lucide-react";

import { useCart } from "@/app/context/CartContext";

export default function Navbar() {

  const router =
    useRouter();

  const {
    cart,
    wishlist,
  } = useCart();

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [searchOpen,
    setSearchOpen] =
    useState(false);

  const [searchQuery,
    setSearchQuery] =
    useState("");

  function handleSearch() {

    if (
      !searchQuery.trim()
    ) return;

    router.push(
      `/search?q=${encodeURIComponent(
        searchQuery
      )}`
    );

    setSearchOpen(false);

  }

  return (

    <>

      <header className="
        w-full
        bg-[#f5f5f5]
        border-b
        border-gray-200
        sticky
        top-0
        z-50
      ">

        <div className="
          max-w-7xl
          mx-auto
          px-6
          lg:px-8
          py-5
          flex
          items-center
          justify-between
        ">

          <Link
            href="/"
            className="
              text-3xl
              lg:text-5xl
              font-light
              tracking-[8px]
              text-black
            "
          >
            GUESS360
          </Link>

          <nav className="
            hidden
            lg:flex
            items-center
            gap-8
            text-base
            font-medium
            text-black
          ">

            <Link href="/">
              Shop
            </Link>

            <Link href="/style-quiz">
              AI Stylist
            </Link>

            <Link href="/try-on">
              Try-On
            </Link>

            <Link href="/profile">
              Profile
            </Link>

            <Link href="/wishlist">
              Wishlist
            </Link>

          </nav>

          <div className="
            flex
            items-center
            gap-3
          ">

            <button
              onClick={() =>
                setSearchOpen(
                  true
                )
              }
              className="
                hidden
                lg:flex
                w-12
                h-12
                rounded-full
                bg-white
                items-center
                justify-center
                shadow-sm
              "
            >

              <Search
                size={18}
                className="
                  text-black
                "
              />

            </button>

            <Link
              href="/profile"
              className="
                hidden
                lg:flex
                w-12
                h-12
                rounded-full
                bg-white
                items-center
                justify-center
                shadow-sm
              "
            >

              <User
                size={18}
                className="
                  text-black
                "
              />

            </Link>

            <Link
              href="/wishlist"
              className="
                relative
                w-12
                h-12
                rounded-full
                bg-white
                flex
                items-center
                justify-center
                shadow-sm
              "
            >

              <Heart
                size={18}
                className="
                  text-black
                "
              />

              <div className="
                absolute
                -top-1
                -right-1
                w-5
                h-5
                rounded-full
                bg-black
                text-white
                text-[10px]
                flex
                items-center
                justify-center
                font-bold
              ">
                {wishlist.length}
              </div>

            </Link>

            <Link
              href="/cart"
              className="
                relative
                w-12
                h-12
                rounded-full
                bg-black
                text-white
                flex
                items-center
                justify-center
              "
            >

              <ShoppingBag
                size={18}
              />

              <div className="
                absolute
                -top-1
                -right-1
                w-5
                h-5
                rounded-full
                bg-red-500
                text-white
                text-[10px]
                flex
                items-center
                justify-center
                font-bold
              ">
                {cart.length}
              </div>

            </Link>

            <button
              onClick={() =>
                setMenuOpen(
                  !menuOpen
                )
              }
              className="
                lg:hidden
                w-12
                h-12
                rounded-full
                bg-white
                flex
                items-center
                justify-center
              "
            >

              {menuOpen ? (
                <X size={20} />
              ) : (
                <Menu size={20} />
              )}

            </button>

          </div>

        </div>

      </header>

      {searchOpen && (

        <div className="
          fixed
          inset-0
          bg-black/50
          z-[100]
          flex
          items-start
          justify-center
          pt-32
        ">

          <div className="
            bg-white
            rounded-[32px]
            p-8
            w-full
            max-w-2xl
            mx-6
          ">

            <input
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(
                  e.target.value
                )
              }
              onKeyDown={(e) => {

                if (
                  e.key === "Enter"
                ) {

                  handleSearch();

                }

              }}
              placeholder="Search products..."
              className="
                w-full
                h-16
                px-6
                rounded-full
                border
                text-black
              "
            />

            <div className="
              flex
              justify-end
              gap-3
              mt-6
            ">

              <button
                onClick={() =>
                  setSearchOpen(
                    false
                  )
                }
                className="
                  h-12
                  px-6
                  rounded-full
                  border
                "
              >
                Cancel
              </button>

              <button
                onClick={
                  handleSearch
                }
                className="
                  h-12
                  px-6
                  rounded-full
                  bg-black
                  text-white
                "
              >
                Search
              </button>

            </div>

          </div>

        </div>

      )}

    </>

  );

}