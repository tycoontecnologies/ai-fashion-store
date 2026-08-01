"use client";

type Props = {
  selectedCategory: string;
  setSelectedCategory: (
    value: string
  ) => void;
};

export default function Categories({
  selectedCategory,
  setSelectedCategory,
}: Props) {

  const categories = [
    "All",
    "T-Shirt",
    "Polo Shirt",
    "Shirt",
    "Streetwear",
    "Luxury",
  ];

  return (
    <>
      {categories.map((category) => (

        <button
          key={category}
          onClick={() =>
            setSelectedCategory(category)
          }
          className={`
            px-6
            py-3
            rounded-full
            border
            font-semibold

            ${
              selectedCategory === category
                ? "bg-black text-white"
                : "bg-white text-black"
            }
          `}
        >
          {category}
        </button>

      ))}
    </>
  );
}