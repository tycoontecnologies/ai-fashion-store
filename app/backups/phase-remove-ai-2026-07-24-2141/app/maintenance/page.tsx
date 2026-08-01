import Image from "next/image";

export default function MaintenancePage() {
  return (
    <main className="
      min-h-screen
      bg-black
      text-white
      flex
      items-center
      justify-center
      px-6
    ">
      <div className="
        max-w-7xl
        mx-auto
        grid
        lg:grid-cols-2
        gap-20
        items-center
      ">
        <div>
          <p className="
            uppercase
            tracking-[8px]
            text-sm
            text-gray-400
            mb-6
          ">
            GUESS360
          </p>

          <h1 className="
            text-6xl
            lg:text-8xl
            font-black
            leading-none
            mb-8
          ">
            Something
            <br />
            Extraordinary
            <br />
            Is Coming.
          </h1>

          <p className="
            text-xl
            text-gray-300
            max-w-xl
            mb-8
          ">
            We're building the future of AI-powered fashion shopping.
            Smarter recommendations.
            Better styling.
            A premium shopping experience.
          </p>

          <div className="
            flex
            gap-3
            flex-wrap
          ">
            <span className="bg-white text-black px-5 py-3 rounded-full">
              AI Styling
            </span>

            <span className="bg-white text-black px-5 py-3 rounded-full">
              Smart Fashion
            </span>

            <span className="bg-white text-black px-5 py-3 rounded-full">
              Virtual Experience
            </span>
          </div>
        </div>

        <div>
          <Image
            src="/maintenance-product.jpg"
            alt="GUESS360"
            width={800}
            height={1000}
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