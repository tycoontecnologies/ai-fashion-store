"use client";

import Link from "next/link";


export default function MegaMenu({
type,
show,
onEnter,
onLeave
}:{
type:"men"|"accessories"|"winter";
show:boolean;
onEnter?:()=>void;
onLeave?:()=>void;
}){


if(!show) return null;


const menu =
type==="men"
?
{
title:"MEN'S",
items:[
"T-Shirts",
"Polo Shirts",
"Formal Shirts",
"Casual Shirts",
"Jeans",
"Trousers",
"Chinos",
"Activewear",
"Outerwear",
"Hoodies"
]
}
:
type==="accessories"
?
{
title:"ACCESSORIES",
items:[
"Belts",
"Wallets",
"Socks",
"Caps",
"Watches",
"Bags",
"Sunglasses"
]
}
:
{
title:"WINTER'S COLLECTION",
items:[
"Jackets",
"Hoodies",
"Winter Coats",
"Sweaters",
"Sweatshirts",
"Thermal Wear",
"Beanies",
"Scarves",
"Winter Accessories"
]
};


return (

<div
onMouseEnter={onEnter}
onMouseLeave={onLeave}
className="
fixed
top-[120px]
left-0
w-full
bg-white
shadow-xl
border-t
z-[999]
"
>


<div
className="
max-w-screen-xl
mx-auto
px-12
py-10
"
>


<h2
className="
text-xl
tracking-[8px]
font-light
text-gray-800
mb-8
"
>
{menu.title}
</h2>


<div
className="
border-t
border-gray-300
mb-8
"
/>


<h3
className="
text-xs
tracking-[5px]
text-gray-500
uppercase
mb-8
"
>
SHOP BY CATEGORY
</h3>


<div
className="
grid
grid-cols-5
gap-y-8
"
>

{
menu.items.map(item=>(

<Link
key={item}
href={`/collections/${item.toLowerCase().replaceAll(" ","-")}`}
className="
text-base
text-gray-800
hover:text-black
transition
"
>
{item}
</Link>

))
}

</div>


</div>


</div>

);

}
