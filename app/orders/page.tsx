"use client";

import {
  useEffect,
  useState,
} from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import {
  getOrders,
} from "@/lib/firestoreOrders";

export default function OrdersPage() {

  const [orders, setOrders] =
    useState<any[]>([]);

 useEffect(() => {

  async function loadOrders() {

    const data =
      await getOrders();

    setOrders(data);

  }

  loadOrders();

}, []);

  return (

    <main className="
      min-h-screen
      bg-[#f5f5f5]
    ">

      <Navbar />

      <section className="
        max-w-6xl
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
          Account
        </p>

        <h1 className="
          text-6xl
          font-black
          text-black
          mb-12
        ">
          My Orders
        </h1>

        {orders.length === 0 ? (

          <div className="
            bg-white
            rounded-[32px]
            p-12
          ">

            <h2 className="
              text-3xl
              font-bold
              text-black
              mb-3
            ">
              No Orders Yet
            </h2>

            <p className="
              text-gray-500
            ">
              Place your first order.
            </p>

          </div>

        ) : (

          <div className="
            space-y-6
          ">

            {orders.map(
              (order) => (

                <div
                  key={order.id}
                  className="
                    bg-white
                    rounded-[24px]
                    p-8
                  "
                >

                  <div className="
                    flex
                    justify-between
                    items-center
                    mb-5
                  ">

                    <h3 className="
                      text-2xl
                      font-bold
                      text-black
                    ">
                      Order #
{order.id
  .slice(0, 6)
  .toUpperCase()}
                    </h3>

                    <span
                      className="
                        px-4
                        py-2
                        rounded-full
                        bg-green-100
                        text-green-700
                        font-medium
                      "
                    >
                      {order.status}
                    </span>

                  </div>

                  <p className="
                    text-gray-500
                    mb-4
                  ">
                    {order.date}
                  </p>

                  <div className="
                    text-xl
                    font-black
                  ">
                    Rs. {Number(order.total || 0)}
                  </div>

                </div>

              )
            )}

          </div>

        )}

      </section>

      <Footer />

    </main>

  );

}