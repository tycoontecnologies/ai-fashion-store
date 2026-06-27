#!/bin/bash

echo "===== ENV ====="
cat .env.local

echo
echo "===== PACKAGE.JSON ====="
cat package.json

echo
echo "===== IMAGE COUNT ====="
find /root/import_products -type f | wc -l

echo
echo "===== FIRST 5 IMAGES ====="
find /root/import_products -type f | head -5

echo
echo "===== ANALYZE API ====="
sed -n '1,220p' app/api/analyze/route.ts

echo
echo "===== ADMIN PRODUCTS ====="
sed -n '1,220p' lib/adminProducts.ts

echo
echo "===== FIREBASE ====="
sed -n '1,120p' lib/firebase.ts

echo
echo "===== STORAGE ====="
sed -n '1,120p' lib/storage.ts
