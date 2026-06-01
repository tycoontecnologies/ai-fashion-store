"use client";

export default function AIOutfitRecommendations({
  product,
}: any) {

  const recommendations = {

    Black: [
      "White Sneakers",
      "Black Cargo Pants",
      "Silver Watch",
      "Minimal Backpack",
    ],

    White: [
      "Blue Denim Jeans",
      "White Sneakers",
      "Black Watch",
      "Grey Hoodie",
    ],

    Olive: [
      "Beige Chinos",
      "Brown Boots",
      "Canvas Backpack",
      "Minimal Watch",
    ],

    Grey: [
      "Black Jeans",
      "White Sneakers",
      "Leather Jacket",
      "Silver Accessories",
    ],

  };

  const items =
    recommendations[
      product.color as keyof typeof recommendations
    ] || [
      "White Sneakers",
      "Slim Fit Jeans",
      "Minimal Watch",
      "Crossbody Bag",
    ];

  return (

    <section className="
      mt-24
      bg-white
      rounded-[32px]
      p-8
    ">

      <p className="
        uppercase
        tracking-[6px]
        text-sm
        text-gray-500
        mb-3
      ">
        AI Fashion Assistant
      </p>

      <h2 className="
        text-5xl
        font-black
        text-black
        mb-8
      ">
        Outfit Recommendations
      </h2>

      <div className="
        grid
        md:grid-cols-2
        gap-4
      ">

        {items.map(
          (item) => (

            <div
              key={item}
              className="
                flex
                items-center
                gap-4
                bg-[#f5f5f5]
                rounded-2xl
                p-5
              "
            >

              <div className="
                w-10
                h-10
                rounded-full
                bg-black
                text-white
                flex
                items-center
                justify-center
                font-bold
              ">
                ✓
              </div>

              <span className="
                text-black
                font-medium
              ">
                {item}
              </span>

            </div>

          )
        )}

      </div>

    </section>

  );
}