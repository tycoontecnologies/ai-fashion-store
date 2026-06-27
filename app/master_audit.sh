#!/bin/bash

REPORT=/tmp/guess360_audit.txt

exec > "$REPORT" 2>&1

echo "================================================="
echo "GUESS360 MASTER AUDIT"
echo "================================================="
date

echo
echo "================ ROUTES ================"
find app -type f | sort

echo
echo "================ COMPONENTS ================"
find components -type f | sort

echo
echo "================ LIBS ================"
find lib -type f | sort

echo
echo "================ OPENAI ================"
grep -R "OpenAI" app components lib -n 2>/dev/null

echo
echo "================ API ROUTES ================"
grep -R "export async function POST" app/api -n 2>/dev/null

echo
echo "================ FIRESTORE COLLECTIONS ================"
grep -R 'collection(' lib -n 2>/dev/null

echo
echo "================ PRODUCT FLOW ================"
grep -R "saveProduct" . -n 2>/dev/null
grep -R "getProducts" . -n 2>/dev/null
grep -R "deleteProduct" . -n 2>/dev/null

echo
echo "================ STORAGE ================"
grep -R "firebase/storage" . -n 2>/dev/null
grep -R "uploadBytes" . -n 2>/dev/null
grep -R "getDownloadURL" . -n 2>/dev/null

echo
echo "================ STYLE PROFILE ================"
grep -R "styleProfiles" . -n 2>/dev/null
grep -R "saveStyleProfile" . -n 2>/dev/null

echo
echo "================ PRODUCT TYPES ================"
grep -R "interface Product" . -n 2>/dev/null
grep -R "type Product" . -n 2>/dev/null

echo
echo "================ TRYON ================"
grep -R "try-on" . -n 2>/dev/null
grep -R "virtual try" . -n 2>/dev/null

echo
echo "================ HOME PERSONALIZATION ================"
grep -R "AI Recommended" . -n 2>/dev/null
grep -R "Trending Collection" . -n 2>/dev/null

echo
echo "================ PM2 ================"
pm2 list

echo
echo "================ PORTS ================"
ss -ltnp

echo
echo "================ ENV VARS ================"
grep -E "OPENAI|FIREBASE" .env.local 2>/dev/null

echo
echo "================ BUILD ================"
ls -lah .next 2>/dev/null

echo
echo "================ PACKAGE ================"
cat package.json

echo
echo "================ ADMIN PAGE ================"
grep -n "handleFileUpload" app/admin/page.tsx 2>/dev/null
grep -n "uploadImage" app/admin/page.tsx 2>/dev/null
grep -n "analyzeProduct" app/admin/page.tsx 2>/dev/null
grep -n "handleSaveProduct" app/admin/page.tsx 2>/dev/null

echo
echo "================ PRODUCT PAGE ================"
sed -n '1,250p' app/product/[id]/page.tsx 2>/dev/null

echo
echo "================ HOME PAGE ================"
sed -n '1,250p' app/page.tsx 2>/dev/null

echo
echo "================ STYLE QUIZ ================"
sed -n '1,250p' app/style-quiz/page.tsx 2>/dev/null

echo
echo "================ PROFILE PAGE ================"
sed -n '1,250p' app/profile/page.tsx 2>/dev/null

echo
echo "================ ORDERS PAGE ================"
sed -n '1,250p' app/orders/page.tsx 2>/dev/null

echo
echo "================ WISHLIST PAGE ================"
sed -n '1,250p' app/wishlist/page.tsx 2>/dev/null

echo
echo "================================================="
echo "AUDIT COMPLETE"
echo "================================================="
