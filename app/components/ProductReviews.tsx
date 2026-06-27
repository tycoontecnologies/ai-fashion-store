"use client";

import { useEffect, useState } from "react";

export default function ProductReviews({
  productId,
}: {
  productId: number;
}) {

  const [reviews,
    setReviews] =
    useState<any[]>([]);

  const [name,
    setName] =
    useState("");

  const [comment,
    setComment] =
    useState("");

  useEffect(() => {

    const stored =
      localStorage.getItem(
        `reviews-${productId}`
      );

    if (stored) {

      setReviews(
        JSON.parse(stored)
      );

    }

  }, [productId]);

  function addReview() {

    if (
      !name.trim() ||
      !comment.trim()
    ) {
      return;
    }

    const newReview = {
      name,
      comment,
      date:
        new Date()
          .toLocaleDateString(),
    };

    const updated = [
      newReview,
      ...reviews,
    ];

    setReviews(updated);

    localStorage.setItem(
      `reviews-${productId}`,
      JSON.stringify(updated)
    );

    setName("");
    setComment("");

  }

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
        Customer Feedback
      </p>

      <h2 className="
        text-5xl
        font-black
        text-black
        mb-10
      ">
        Reviews
      </h2>

      <div className="
        grid
        gap-4
        mb-10
      ">

        <input
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
          placeholder="Your Name"
          className="
            h-14
            px-5
            rounded-xl
            bg-[#f5f5f5]
            text-black
          "
        />

        <textarea
          value={comment}
          onChange={(e) =>
            setComment(
              e.target.value
            )
          }
          placeholder="Write your review..."
          className="
            h-32
            p-5
            rounded-xl
            bg-[#f5f5f5]
            text-black
          "
        />

        <button
          onClick={
            addReview
          }
          className="
            h-14
            rounded-full
            bg-black
            text-white
            font-bold
          "
        >
          Submit Review
        </button>

      </div>

      <div className="
        space-y-6
      ">

        {reviews.length === 0 ? (

          <p className="
            text-gray-500
          ">
            No reviews yet.
          </p>

        ) : (

          reviews.map(
            (
              review,
              index
            ) => (

              <div
                key={index}
                className="
                  border-b
                  border-gray-200
                  pb-5
                "
              >

                <div className="
                  flex
                  justify-between
                  mb-2
                ">

                  <h3 className="
                    font-bold
                    text-black
                  ">
                    {review.name}
                  </h3>

                  <span className="
                    text-sm
                    text-gray-500
                  ">
                    {review.date}
                  </span>

                </div>

                <p className="
                  text-gray-700
                ">
                  {review.comment}
                </p>

              </div>

            )
          )

        )}

      </div>

    </section>

  );

}