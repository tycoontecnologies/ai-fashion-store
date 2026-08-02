export default function HomePage() {

  return (

    <main className="
      min-h-screen
      bg-[#f5f5f5]
      flex
      items-center
      justify-center
      px-6
    ">

      <div className="
        max-w-6xl
        mx-auto
        grid
        lg:grid-cols-2
        gap-16
        items-center
      ">

        <div>

          <p className="
            uppercase
            tracking-[6px]
            text-sm
            text-gray-500
            mb-4
          ">
            GUESS360
          </p>

          <h1 className="
            text-6xl
            lg:text-8xl
            font-black
            leading-none
            mb-6
          ">
            Under
            <br />
            Maintenance
          </h1>

          <p className="
            text-xl
            text-gray-600
            mb-8
          ">
            We're upgrading GUESS360 to deliver
            a smarter AI-powered fashion experience.

            Our team is currently improving
            recommendations, styling tools,
            and shopping features.

            We'll be back very soon.
          </p>

          <div className="
            flex
            gap-4
            flex-wrap
          ">

            <div className="
              bg-white
              rounded-full
              px-6
              py-3
              font-semibold
            ">
              AI Styling
            </div>

            <div className="
              bg-white
              rounded-full
              px-6
              py-3
              font-semibold
            ">
              Smart Recommendations
            </div>

            <div className="
              bg-white
              rounded-full
              px-6
              py-3
              font-semibold
            ">
              Virtual Fashion
            </div>

          </div>

        </div>

        <div>

          <img
            src="/maintenance-product.jpg"
            alt="GUESS360"
            className="
              rounded-[40px]
              shadow-2xl
              w-full
            "
          />

        </div>

      </div>

    </main>

  );

}