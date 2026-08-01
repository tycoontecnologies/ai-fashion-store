"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminOrdersPage() {

  const [orders,setOrders]=useState<any[]>([]);
  const [loading,setLoading]=useState(true);

  async function load(){

    setLoading(true);

    const res=await fetch("/api/admin/orders");

    const data=await res.json();

    setOrders(Array.isArray(data)?data:[]);

    setLoading(false);

  }

  useEffect(()=>{
    load();
  },[]);

  function badge(status:string){

    switch((status||"Pending").toLowerCase()){

      case "confirmed":
        return "bg-blue-100 text-blue-700";

      case "packed":
        return "bg-yellow-100 text-yellow-700";

      case "shipped":
        return "bg-purple-100 text-purple-700";

      case "delivered":
        return "bg-green-100 text-green-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";

    }

  }

  return(

    <main className="p-10">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-black">
            Orders
          </h1>

          <p className="text-gray-500">
            {orders.length} Orders
          </p>

        </div>

        <button
          onClick={load}
          className="bg-black text-white px-5 py-3 rounded-xl"
        >
          Refresh
        </button>

      </div>

      {loading &&

      <div className="bg-white rounded-2xl p-8">

        Loading...

      </div>

      }

      {!loading && orders.length===0 &&

      <div className="bg-white rounded-2xl p-12 text-center">

        <div className="text-2xl font-bold">
          No Orders Yet
        </div>

        <div className="text-gray-500 mt-2">
          Orders from checkout will appear here.
        </div>

      </div>

      }

      {!loading && orders.length>0 &&

      <div className="bg-white rounded-3xl overflow-hidden border">

        <table className="w-full">

          <thead className="bg-gray-50">

            <tr>

              <th className="p-4 text-left">Order</th>

              <th className="p-4 text-left">Customer</th>

              <th className="p-4 text-left">Phone</th>

              <th className="p-4 text-center">Items</th>

              <th className="p-4 text-center">Total</th>

              <th className="p-4 text-center">Status</th>

              <th className="p-4 text-center">Action</th>

            </tr>

          </thead>

          <tbody>

            {orders.map((o:any)=>(

            <tr
              key={o.id}
              className="border-t"
            >

              <td className="p-4 font-semibold">

                #{o.id}

              </td>

              <td className="p-4">

                {o.customer || "-"}

              </td>

              <td className="p-4">

                {o.phone || "-"}

              </td>

              <td className="p-4 text-center">

                {(o.products||[]).length}

              </td>

              <td className="p-4 text-center">

                Rs {o.grandTotal || o.total || 0}

              </td>

              <td className="p-4 text-center">

                <span
                  className={`px-3 py-1 rounded-full text-sm ${badge(o.status)}`}
                >
                  {o.status || "Pending"}
                </span>

              </td>

              <td className="p-4 text-center">

                <Link
                  href={`/admin/orders/${o.id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  View
                </Link>

              </td>

            </tr>

            ))}

          </tbody>

        </table>

      </div>

      }

    </main>

  );

}