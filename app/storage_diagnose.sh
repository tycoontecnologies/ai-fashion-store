#!/bin/bash

echo "================================="
echo "FIREBASE STORAGE DIAGNOSIS"
echo "================================="

echo
echo "PROJECT:"
grep PROJECT_ID .env.local

echo
echo "BUCKET:"
grep STORAGE_BUCKET .env.local

echo
echo "RESULT:"
curl -s \
"https://firebasestorage.googleapis.com/v0/b/guess360-d6c98.firebasestorage.app/o" \
| head -20

echo
echo "CONCLUSION:"
echo "If result is 404 => Firebase Storage not initialized."
echo "Importer cannot run until Storage exists."
