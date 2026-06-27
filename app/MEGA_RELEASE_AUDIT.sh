#!/bin/bash
set -e

REPORT=/tmp/guess360_release_audit.txt

exec > "$REPORT" 2>&1

echo "====================================================="
echo "GUESS360 MEGA RELEASE AUDIT"
echo "====================================================="

echo
echo "===== BUILD ====="
npm run build

echo
echo "===== PM2 ====="
pm2 list

echo
echo "===== ROUTES ====="
find app -name page.tsx | sort

echo
echo "===== API ROUTES ====="
find app/api -type f

echo
echo "===== MIDDLEWARE ====="
sed -n '1,200p' middleware.ts

echo
echo "===== FIREBASE ====="
sed -n '1,200p' lib/firebase.ts

echo
echo "===== STORAGE ====="
sed -n '1,200p' lib/storage.ts

echo
echo "===== PRODUCTS ====="
grep -R "getProducts\|saveProduct\|deleteProduct" app lib -n

echo
echo "===== ORDERS ====="
grep -R "getOrders\|saveOrder" app lib -n

echo
echo "===== STYLE PROFILE ====="
grep -R "StyleProfile\|saveStyleProfile\|getStyleProfiles" app lib -n

echo
echo "===== OPENAI ====="
grep -R "OpenAI\|gpt-4" app/api -n

echo
echo "===== CHECKOUT ====="
sed -n '1,320p' app/checkout/page.tsx

echo
echo "===== ORDERS PAGE ====="
sed -n '1,320p' app/orders/page.tsx

echo
echo "===== ADMIN ORDERS ====="
sed -n '1,320p' app/admin/orders/page.tsx

echo
echo "===== PROFILE ====="
sed -n '1,260p' app/profile/page.tsx

echo
echo "===== ADMIN ====="
sed -n '1,380p' app/admin/page.tsx

echo
echo "===== ADMIN PRODUCTS ====="
sed -n '1,320p' app/admin/products/page.tsx

echo
echo "===== STYLE QUIZ ====="
sed -n '1,320p' app/style-quiz/page.tsx

echo
echo "===== HOME ====="
sed -n '1,320p' app/page.tsx

echo
echo "===== PRODUCT PAGE ====="
sed -n '1,320p' app/product/[id]/page.tsx

echo
echo "===== PRODUCT ACTIONS ====="
sed -n '1,220p' components/ProductActions.tsx

echo
echo "===== RELATED PRODUCTS ====="
sed -n '1,260p' components/RelatedProducts.tsx

echo
echo "===== AI STYLIST ====="
sed -n '1,260p' components/AIChatStylist.tsx

echo
echo "===== SEARCH ====="
sed -n '1,260p' app/search/page.tsx

echo
echo "===== CART ====="
sed -n '1,320p' app/cart/page.tsx

echo
echo "===== WISHLIST ====="
sed -n '1,320p' app/wishlist/page.tsx

echo
echo "===== AUTH ====="
sed -n '1,260p' app/context/AuthContext.tsx

echo
echo "===== CART CONTEXT ====="
sed -n '1,360p' app/context/CartContext.tsx

echo
echo "===== PRODUCT MODEL ====="
find lib -type f | xargs grep -n "interface Product\|type Product" || true

echo
echo "===== LOCAL HEALTH ====="
curl -I http://127.0.0.1:3000/
curl -I http://127.0.0.1:3000/admin
curl -I http://127.0.0.1:3000/admin/products
curl -I http://127.0.0.1:3000/admin/orders
curl -I http://127.0.0.1:3000/style-quiz
curl -I http://127.0.0.1:3000/orders

echo
echo "===== ANALYZE API ====="
curl -s -X POST http://127.0.0.1:3000/api/analyze \
-H "Content-Type: application/json" \
-d '{"imageUrl":"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"}'

echo
echo
echo "===== PM2 RESTART TEST ====="
pm2 restart guess360 --update-env
sleep 10
pm2 list

echo
echo "===== PORT CHECK ====="
ss -ltnp | grep 3000 || true

echo
echo "====================================================="
echo "RELEASE AUDIT COMPLETE"
echo "====================================================="
