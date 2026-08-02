#!/bin/bash

set -e

FILE="product/[id]/page.tsx"

echo "Backup..."
cp "$FILE" "$FILE.backup-before-ai-block-remove"

python3 <<'PY'
from pathlib import Path
import re

p = Path("product/[id]/page.tsx")
s = p.read_text()

# Remove multiline AIOutfitRecommendations component
s = re.sub(
    r'\s*<AIOutfitRecommendations[\s\S]*?\/>\s*',
    '\n',
    s
)

p.write_text(s)
PY

echo "Remaining AI references:"
grep -n "AI" "$FILE" || echo "No AI references found"

echo "Done"
