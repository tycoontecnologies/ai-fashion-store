"use client";

type Props = {
  selectedColor: string;
  setSelectedColor: (
    value: string
  ) => void;
};

export default function SearchFilters({
  selectedColor,
  setSelectedColor,
}: Props) {

  const colors = [
    "All",
    "Black",
    "White",
    "Green",
    "Blue",
    "Grey",
  ];

  return (
    <>
      {colors.map((color) => (

        <button
          key={color}
          onClick={() =>
            setSelectedColor(color)
          }
          className={`
            px-6
            py-3
            rounded-full
            border
            font-semibold

            ${
              selectedColor === color
                ? "bg-black text-white"
                : "bg-white text-black"
            }
          `}
        >
          {color}
        </button>

      ))}
    </>
  );
}