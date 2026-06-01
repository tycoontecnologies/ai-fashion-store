"use client";

export default function ProductRating({
  rating = 5,
}: {
  rating?: number;
}) {

  return (

    <div className="
      flex
      items-center
      gap-2
    ">

      <div className="
        text-yellow-500
        text-lg
      ">
        {"★".repeat(
          Math.floor(rating)
        )}
      </div>

      <span className="
        text-sm
        font-medium
        text-gray-600
      ">
        {rating.toFixed(1)}
      </span>

    </div>

  );

}