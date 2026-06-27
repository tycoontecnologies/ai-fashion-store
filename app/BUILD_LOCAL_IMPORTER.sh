#!/bin/bash
set -e

echo "================================="
echo "LOCAL IMAGE IMPORT MODE"
echo "================================="

echo
echo "Images:"
find public/products -type f | wc -l

echo
echo "Creating import folders..."
mkdir -p imports logs

echo
echo "Ready for local filesystem importer."
echo
echo "NEXT:"
echo "sed -n '1,260p' scripts/import_products.js"
