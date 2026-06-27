#!/bin/bash

FILE=/root/ai-fashion-store/firebase-service-account.json

if [ -f "$FILE" ]; then
    echo "SERVICE_ACCOUNT_FOUND"
else
    echo "SERVICE_ACCOUNT_MISSING"
fi
