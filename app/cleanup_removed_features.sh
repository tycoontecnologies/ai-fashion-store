#!/bin/bash

set -e

FILE="page.tsx"

echo "Backing up $FILE..."
cp "$FILE" "$FILE.backup-before-cleanup"

echo "Removing AI imports..."
sed -i '/import AIStylist from "@\/components\/AIStylist";/d' "$FILE"
sed -i '/import AIChatStylist from "@\/components\/AIChatStylist";/d' "$FILE"

echo "Removing AI components..."
sed -i '/<AIStylist \/>/d' "$FILE"
sed -i '/<AIChatStylist \/>/d' "$FILE"

echo "Removing AI recommended text..."
sed -i '/AI Recommended/d' "$FILE"

echo "Checking remaining AI references..."
grep -n "AI" "$FILE" || echo "No AI references found"

echo "Done."
