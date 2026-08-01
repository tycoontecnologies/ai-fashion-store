"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function OrderDetail() {

  const params = useParams();
  const id = String(params.id);

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function load() {

      try {

        const res = await fetch("/api/admin/orders");

        const orders = await res.json();

        const found = orders.find(
          (x: any) => String(x.id) === id
        );

        setOrder(found ?? null);

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);

      }

    }

    load();

  }, [id]);

  if (loading) {

    return (
      <div className="p-10 text-xl">
        Loading...
      </div>
    );

  }

  if (!order) {

    return (
      <div className="p-10">

        <h1 className="text-3xl font-bold">
          Order Not Found
        </h1>

      </div>
    );

  }

  return (

    <div className="p-10 space-y-8">

      <div>

        <h1 className="text-4xl font-black">
          Order #{order.id}
        </h1>

        <div className="mt-2 text-gray-500">
          Status :
          <span className="ml-2 font-bold">
            {order.status || "Pending"}
          </span>
        </div>

      </div>

      <div className="bg-white rounded-xl border p-6">

        <h2 className="text-2xl font-bold mb-4">
          Customer Information
        </h2>

        <div>Name : {order.customerName || "-"}</div>
        <div>Email : {order.email || "-"}</div>
        <div>Phone : {order.phone || "-"}</div>
        <div>City : {order.city || "-"}</div>
        <div>Address : {order.address || "-"}</div>

      </div>

      <div className="bg-white rounded-xl border p-6">

        <h2 className="text-2xl font-bold mb-4">
          Ordered Items
        </h2>

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left p-3">
                Product
              </th>

              <th className="text-left p-3">
                Qty
              </th>

              <th className="text-left p-3">
                Price
              </th>

            </tr>

          </thead>

          <tbody>

            {(order.items || []).map((item: any, index: number) => (

              <tr
                key={index}
                className="border-b"
              >

                <td className="p-3">
                  {item.name}
                </td>

                <td className="p-3">
                  {item.quantity}
                </td>

                <td className="p-3">
                  Rs. {item.price}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <div className="bg-white rounded-xl border p-6">

        <h2 className="text-2xl font-bold mb-4">
          Summary
        </h2>

        <div className="flex justify-between">

          <span>Total</span>

          <span className="font-black text-2xl">

            Rs. {order.total || 0}

          </span>

        </div>

      </div>

    </div>

  );

}