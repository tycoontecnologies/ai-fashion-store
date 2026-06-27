#!/bin/bash
set -e

echo "=================================================="
echo "GUESS360 RELEASE FREEZE"
echo "=================================================="

echo
echo "[1] SAVE PM2"
pm2 save || true

echo
echo "[2] GIT SNAPSHOT"
git add .
git commit -m "release-freeze-$(date +%Y%m%d-%H%M)" || true

echo
echo "[3] TAG"
git tag release-$(date +%Y%m%d-%H%M) || true

echo
echo "[4] BACKUP"
mkdir -p /root/releases/guess360

tar -czf \
/root/releases/guess360/guess360-$(date +%Y%m%d-%H%M).tar.gz \
app \
components \
lib \
public \
middleware.ts \
package.json \
package-lock.json \
next.config.* \
tsconfig.json \
2>/dev/null || true

echo
echo "[5] VERIFY"
pm2 list
curl -I http://127.0.0.1:3000/admin | head -1
curl -I http://127.0.0.1:3000/ | head -1

echo
echo "=================================================="
echo "RELEASE FROZEN"
echo "NEXT TASK = PRODUCT POPULATION"
echo "=================================================="
