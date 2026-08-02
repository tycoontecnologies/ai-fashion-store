#!/bin/bash

set -e

echo "=== GitHub SSH Push Setup ==="

# Check repo
if [ ! -d ".git" ]; then
    echo "ERROR: This is not a git repository."
    exit 1
fi

echo ""
echo "1) Creating SSH key if missing..."

if [ ! -f ~/.ssh/id_ed25519 ]; then
    ssh-keygen -t ed25519 -C "tycoontecnologies@gmail.com" -N "" -f ~/.ssh/id_ed25519
else
    echo "SSH key already exists."
fi

echo ""
echo "======================================"
echo "COPY THIS KEY TO GITHUB:"
echo "GitHub -> Settings -> SSH and GPG keys"
echo "======================================"
cat ~/.ssh/id_ed25519.pub
echo "======================================"

echo ""
read -p "After adding the key to GitHub, press ENTER to continue..."

echo ""
echo "2) Testing GitHub SSH connection..."

ssh -T git@github.com || true

echo ""
echo "3) Switching Git remote to SSH..."

git remote set-url origin git@github.com:tycoontecnologies/ai-fashion-store.git

echo ""
echo "Current remote:"
git remote -v

echo ""
echo "4) Checking branch..."

BRANCH=$(git branch --show-current)

echo "Current branch: $BRANCH"

echo ""
echo "5) Pushing code..."

git push --set-upstream origin "$BRANCH"

echo ""
echo "======================================"
echo "DONE! Code pushed successfully."
echo "======================================"
