#!/bin/bash

REPORT=SOURCE_ANALYSIS_$(date +%F_%H%M%S).txt

exec > >(tee "$REPORT") 2>&1

echo "=================================================="
echo "GUESS360 SOURCE ANALYSIS"
echo "=================================================="

EXCLUDES=(
"./node_modules/*"
"./.next/*"
"./backups/*"
"./.git/*"
)

PRUNE='\( -path "./node_modules" -o -path "./.next" -o -path "./backups" -o -path "./.git" \) -prune'

echo
echo "========== BUILD =========="
npm run build || true

echo
echo "========== TYPESCRIPT =========="
npx tsc --noEmit || true

echo
echo "========== BROKEN FETCH =========="
find . \( -path "./node_modules" -o -path "./.next" -o -path "./backups" -o -path "./.git" \) -prune -o -name "*.ts" -o -name "*.tsx" \
| while read f
do
grep -n "await fetch(" "$f" 2>/dev/null
done

echo
echo "========== FETCH WITHOUT URL =========="
python3 <<'PY'
import pathlib,re

skip={"node_modules",".next","backups",".git"}

for p in pathlib.Path(".").rglob("*.[tj]sx"):
    if any(x in p.parts for x in skip):
        continue

    txt=p.read_text(errors="ignore")

    for m in re.finditer(r'fetch\s*\(\s*\{',txt):
        print(p,m.start())
PY

echo
echo "========== API ROUTES =========="
find app/api -type f | sort

echo
echo "========== API REFERENCES =========="
grep -RIn "/api/" app components lib --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=backups || true

echo
echo "========== AI REFERENCES =========="
grep -RIn "AI\|Stylist\|OpenAI\|GPT\|analyze" app components lib \
--exclude-dir=node_modules \
--exclude-dir=.next \
--exclude-dir=backups || true

echo
echo "========== IMPORT ERRORS =========="
grep -RIn "^import" app components lib \
--exclude-dir=node_modules \
--exclude-dir=.next \
--exclude-dir=backups || true

echo
echo "========== ROUTES =========="
find app -name page.tsx

echo
echo "========== DUPLICATE FILES =========="
find . \
-not -path "./node_modules/*" \
-not -path "./.next/*" \
-not -path "./backups/*" \
\( \
-name "*.bak" -o \
-name "*.backup" -o \
-name "*.old" -o \
-name "*.before_restore*" -o \
-name "*.disabled" -o \
-name "*.fire*" \
\)

echo
echo "========== REPORT =========="
echo "$REPORT"
