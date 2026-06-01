"use client";

import { useState } from "react";

export default function AIChatStylist() {

  const [message, setMessage] =
    useState("");

  const [reply, setReply] =
    useState("");

  function handleAIReply() {

    const text =
      message.toLowerCase();

    if (
      text.includes("streetwear")
    ) {

      setReply(
        "AI Stylist: Try oversized black tees, relaxed cargos and layered monochrome fits for a modern streetwear aesthetic."
      );

    } else if (
      text.includes("luxury")
    ) {

      setReply(
        "AI Stylist: Luxury styling works best with neutral polos, tailored trousers and minimal silhouettes."
      );

    } else if (
      text.includes("formal")
    ) {

      setReply(
        "AI Stylist: Structured shirts and slim tailored fits create elegant formal combinations."
      );

    } else if (
      text.includes("casual")
    ) {

      setReply(
        "AI Stylist: Relaxed oversized essentials and clean sneakers create modern casual outfits."
      );

    } else {

      setReply(
        "AI Stylist: Neutral minimal fits with premium layering are currently trending."
      );

    }

  }

  return (

    <section className="
      max-w-7xl
      mx-auto
      px-8
      py-24
    ">

      <div className="
        bg-black
        rounded-[50px]
        p-10
        lg:p-14
        text-white
      ">

        <div className="mb-12">

          <p className="
            uppercase
            tracking-[6px]
            text-sm
            text-gray-400
            mb-3
          ">
            AI Assistant
          </p>

          <h2 className="
            text-6xl
            font-black
            leading-none
            mb-6
          ">
            AI Chat Stylist
          </h2>

          <p className="
            text-xl
            text-gray-300
            max-w-2xl
          ">
            Ask fashion questions and get
            AI-powered outfit recommendations.
          </p>

        </div>

        {/* CHAT */}

        <div className="
          bg-white/5
          border
          border-white/10
          rounded-[40px]
          p-8
        ">

          <textarea
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            placeholder="Ask AI about fashion styling..."
            className="
              w-full
              h-[180px]
              rounded-[30px]
              bg-white/10
              p-6
              outline-none
              resize-none
              text-lg
              mb-8
            "
          />

          <button
            onClick={handleAIReply}
            className="
              h-16
              px-10
              rounded-full
              bg-white
              text-black
              text-lg
              font-bold
              mb-10
            "
          >
            Ask AI Stylist
          </button>

          {reply && (

            <div className="
              bg-white
              text-black
              rounded-[30px]
              p-8
            ">

              <p className="
                text-lg
                leading-relaxed
              ">
                {reply}
              </p>

            </div>

          )}

        </div>

      </div>

    </section>

  );
}