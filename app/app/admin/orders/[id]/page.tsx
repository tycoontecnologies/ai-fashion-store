"use client";

import { useEffect,useState } from "react";

export default function OrderDetail({params}:any){

 const [order,setOrder]=useState<any>(null);

 useEffect(()=>{
  async function load(){

   const r=await fetch("/api/admin/orders");
   const d=await r.json();

   const found=
    (d.orders || []).find(
      (x:any)=>String(x.id)===params.id
    );

   setOrder(found);

  }

  load();

 },[params.id]);

 if(!order) return <div className="p-10">Loading...</div>;

 return(
 <div className="p-10">

  <h1 className="text-4xl font-black mb-6">
   Order #{order.id}
  </h1>

  <div>{order.customerName}</div>
  <div>{order.phone}</div>
  <div>{order.email}</div>
  <div>{order.city}</div>
  <div>{order.address}</div>

  <div className="mt-6 space-y-2">

   {(order.items || []).map((i:any,idx:number)=>(
    <div key={idx} className="border p-3 rounded">
      {i.name} x {i.quantity}
      - Rs {i.price}
    </div>
   ))}

  </div>

 </div>
 );
}
