export interface Order {
  id: string;
  date: string;
  total: number;
  items: any[];
  status: string;
}

export function getOrders() {

  if (
    typeof window === "undefined"
  ) {
    return [];
  }

  const stored =
    localStorage.getItem(
      "guess360-orders"
    );

  return stored
    ? JSON.parse(stored)
    : [];
}

export function saveOrder(
  order: Order
) {

  const orders =
    getOrders();

  orders.unshift(order);

  localStorage.setItem(
    "guess360-orders",
    JSON.stringify(orders)
  );

}