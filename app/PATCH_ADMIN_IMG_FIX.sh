#!/bin/bash
set -e

FILE="app/admin/products/page.tsx"

cp "$FILE" "$FILE.bak.$(date +%Y%m%d_%H%M%S)"

perl -0777 -i -pe 's#<Image\s+src=\{p\.image\}\s+alt=\{p\.name\}\s+width=\{70\}\s+height=\{70\}\s+className="rounded-xl border object-cover"\s*/>#<img\n              src={p.image}\n              alt={p.name}\n              className="w-[70px] h-[70px] rounded-xl border object-cover"\n            />#gs' "$FILE"

perl -0777 -i -pe 's#<Image\s+src=\{variantThumb\}\s+alt="Variant"\s+width=\{40\}\s+height=\{40\}\s+className="w-10 h-10 rounded-lg border object-cover mx-auto"\s*/>#<img\n              src={variantThumb}\n              alt="Variant"\n              className="w-10 h-10 rounded-lg border object-cover mx-auto"\n            />#gs' "$FILE"

echo
echo "===================================="
echo " ADMIN IMAGE PATCH COMPLETE"
echo "===================================="
echo

grep -n "<img" "$FILE"
grep -n "<Image" "$FILE"
