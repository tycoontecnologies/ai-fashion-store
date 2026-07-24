"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Slide = {
  image: string;
  headline?: string;
  subheadline?: string;
  button?: string;
  href?: string;
};

export default function HeroSlider({ slides }: { slides: Slide[] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!slides.length) return;

    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 5000);

    return () => clearInterval(id);
  }, [slides.length]);

  if (!slides.length) return null;

  return (
    <section className="relative h-screen overflow-hidden">

      {slides.map((slide, index) => (
        <div
          key={slide.image}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            current === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.headline || "Banner"}
            fill
            priority={index === 0}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      ))}

      <div className="absolute inset-0 flex items-center">
        <div className="mx-auto w-full max-w-7xl px-6 text-white">

          <div className="mb-6 text-sm font-semibold tracking-[0.35em]">
            {(current + 1).toString().padStart(2, "0")} / {slides.length}
          </div>

          {slides[current].headline && (
            <h1 className="max-w-3xl text-5xl font-black leading-tight md:text-7xl">
              {slides[current].headline}
            </h1>
          )}

          {slides[current].subheadline && (
            <p className="mt-6 max-w-2xl text-xl text-white/90">
              {slides[current].subheadline}
            </p>
          )}

          {slides[current].button && slides[current].href && (
            <Link
              href={slides[current].href!}
              className="mt-10 inline-flex rounded-full bg-white px-8 py-4 font-semibold text-black transition hover:scale-105"
            >
              {slides[current].button}
            </Link>
          )}

        </div>
      </div>

      <button
        onClick={() =>
          setCurrent((current - 1 + slides.length) % slides.length)
        }
        className="absolute left-6 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white backdrop-blur"
      >
        ←
      </button>

      <button
        onClick={() =>
          setCurrent((current + 1) % slides.length)
        }
        className="absolute right-6 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white backdrop-blur"
      >
        →
      </button>

      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all ${
              i === current ? "w-10 bg-white" : "w-2 bg-white/40"
            }`}
          />
        ))}
      </div>

    </section>
  );
}
