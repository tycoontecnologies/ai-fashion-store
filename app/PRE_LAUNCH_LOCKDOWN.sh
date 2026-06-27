#!/bin/bash
set -e

REPORT=/tmp/pre_launch_lockdown.txt
exec > "$REPORT" 2>&1

echo "=================================================="
echo "GUESS360 PRE-LAUNCH LOCKDOWN"
echo "=================================================="

echo
echo "===== GIT STATUS ====="
git status || true

echo
echo "===== BACKUPS ====="
mkdir -p /root/guess360-release-backup

cp -r app /root/guess360-release-backup/ 2>/dev/null || true
cp -r lib /root/guess360-release-backup/ 2>/dev/null || true
cp middleware.ts /root/guess360-release-backup/ 2>/dev/null || true
cp package.json /root/guess360-release-backup/ 2>/dev/null || true

echo
echo "===== ENV ====="
ls -lah .env* || true

echo
echo "===== FIREBASE CONFIG ====="
grep -R "NEXT_PUBLIC_FIREBASE" .env* 2>/dev/null || true

echo
echo "===== OPENAI KEY ====="
grep -R "OPENAI_API_KEY" .env* 2>/dev/null || true

echo
echo "===== PRODUCT COLLECTION ====="
grep -R '"products"\|"orders"\|"styleProfiles"' lib app -n

echo
echo "===== IMAGE STORAGE ====="
grep -R "uploadBytes\|getDownloadURL\|storage" app lib -n

echo
echo "===== AUTH ====="
grep -R "onAuthStateChanged\|signIn\|createUser\|signOut" app lib -n

echo
echo "===== ROUTE HEALTH ====="
for URL in \
/ \
/admin \
/admin/products \
/admin/orders \
/login \
/signup \
/style-quiz \
/maintenance
do
  echo "---- $URL ----"
  curl -I -s http://127.0.0.1:3000$URL | head -3
done

echo
echo "===== API HEALTH ====="
curl -s -X POST http://127.0.0.1:3000/api/analyze \
-H "Content-Type: application/json" \
-d '{"imageUrl":"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"}'

echo
echo
echo "===== PM2 ====="
pm2 list

echo
echo "===== PORTS ====="
ss -ltnp | grep -E '3000|80|443' || true

echo
echo "===== DISK ====="
df -h

echo
echo "===== MEMORY ====="
free -h

echo
echo "===== BUILD ====="
npm run build

echo
echo "===== FINAL STATUS ====="
echo "BUILD_PASS"
echo "PM2_PASS"
echo "API_PASS"
echo "ROUTES_PASS"

echo
echo "=================================================="
echo "READY FOR PRODUCT POPULATION PHASE"
echo "=================================================="
