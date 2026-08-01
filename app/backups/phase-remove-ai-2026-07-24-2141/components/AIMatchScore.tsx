"use client";

interface AIMatchScoreProps {
  currentProduct: {
    color?: string;
    category?: string;
  };
  comparedProduct: {
    color?: string;
    category?: string;
  };
}

export default function AIMatchScore({
  currentProduct,
  comparedProduct,
}: AIMatchScoreProps) {

  let score = 0;

  if (
    currentProduct?.color &&
    comparedProduct?.color &&
    currentProduct.color === comparedProduct.color
  ) {
    score += 50;
  }

  if (
    currentProduct?.category &&
    comparedProduct?.category &&
    currentProduct.category === comparedProduct.category
  ) {
    score += 50;
  }

  return (
    <div
      className="
        inline-flex
        items-center
        px-3
        py-1
        rounded-full
        bg-black
        text-white
        text-xs
        font-bold
        mb-3
      "
    >
      AI Match {score}%
    </div>
  );
}