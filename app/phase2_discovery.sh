#!/bin/bash

echo "===== FIRESTORE ORDERS ====="
sed -n '1,220p' lib/firestoreOrders.ts

echo
echo "===== FIRESTORE PRODUCTS ====="
sed -n '1,220p' lib/firestoreProducts.ts

echo
echo "===== ADMIN ORDERS ====="
sed -n '1,260p' app/admin/orders/page.tsx

echo
echo "===== CART CONTEXT ====="
sed -n '1,260p' app/context/CartContext.tsx

echo
echo "===== PRODUCT PAGE ====="
sed -n '1,260p' app/product/[id]/page.tsx

echo
echo "===== PROFILE PAGE ====="
sed -n '1,260p' app/profile/page.tsx

