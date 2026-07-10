#!/bin/bash
set -e

FILE="app/admin/products/page.tsx"

cp "$FILE" "$FILE.debug.$(date +%s)"

python3 <<'PY'
from pathlib import Path

f=Path("app/admin/products/page.tsx")
t=f.read_text()

old="""const firstVariant = (p.variants || [])[0];"""

new="""const firstVariant = (p.variants || [])[0];

console.log("IMAGE URL =", p.image);
console.log("VARIANT URL =", firstVariant?.image);
"""

if old not in t:
    raise Exception("Pattern not found")

t=t.replace(old,new,1)
f.write_text(t)

print("Debug injected.")
PY
