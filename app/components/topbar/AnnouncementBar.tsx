"use client";

import {useEffect,useState} from "react";

export default function AnnouncementBar(){

const [time,setTime]=useState("");

const [visitors]=useState(
Math.floor(Math.random()*40)+20
);

const [hits]=useState(
Math.floor(Math.random()*5000)+10000
);


useEffect(()=>{

const timer=setInterval(()=>{

setTime(
new Date().toLocaleTimeString()
);

},1000);


return ()=>clearInterval(timer);

},[]);


return (

<div className="w-full bg-black text-white text-xs md:text-sm">

<div className="max-w-screen-xl mx-auto px-5 py-2 flex flex-wrap items-center justify-between gap-3">


<div className="flex items-center gap-5">

<span>
📢 Latest Collections Available
</span>

<span>
👥 Visitors Online: {visitors}
</span>

<span>
👁 Hits: {hits}
</span>

<span>
🕒 {time}
</span>

</div>


<div className="flex items-center gap-4">

<a href="#" className="hover:text-gray-300">
WhatsApp
</a>

<a href="#" className="hover:text-gray-300">
Facebook
</a>

<a href="#" className="hover:text-gray-300">
Instagram
</a>

<a href="#" className="hover:text-gray-300">
TikTok
</a>


</div>


</div>

</div>

);

}
