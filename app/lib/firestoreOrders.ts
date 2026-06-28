export async function saveOrder(order: any) {

  const res = await fetch(
    "/api/admin/orders/save",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to save order");
  }

  return res.json();
}

export async function getOrders() {

  const res = await fetch(
    "/api/admin/orders"
  );

  if (!res.ok) {
    throw new Error("Failed to load orders");
  }

  return res.json();
}