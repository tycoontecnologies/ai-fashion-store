#!/bin/bash

FILE=app/checkout/page.tsx

cp $FILE ${FILE}.bak.$(date +%s)

echo "===== CHECKOUT BACKUP CREATED ====="

grep -n "placeholder=\"Full Name\"" $FILE
grep -n "placeholder=\"Email\"" $FILE
grep -n "placeholder=\"Phone\"" $FILE
grep -n "placeholder=\"City\"" $FILE
grep -n "placeholder=\"Address\"" $FILE

echo
echo "NEXT STEP READY"
echo "Paste:"
echo "sed -n '1,120p' app/checkout/page.tsx"
