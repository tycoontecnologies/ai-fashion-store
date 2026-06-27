#!/bin/bash

echo "===== STYLE PROFILE FILES ====="
find lib app components -type f | grep -i style

echo
echo "===== STYLE PROFILE CODE ====="
grep -R "styleProfile\|StyleProfile\|saveStyle\|getStyle" lib app components -n

echo
echo "===== STYLE QUIZ BACKUP ====="
sed -n '1,400p' app/style-quiz/page-backup.tsx.tsx

echo
echo "===== CURRENT STYLE QUIZ ====="
sed -n '1,250p' app/style-quiz/page.tsx

echo
echo "===== HOME PAGE ====="
sed -n '1,350p' app/page.tsx

echo
echo "===== PROFILE PAGE ====="
sed -n '1,350p' app/profile/page.tsx

echo
echo "===== PRODUCT PAGE ====="
sed -n '1,350p' app/product/[id]/page.tsx

echo
echo "===== CART PRODUCT TYPE ====="
sed -n '1,250p' app/context/CartContext.tsx

echo
echo "===== FIRESTORE STYLE PROFILE ====="
sed -n '1,300p' lib/firestoreStyleProfile.ts

echo
echo "===== ADMIN PRODUCTS PAGE ====="
sed -n '1,300p' app/admin/products/page.tsx
