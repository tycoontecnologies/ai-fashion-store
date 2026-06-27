#!/bin/bash
set -e

echo "=============================="
echo "PHASE 3 - CUSTOMER ORDER PATCH"
echo "=============================="

echo
echo "===== CHECKOUT IMPORTS ====="
sed -n '1,80p' app/checkout/page.tsx

echo
echo "===== ADMIN ORDERS FULL ====="
sed -n '1,220p' app/admin/orders/page.tsx

echo
echo "===== PROFILE FULL ====="
sed -n '1,220p' app/profile/page.tsx

echo
echo "===== FIRESTORE ORDERS ====="
sed -n '1,220p' lib/firestoreOrders.ts

echo
echo "===== AUTH USER ====="
grep -n "user.email\|user.uid" app/profile/page.tsx app/checkout/page.tsx app/context/AuthContext.tsx

echo
echo "===== ORDER SAVE BLOCK ====="
grep -n "saveOrder(" -A30 -B10 app/checkout/page.tsx

echo
echo "===== ORDER LOAD BLOCK ====="
grep -R "getOrders()" app lib -n

echo
echo "READY_FOR_AUTOPATCH"
