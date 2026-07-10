#!/bin/bash
set -e

echo "========================================"
echo " GUESS360 PM2 CWD FIX"
echo "========================================"

FILE="ecosystem.config.js"

if [ ! -f "$FILE" ]; then
    echo "ecosystem.config.js not found!"
    exit 1
fi

cp "$FILE" "$FILE.bak.$(date +%Y%m%d_%H%M%S)"

echo
echo "Updating PM2 working directory..."

sed -i 's#cwd:[[:space:]]*"/opt/guess360/app"#cwd: "/opt/guess360/app/app"#g' "$FILE"

echo
echo "========== UPDATED CONFIG =========="
cat "$FILE"

echo
echo "Deleting old PM2 process..."
pm2 delete guess360-prod || true

echo
echo "Starting new PM2 process..."
pm2 start ecosystem.config.js

echo
echo "Saving PM2..."
pm2 save

echo
echo "========== PM2 STATUS =========="
pm2 list

echo
echo "========== PM2 DETAILS =========="
pm2 describe guess360-prod

echo
echo "========================================"
echo " DONE"
echo "========================================"
