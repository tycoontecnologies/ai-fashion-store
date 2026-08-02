#!/bin/bash

set -e

FILE="lib/orders.ts"

echo "Backing up $FILE"
cp "$FILE" "$FILE.backup-before-order-fix"

python3 <<'PY'
from pathlib import Path

p = Path("lib/orders.ts")
s = p.read_text()

s = s.replace(
'''export function saveOrder(
  order: Order
) {

  const orders =
    getOrders();

  orders.unshift(order);
''',
'''export function saveOrder(
  order: Omit<Order, "id">
) {

  const orders =
    getOrders();

  const newOrder = {
    id: Date.now().toString(),
    ...order,
  };

  orders.unshift(newOrder);
'''
)

s = s.replace(
'''    JSON.stringify(orders)
  );

}''',
'''    JSON.stringify(orders)
  );

}'''
)

p.write_text(s)
PY

echo "Done"
