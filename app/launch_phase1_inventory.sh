#!/bin/bash

echo "===== STYLE QUIZ BACKUP ====="
sed -n '1,999p' app/style-quiz/page-backup.tsx.tsx

echo
echo "===== HOME PAGE ====="
sed -n '1,999p' app/page.tsx

echo
echo "===== PROFILE PAGE ====="
sed -n '1,999p' app/profile/page.tsx

echo
echo "===== CART CONTEXT ====="
sed -n '1,999p' app/context/CartContext.tsx

echo
echo "===== PRODUCT TYPE ====="
sed -n '1,999p' lib/types/product.ts

echo
echo "===== STYLE PROFILE ====="
sed -n '1,999p' lib/firestoreStyleProfile.ts

echo
echo "===== NAVBAR ====="
sed -n '1,999p' components/Navbar.tsx
