#!/bin/bash
set -e

FILE="app/product/[id]/page.tsx"

cp "$FILE" "$FILE.bak.$(date +%Y%m%d_%H%M%S)"

python3 <<'PY'
from pathlib import Path

p = Path("app/product/[id]/page.tsx")
text = p.read_text()

start = text.find("setVariantProducts(group);")
end = text.find("})\n      .catch(console.error);")

if start == -1 or end == -1:
    print("Could not locate patch region.")
    raise SystemExit(1)

replacement = """setVariantProducts(group);

// Always start with the product image
setSelectedImage(p.image || "");

if (group.length) {

  const defaultVariant =
    group.find((v:any) => v.image === p.image) ||
    group[0];

  setSelectedVariant(defaultVariant);

}
"""

new_text = text[:start] + replacement + text[end:]

p.write_text(new_text)

print("Patch applied successfully.")
PY

echo
echo "========== BUILD =========="
npm run build

echo
echo "========== PM2 =========="
pm2 restart guess360-prod

echo
echo "Done."
