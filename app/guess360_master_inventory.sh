#!/bin/bash

REPORT=/tmp/guess360_master_inventory.txt

{
echo "========== ROUTES =========="
find app -name page.tsx | sort

echo
echo "========== APIs =========="
find app/api -type f | sort

echo
echo "========== FIREBASE =========="
find lib -type f | grep -i firebase

echo
echo "========== STORAGE =========="
grep -R "uploadBytes\|getDownloadURL\|getStorage" app lib components -n

echo
echo "========== OPENAI =========="
grep -R "OpenAI\|gpt-" app lib -n

echo
echo "========== PRODUCTS =========="
grep -R "saveProduct\|getProducts\|deleteProduct" app lib -n

echo
echo "========== ORDERS =========="
grep -R "saveOrder\|getOrders" app lib -n

echo
echo "========== STYLE PROFILE =========="
grep -R "StyleProfile\|saveStyleProfile" app lib -n

echo
echo "========== TODO MARKERS =========="
grep -R "TODO\|FIXME\|placeholder" app lib components -n

} > "$REPORT"

echo "REPORT: $REPORT"
