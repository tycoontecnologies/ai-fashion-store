"use client";

interface Props {
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedColor: string;
  setSelectedColor: (value: string) => void;
}

export default function FilterBar({
  selectedCategory,
  setSelectedCategory,
  selectedColor,
  setSelectedColor,
}: Props) {

  const categories = [
    "All",
    "T-Shirt",
    "Polo Shirt",
    "Shirt",
    "Streetwear",
    "Luxury",
  ];

  const colors = [
    "All",
    "Black",
    "White",
    "Green",
    "Blue",
    "Grey",
  ];

  return (

    <div
      className="
        bg-white
        rounded-[24px]
        p-6
        border
        border-gray-200
        flex
        flex-wrap
        gap-6
        items-center
        justify-between
      "
    >

      <div>

        <p
          className="
            text-xs
            uppercase
            tracking-[3px]
            text-gray-500
            mb-2
          "
        >
          Shop By
        </p>

        <h3
          className="
            text-xl
            font-bold
            text-black
          "
        >
          Filters
        </h3>

      </div>

      <div
        className="
          flex
          gap-4
          flex-wrap
        "
      >

        <select
          value={selectedCategory}
          onChange={(e) =>
            setSelectedCategory(
              e.target.value
            )
          }
          className="
            h-12
            px-4
            rounded-xl
            border
            border-gray-200
            bg-white
            text-black
          "
        >

          {categories.map((item) => (

            <option
              key={item}
              value={item}
            >
              {item}
            </option>

          ))}

        </select>

        <select
          value={selectedColor}
          onChange={(e) =>
            setSelectedColor(
              e.target.value
            )
          }
          className="
            h-12
            px-4
            rounded-xl
            border
            border-gray-200
            bg-white
            text-black
          "
        >

          {colors.map((item) => (

            <option
              key={item}
              value={item}
            >
              {item}
            </option>

          ))}

        </select>

      </div>

    </div>

  );
}