#!/bin/bash
set -e

echo "=================================="
echo "GUESS360 NEXT PHASE EXECUTION"
echo "=================================="

echo
echo "[1/5] CHECKOUT FILE"
grep -n "saveOrder\|placeOrder\|placeholder=\"Full Name\"\|placeholder=\"Email\"\|placeholder=\"Phone\"\|placeholder=\"City\"\|placeholder=\"Address\"" app/checkout/page.tsx

echo
echo "[2/5] ADMIN ORDERS"
sed -n '1,260p' app/admin/orders/page.tsx

echo
echo "[3/5] PROFILE"
sed -n '1,260p' app/profile/page.tsx

echo
echo "[4/5] FIRESTORE ORDERS"
sed -n '1,220p' lib/firestoreOrders.ts

echo
echo "[5/5] ORDER MODEL DISCOVERY"
grep -R "customerName\|customerEmail\|customerPhone\|customerCity\|customerAddress" app lib components -n || true

echo
echo "READY_FOR_PATCH"
