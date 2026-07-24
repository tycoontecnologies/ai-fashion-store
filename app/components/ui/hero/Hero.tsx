"use client";

import { useEffect, useState } from "react";
import HeroSlider from "./HeroSlider";

export default function Hero() {
  const [slides, setSlides] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/banners")
      .then(r => r.json())
      .then(data => {
        console.log("BANNERS:", data);
        setSlides(Array.isArray(data) ? data : []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-3xl font-bold">
        Loading Hero...
      </div>
    );
  }

  if (!slides.length) {
    return (
      <div className="h-screen flex items-center justify-center text-red-600 text-3xl font-bold">
        No banners received
      </div>
    );
  }

  return <HeroSlider slides={slides} />;
}
