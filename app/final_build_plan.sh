#!/bin/bash

echo "===== STYLE QUIZ BACKUP FULL ====="
sed -n '1,999p' app/style-quiz/page-backup.tsx.tsx

echo
echo "===== HOME PAGE FULL ====="
sed -n '1,999p' app/page.tsx

echo
echo "===== PROFILE PAGE FULL ====="
sed -n '1,999p' app/profile/page.tsx

echo
echo "===== PRODUCT PAGE FULL ====="
sed -n '1,999p' app/product/[id]/page.tsx

echo
echo "===== AI RECOMMENDATIONS ====="
sed -n '1,999p' components/AIOutfitRecommendations.tsx

echo
echo "===== RELATED PRODUCTS ====="
sed -n '1,999p' components/RelatedProducts.tsx

echo
echo "===== CART CONTEXT ====="
sed -n '1,999p' app/context/CartContext.tsx

echo
echo "===== FIRESTORE PRODUCTS ====="
sed -n '1,999p' lib/firestoreProducts.ts

echo
echo "===== PRODUCT TYPE ====="
sed -n '1,999p' lib/types/product.ts

echo
echo "===== NAVBAR ====="
sed -n '1,999p' components/Navbar.tsx
