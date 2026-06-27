#!/bin/bash
set -e

echo "=============================="
echo "PHASE 4 AUTOPATCH DISCOVERY"
echo "=============================="

echo
echo "===== CHECKOUT IMPORT SECTION ====="
sed -n '1,40p' app/checkout/page.tsx

echo
echo "===== CHECKOUT INPUT BLOCK ====="
sed -n '90,180p' app/checkout/page.tsx

echo
echo "===== CHECKOUT PLACEORDER BLOCK ====="
sed -n '20,70p' app/checkout/page.tsx

echo
echo "===== ADMIN ORDERS FILE SIZE ====="
wc -l app/admin/orders/page.tsx

echo
echo "===== ORDERS PAGE ====="
sed -n '1,260p' app/orders/page.tsx

echo
echo "===== PROFILE FILE SIZE ====="
wc -l app/profile/page.tsx

echo
echo "===== PROFILE TOP ====="
sed -n '1,80p' app/profile/page.tsx

echo
echo "===== PROFILE ORDER CARD ====="
grep -n "Orders\|0" app/profile/page.tsx

echo
echo "READY_FOR_FULL_PATCH"
