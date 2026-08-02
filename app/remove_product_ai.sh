#!/bin/bash

set -e

FILE="product/[id]/page.tsx"

echo "Backing up $FILE"
cp "$FILE" "$FILE.backup-before-ai-clean"

echo "Removing AI import..."
sed -i '/import AIOutfitRecommendations from "@\/components\/AIOutfitRecommendations";/d' "$FILE"

echo "Removing AI component..."
sed -i '/<AIOutfitRecommendations.*\/>/d' "$FILE"

echo "Remaining AI references:"
grep -n "AI" "$FILE" || echo "No AI references"

echo "Done"
