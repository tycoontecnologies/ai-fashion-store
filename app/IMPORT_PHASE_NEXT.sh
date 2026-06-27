#!/bin/bash
set -e

echo "======================================"
echo "LOCAL IMPORTER CONVERSION"
echo "======================================"

echo
echo "SHOW IMPORTER:"
echo

sed -n '1,400p' scripts/import_products.js

echo
echo "======================================"
echo "PASTE ENTIRE OUTPUT TO CHATGPT"
echo "======================================"
