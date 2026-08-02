"use client";

export default function AIStylist() {

  return (

    <section className="
      max-w-7xl
      mx-auto
      px-6
      lg:px-8
      py-24
    ">

      <div className="
        bg-black
        rounded-[50px]
        p-10
        lg:p-16
        text-white
      ">

        {/* TOP */}

        <div className="mb-14">

          <p className="
            uppercase
            tracking-[6px]
            text-sm
            text-gray-400
            mb-4
          ">
            AI Powered Styling
          </p>

          <h2 className="
            text-5xl
            lg:text-7xl
            font-black
            leading-none
            mb-6
          ">
            Your AI Stylist
          </h2>

          <p className="
            text-xl
            text-gray-300
            max-w-2xl
            leading-relaxed
          ">
            Get personalized fashion recommendations
            powered by artificial intelligence.
          </p>

        </div>

        {/* GRID */}

        <div className="
          grid
          lg:grid-cols-2
          gap-10
        ">

          {/* LEFT */}

          <div className="
            bg-white/5
            border
            border-white/10
            rounded-[40px]
            p-8
          ">

            <h3 className="
              text-3xl
              font-bold
              mb-8
            ">
              Style Preferences
            </h3>

            <div className="
              flex
              flex-col
              gap-6
            ">

              <select className="
                h-16
                rounded-2xl
                bg-white/10
                px-6
                outline-none
                text-white
              ">
                <option className="text-black">
                  Casual
                </option>

                <option className="text-black">
                  Streetwear
                </option>

                <option className="text-black">
                  Luxury
                </option>

                <option className="text-black">
                  Minimal
                </option>
              </select>

              <select className="
                h-16
                rounded-2xl
                bg-white/10
                px-6
                outline-none
                text-white
              ">
                <option className="text-black">
                  Black
                </option>

                <option className="text-black">
                  Olive
                </option>

                <option className="text-black">
                  White
                </option>

                <option className="text-black">
                  Neutral
                </option>
              </select>

              <select className="
                h-16
                rounded-2xl
                bg-white/10
                px-6
                outline-none
                text-white
              ">
                <option className="text-black">
                  Summer
                </option>

                <option className="text-black">
                  Winter
                </option>

                <option className="text-black">
                  Office
                </option>

                <option className="text-black">
                  Party
                </option>
              </select>

              <button className="
                h-16
                rounded-full
                bg-white
                text-black
                text-lg
                font-bold
                hover:scale-[1.02]
                transition-all
              ">
                Generate AI Outfit
              </button>

            </div>

          </div>

          {/* RIGHT */}

          <div className="
            bg-white
            rounded-[40px]
            p-8
            text-black
          ">

            <p className="
              uppercase
              tracking-[5px]
              text-sm
              text-gray-500
              mb-4
            ">
              AI Recommendation
            </p>

            <h3 className="
              text-4xl
              font-black
              mb-6
            ">
              Modern Olive Fit
            </h3>

            <div className="
              flex
              flex-wrap
              gap-3
              mb-8
            ">

              <div className="
                px-4
                py-2
                rounded-full
                bg-[#f5f5f5]
                text-sm
                font-medium
              ">
                Smart Casual
              </div>

              <div className="
                px-4
                py-2
                rounded-full
                bg-[#f5f5f5]
                text-sm
                font-medium
              ">
                Summer Ready
              </div>

              <div className="
                px-4
                py-2
                rounded-full
                bg-[#f5f5f5]
                text-sm
                font-medium
              ">
                Trending
              </div>

            </div>

            <p className="
              text-lg
              text-gray-600
              leading-relaxed
              mb-10
            ">
              AI recommends neutral olive tones with
              oversized silhouettes for a modern
              luxury-streetwear aesthetic.
            </p>

            <button className="
              h-16
              px-10
              rounded-full
              bg-black
              text-white
              text-lg
              font-semibold
            ">
              Shop This Look
            </button>

          </div>

        </div>

      </div>

    </section>

  );
}