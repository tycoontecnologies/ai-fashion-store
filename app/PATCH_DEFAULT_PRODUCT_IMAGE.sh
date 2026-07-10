#!/bin/bash
set -e

FILE="app/product/[id]/page.tsx"

echo "=========================================="
echo " PATCH DEFAULT PRODUCT IMAGE"
echo "=========================================="

cp "$FILE" "$FILE.bak.$(date +%Y%m%d_%H%M%S)"

python3 <<'PY'
from pathlib import Path

p = Path("app/product/[id]/page.tsx")
text = p.read_text()

old = """if (group.length) {

          const defaultVariant =
            group.find((v:any)=>v.image===p.image) ||
            group[0];

          setSelectedVariant(defaultVariant);

        }"""

new = """if (group.length) {

          const defaultVariant =
            group.find((v:any)=>v.image===p.image);

          if (defaultVariant) {
            setSelectedVariant(defaultVariant);
          }

        }"""

if old not in text:
    print("ERROR: Default variant block not found.")
    raise SystemExit(1)

text = text.replace(old, new)

old = """{selectedVariant?.color || product.color || "Default"}"""
new = """{selectedVariant?.color ?? "Default"}"""

if old in text:
    text = text.replace(old, new)

old = """Rs. {activeProduct.price}"""
new = """Rs. {selectedVariant?.price ?? product.price}"""

if old in text:
    text = text.replace(old, new)

p.write_text(text)

print("Patch applied successfully.")
PY

echo
echo "========== BUILD =========="
npm run build

echo
echo "========== RESTART =========="
pm2 restart guess360-prod

echo
echo "=========================================="
echo " DONE"
echo "=========================================="
