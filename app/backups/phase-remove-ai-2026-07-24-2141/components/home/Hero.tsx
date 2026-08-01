"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  {
    image: "/banners/banner1.png",
    title: "PREMIUM MEN'S FASHION",
    subtitle: "Modern styles crafted for a confident lifestyle.",
  },
  {
    image: "/banners/banner2.png",
    title: "MODERN ESSENTIALS",
    subtitle: "Timeless pieces designed for everyday elegance.",
  },
  {
    image: "/banners/banner3.png",
    title: "ELEVATED STYLE",
    subtitle: "Premium fashion for the modern wardrobe.",
  },
  {
    image: "/banners/banner4.png",
    title: "NEW COLLECTION",
    subtitle: "Discover refined looks for every occasion.",
  },
  {
    image: "/banners/banner5.png",
    title: "CLASSIC LUXURY",
    subtitle: "Quality fashion with contemporary design.",
  },
];

export default function Hero() {

const [active,setActive]=useState(0);

useEffect(()=>{

const timer=setInterval(()=>{

setActive((prev)=>
(prev+1)%slides.length
);

},7000);

return ()=>clearInterval(timer);

},[]);


const slide=slides[active];


return (

<section className="relative w-full h-[75vh] md:h-[85vh] lg:h-[calc(100vh-80px)] overflow-hidden">

<Image
src={slide.image}
alt={slide.title}
fill
priority={active===0}
className="object-cover object-center"
/>


<div className="absolute inset-0 bg-black/20"/>


<div className="absolute left-6 md:left-12 lg:left-20 bottom-16 md:bottom-24 lg:bottom-32 text-white max-w-xl">


<h1 className="uppercase tracking-[18px] font-light text-4xl md:text-6xl lg:text-8xl leading-[0.95]">
{slide.title}
</h1>


<p className="mt-6 text-base md:text-xl lg:text-2xl tracking-wide font-light opacity-90">
{slide.subtitle}
</p>


<div className="flex flex-col sm:flex-row gap-5 mt-8">

<a
href="/collections/men"
className="bg-white text-black rounded-full px-10 py-4 font-semibold hover:scale-105 transition"
>
SHOP NOW →
</a>


<a
href="/collections/men"
className="border border-white text-white rounded-full px-10 py-4 hover:bg-white hover:text-black transition"
>
EXPLORE COLLECTION
</a>

</div>

</div>

</section>

);

}
