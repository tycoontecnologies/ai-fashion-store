"use client";

import {
  saveOrder,
} from "@/lib/firestoreOrders";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { useCart } from "@/app/context/CartContext";

import { useRouter } from "next/navigation";

export default function CheckoutPage() {

  const router =
    useRouter();

  const {
    cart,
    clearCart,
  } = useCart();

  const total =
    cart.reduce(
      (sum, item) =>
        sum +
        item.price *
        (item.quantity || 1),
      0
    );

 async function placeOrder() {

  try {

    await saveOrder({

      date:
        new Date()
          .toLocaleDateString(),

      total,

      items: cart,

      status:
        "Pending",

    });

    clearCart();

    router.push(
      "/order-success"
    );

  } catch (error) {

    console.error(error);

    alert(
      "Failed to place order."
    );

  }

}

  return (

    <main className="
      min-h-screen
      bg-[#f5f5f5]
    ">

      <Navbar />

      <section className="
        max-w-5xl
        mx-auto
        px-6
        py-20
      ">

        <h1 className="
          text-5xl
          font-black
          text-black
          mb-10
        ">
          Checkout
        </h1>

        <div className="
          bg-white
          rounded-[32px]
          p-8
        ">

          <div className="
            grid
            md:grid-cols-2
            gap-5
          ">

            <input
              placeholder="Full Name"
              className="
                h-14
                bg-[#f5f5f5]
                rounded-xl
                px-5
                text-black
              "
            />

            <input
              placeholder="Email"
              className="
                h-14
                bg-[#f5f5f5]
                rounded-xl
                px-5
                text-black
              "
            />

            <input
              placeholder="Phone"
              className="
                h-14
                bg-[#f5f5f5]
                rounded-xl
                px-5
                text-black
              "
            />

            <input
              placeholder="City"
              className="
                h-14
                bg-[#f5f5f5]
                rounded-xl
                px-5
                text-black
              "
            />

          </div>

          <textarea
            placeholder="Address"
            className="
              mt-5
              w-full
              h-[120px]
              bg-[#f5f5f5]
              rounded-xl
              p-5
              text-black
            "
          />

          <div className="
            mt-10
            border-t
            pt-8
          ">

            <h2 className="
              text-2xl
              font-black
              text-black
              mb-5
            ">
              Order Summary
            </h2>

            {cart.length === 0 ? (

              <p className="
                text-gray-500
              ">
                Your cart is empty.
              </p>

            ) : (

              <div className="
                space-y-3
              ">

                {cart.map(
                  (item, index) => (

                    <div
                      key={index}
                      className="
                        flex
                        justify-between
                        text-black
                      "
                    >

                      <span>
                        {item.name}
                        {item.quantity
                          ? ` × ${item.quantity}`
                          : ""}
                      </span>

                      <span>
                        Rs.
                        {" "}
                        {item.price *
                          (item.quantity || 1)}
                      </span>

                    </div>

                  )
                )}

              </div>

            )}

          </div>

          <div className="
            mt-8
            flex
            justify-between
            items-center
          ">

            <h2 className="
              text-3xl
              font-black
              text-black
            ">
              Total
            </h2>

            <div className="
              text-3xl
              font-black
              text-black
            ">
              Rs. {total}
            </div>

          </div>

          <button
            onClick={
              placeOrder
            }
            disabled={
              cart.length === 0
            }
            className="
              mt-8
              w-full
              h-14
              rounded-full
              bg-black
              text-white
              font-bold
              disabled:opacity-50
            "
          >
            Place Order
          </button>

        </div>

      </section>

      <Footer />

    </main>

  );

}