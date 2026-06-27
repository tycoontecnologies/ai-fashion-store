#!/bin/bash
set -e

REPORT=/tmp/final_go_live.txt
exec > "$REPORT" 2>&1

echo "=================================================="
echo "GUESS360 FINAL GO LIVE CHECK"
echo "=================================================="

echo
echo "===== PRODUCT COUNT ====="
grep -R "saveProduct(" app lib -n || true

echo
echo "===== FIRESTORE PRODUCTS ====="
sed -n '1,220p' lib/firestoreProducts.ts

echo
echo "===== FIRESTORE ORDERS ====="
sed -n '1,220p' lib/firestoreOrders.ts

echo
echo "===== ADMIN PRODUCTS ====="
curl -I http://127.0.0.1:3000/admin/products

echo
echo "===== ADMIN ORDERS ====="
curl -I http://127.0.0.1:3000/admin/orders

echo
echo "===== STYLE QUIZ ====="
curl -I http://127.0.0.1:3000/style-quiz

echo
echo "===== ANALYZE API ====="
curl -s -X POST http://127.0.0.1:3000/api/analyze \
-H "Content-Type: application/json" \
-d '{"imageUrl":"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"}'

echo
echo
echo "===== PM2 ====="
pm2 list

echo
echo "===== MEMORY ====="
free -h

echo
echo "===== DISK ====="
df -h

echo
echo "===== NODE ====="
node -v

echo
echo "===== NPM ====="
npm -v

echo
echo "===== BUILD VERIFY ====="
npm run build

echo
echo "===== RELEASE DECISION ====="
echo "IF BUILD PASSES + PM2 ONLINE = READY"
echo "IF PRODUCTS < 20 = KEEP MAINTENANCE ON"
echo "IF PRODUCTS >= 20 = REMOVE MAINTENANCE"

echo
echo "=================================================="
echo "GO LIVE AUDIT COMPLETE"
echo "=================================================="
