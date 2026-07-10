#!/bin/bash
set -e

FILE="components/TrendingSection.tsx"

cp "$FILE" "$FILE.bak.$(date +%Y%m%d_%H%M%S)"

python3 <<'PY'
from pathlib import Path

p = Path("components/TrendingSection.tsx")
txt = p.read_text()

old = """        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);"""

new = """        const data = await res.json();

        console.group("TRENDING PRODUCTS");
        console.table(
          (Array.isArray(data) ? data : []).map((p:any)=>({
            id: p.id,
            name: p.name,
            image: p.image,
            variantImage: p.variants?.[0]?.image || ""
          }))
        );
        console.groupEnd();

        setProducts(Array.isArray(data) ? data : []);"""

if old not in txt:
    raise SystemExit("ERROR: Target code not found.")

txt = txt.replace(old, new, 1)

p.write_text(txt)

print("TrendingSection patched successfully.")
PY

echo
echo "========== BUILD =========="
npm run build

echo
echo "========== RESTART =========="
pm2 restart guess360-prod

echo
echo "Done."
