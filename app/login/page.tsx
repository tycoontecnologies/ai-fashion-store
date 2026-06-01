"use client";

import { useState } from "react";

import Link from "next/link";

import { useRouter } from "next/navigation";

import {
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "@/lib/firebase";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LoginPage() {

  const router =
    useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleLogin() {

    try {

      setLoading(true);

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      alert(
        "Login successful."
      );

      router.push(
        "/profile"
      );

    } catch (error: any) {

      alert(
        error.message
      );

    } finally {

      setLoading(false);

    }

  }

  return (

    <main className="
      bg-[#f5f5f5]
      min-h-screen
    ">

      <Navbar />

      <section className="
        max-w-2xl
        mx-auto
        px-8
        py-24
      ">

        <div className="
          bg-white
          rounded-[50px]
          p-10
          lg:p-14
          shadow-sm
        ">

          <div className="mb-12">

            <p className="
              uppercase
              tracking-[6px]
              text-gray-500
              text-sm
              mb-3
            ">
              Welcome Back
            </p>

            <h1 className="
              text-6xl
              font-black
              text-black
              leading-none
              mb-6
            ">
              Sign In
            </h1>

            <p className="
              text-lg
              text-gray-600
            ">
              Access your account.
            </p>

          </div>

          <div className="
            flex
            flex-col
            gap-6
          ">

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              className="
                h-16
                rounded-2xl
                bg-[#f5f5f5]
                px-6
                text-black
                outline-none
              "
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              className="
                h-16
                rounded-2xl
                bg-[#f5f5f5]
                px-6
                text-black
                outline-none
              "
            />

            <button
              onClick={
                handleLogin
              }
              disabled={loading}
              className="
                h-16
                rounded-full
                bg-black
                text-white
                text-lg
                font-semibold
                mt-4
              "
            >
              {loading
                ? "Signing In..."
                : "Sign In"}
            </button>

          </div>

          <div className="
            mt-10
            text-center
          ">

            <p className="text-gray-500">

              Don't have an account?{" "}

              <Link
                href="/signup"
                className="
                  text-black
                  font-semibold
                "
              >
                Create Account
              </Link>

            </p>

          </div>

        </div>

      </section>

      <Footer />

    </main>

  );

}