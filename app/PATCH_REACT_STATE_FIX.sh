#!/bin/bash
set -e

FILE="app/admin/product/page.tsx"

echo "=========================================="
echo " PATCHING PRODUCT EDITOR"
echo "=========================================="

cp "$FILE" "$FILE.bak.$(date +%Y%m%d_%H%M%S)"

python3 <<'PY'
import re

file="app/admin/product/page.tsx"

with open(file,"r",encoding="utf-8") as f:
    txt=f.read()

# ----------------------------------------------------
# Add gallery / variants to initial state
# ----------------------------------------------------
txt=txt.replace(
'''newArrival:false
});''',
'''newArrival:false,
gallery:[],
variants:[]
});'''
)

# ----------------------------------------------------
# Convert:
# setProduct({
#   ...product,
#   ...
# });
#
# to
#
# setProduct(prev => ({
#   ...prev,
#   ...
# }));
# ----------------------------------------------------
pattern=r'setProduct\s*\(\s*\{\s*\.\.\.product,([\s\S]*?)\}\s*\);'

def repl(m):
    body=m.group(1).rstrip()
    return f'''setProduct(prev => ({{
  ...prev,{body}
}}));'''

txt=re.sub(pattern,repl,txt)

with open(file,"w",encoding="utf-8") as f:
    f.write(txt)

print("Patch completed.")
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
