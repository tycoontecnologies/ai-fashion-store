#!/bin/bash

set -e

echo "Searching Firestore imports..."

FILES=$(grep -rl "firestoreProducts\|firestoreOrders" --include="*.ts" --include="*.tsx" . || true)

if [ -z "$FILES" ]; then
    echo "No Firestore references found."
    exit 0
fi

for FILE in $FILES
do
    echo "Updating: $FILE"

    sed -i 's|@/lib/firestoreProducts|@/lib/products|g' "$FILE"
    sed -i 's|@/lib/firestoreOrders|@/lib/orders|g' "$FILE"
done

echo ""
echo "Remaining Firestore references:"
grep -R "firestoreProducts\|firestoreOrders\|firebase" \
--include="*.ts" \
--include="*.tsx" \
. || echo "No active Firestore references found."

echo "Done."
