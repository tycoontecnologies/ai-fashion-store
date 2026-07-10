#!/bin/bash
set -e

FILE="app/product/[id]/page.tsx"

cp "$FILE" "$FILE.bak.$(date +%Y%m%d_%H%M%S)"

python3 <<'PY'
from pathlib import Path
import re

p = Path("app/product/[id]/page.tsx")
txt = p.read_text()

pattern = re.compile(
r'''getProductById\(params\.id as string\)
\s*\.then\(async \(p:any\)=>\{.*?\}\)
\s*\.catch\(console\.error\);''',
re.S)

replacement = r'''getProductById(params.id as string)
      .then(async (p:any)=>{

        setProduct(p);

        let group:any[] = [];

        if (p?.variantGroup) {

          group = await getVariantGroup(p.variantGroup);

        } else if (p?.variants?.length) {

          group = p.variants;

        }

        setVariantProducts(group);

        // show product image first
        setSelectedImage(p.image || "");

        if (group.length) {

          const defaultVariant =
            group.find((v:any)=>v.image===p.image) ||
            group[0];

          setSelectedVariant(defaultVariant);

        }

      })
      .catch(console.error);'''

newtxt, n = pattern.subn(replacement, txt, count=1)

if n != 1:
    print("Patch failed.")
    raise SystemExit(1)

p.write_text(newtxt)
print("Patched successfully.")
PY

npm run build
pm2 restart guess360-prod
