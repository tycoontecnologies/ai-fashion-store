"use client";

import { useState } from "react";

export default function AIChatStylist() {

  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAIReply() {

    if (!message.trim()) return;

    try {

      setLoading(true);

      const response = await fetch(
        "/api/stylist",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            prompt: message,
          }),
        }
      );

      const data =
        await response.json();

      setReply(
        data.reply ||
        "No response received."
      );

    } catch (error) {

      console.error(error);

      setReply(
        "AI stylist unavailable."
      );

    } finally {

      setLoading(false);

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

        </div>

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
              setMessage(
                e.target.value
              )
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
            disabled={loading}
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
            {loading
              ? "Thinking..."
              : "Ask AI Stylist"}
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
                whitespace-pre-wrap
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
