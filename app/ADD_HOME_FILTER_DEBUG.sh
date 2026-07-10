#!/bin/bash
set -e

FILE="app/page.tsx"

cp "$FILE" "$FILE.bak.$(date +%Y%m%d_%H%M%S)"

python3 <<'PY'
from pathlib import Path

p=Path("app/page.tsx")
txt=p.read_text()

old="""  const filteredProducts =
    products.filter((product) => {"""

new="""  console.log("HOME DEBUG",{
    totalProducts:products.length,
    search,
    selectedColor,
    selectedCategory
  });

  const filteredProducts =
    products.filter((product) => {"""

if old not in txt:
    raise SystemExit("Pattern not found.")

txt=txt.replace(old,new,1)

old2="""  return (

    <main"""

new2="""  console.log("FILTERED PRODUCTS",filteredProducts.length);

  return (

    <main"""

txt=txt.replace(old2,new2,1)

p.write_text(txt)
print("Patched.")
PY

npm run build
pm2 restart guess360-prod
