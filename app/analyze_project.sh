#!/usr/bin/env bash
set -e

REPORT=PROJECT_ANALYSIS_$(date +%Y%m%d_%H%M%S).txt

exec > >(tee "$REPORT") 2>&1

echo "======================================================="
echo "        GUESS360 COMPLETE PROJECT ANALYSIS"
echo "======================================================="

echo
echo "================ ENVIRONMENT ================"
pwd
node -v
npm -v

echo
echo "================ BUILD ================"
npm run build || true

echo
echo "================ TYPESCRIPT ================"
npx tsc --noEmit || true

echo
echo "================ BROKEN FETCH() ================"
grep -RIn "await fetch(" app components lib | while read line
do
    file=$(echo "$line" | cut -d: -f1)
    lineno=$(echo "$line" | cut -d: -f2)
    echo
    echo "FILE: $file:$lineno"
    sed -n "$((lineno-2)),$((lineno+12))p" "$file"
done

echo
echo "================ FETCH WITHOUT URL ================"
grep -RIn "await fetch(" app components lib | while read line
do
    file=$(echo "$line" | cut -d: -f1)
    lineno=$(echo "$line" | cut -d: -f2)

    next=$(sed -n "$((lineno+1))p" "$file")

    if echo "$next" | grep -q "{"
    then
        echo "$file:$lineno"
    fi
done

echo
echo "================ API ROUTES ================"
find app/api -type f | sort

echo
echo "================ API REFERENCES ================"
grep -RIn "/api/" app components lib || true

echo
echo "================ AI REFERENCES ================"
grep -RIn "AI\|Stylist\|analyze\|OpenAI\|GPT" app components lib || true

echo
echo "================ TODO / FIXME ================"
grep -RIn "TODO\|FIXME\|dummy\|mock\|placeholder" app components lib || true

echo
echo "================ PAGE ROUTES ================"
find app -name page.tsx | sort

echo
echo "================ DUPLICATE FILES ================"
find . -type f \
| grep -E "bak|backup|copy|old|before_restore|fire|tmp"

echo
echo "================ IMPORT ERRORS ================"
grep -RIn "from .*AI" app components lib || true

echo
echo "================ BUILD COMPLETE ================"
echo
echo "REPORT:"
echo "$REPORT"
