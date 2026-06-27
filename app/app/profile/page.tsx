"use client";

import {
  useEffect,
} from "react";

import {
  useRouter,
} from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import {
  useCart,
} from "@/app/context/CartContext";

import {
  useAuth,
} from "@/app/context/AuthContext";

export default function ProfilePage() {

  const router =
    useRouter();

  const {
    user,
    loading,
    logout,
  } = useAuth();

  const {
    cart,
    wishlist,
  } = useCart();

  useEffect(() => {

    if (
      !loading &&
      !user
    ) {

      router.push(
        "/login"
      );

    }

  }, [
    user,
    loading,
    router,
  ]);

  if (
    loading ||
    !user
  ) {

    return null;

  }

  return (

    <main className="
      min-h-screen
      bg-[#f5f5f5]
    ">

      <Navbar />

      <section className="
        max-w-7xl
        mx-auto
        px-6
        py-20
      ">

        <p className="
          uppercase
          tracking-[6px]
          text-sm
          text-gray-500
          mb-3
        ">
          My Account
        </p>

        <h1 className="
          text-5xl
          lg:text-7xl
          font-black
          text-black
          mb-4
        ">
          Profile
        </h1>

        <p className="
          text-lg
          text-gray-600
          mb-12
        ">
          {user.email}
        </p>

        <div className="
          grid
          lg:grid-cols-3
          gap-6
        ">

          <div className="
            bg-white
            rounded-[32px]
            p-8
          ">

            <p className="
              text-gray-500
              mb-2
            ">
              Cart Items
            </p>

            <h2 className="
              text-5xl
              font-black
              text-black
            ">
              {cart.length}
            </h2>

          </div>

          <div className="
            bg-white
            rounded-[32px]
            p-8
          ">

            <p className="
              text-gray-500
              mb-2
            ">
              Wishlist
            </p>

            <h2 className="
              text-5xl
              font-black
              text-black
            ">
              {wishlist.length}
            </h2>

          </div>

          <div className="
            bg-white
            rounded-[32px]
            p-8
          ">

            <p className="
              text-gray-500
              mb-2
            ">
              Orders
            </p>

            <h2 className="
              text-5xl
              font-black
              text-black
            ">
              0
            </h2>

          </div>

        </div>

        <button
          onClick={
            logout
          }
          className="
            mt-10
            h-14
            px-8
            rounded-full
            bg-black
            text-white
            font-bold
          "
        >
          Logout
        </button>

      </section>

      <Footer />

    </main>

  );

}