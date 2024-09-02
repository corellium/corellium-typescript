#!/bin/bash

# Load environment variables from .env file
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
else
    echo ".env file not found"
    exit 1
fi

# Check if CORELLIUM_API_DOMAIN is set
if [ -z "$CORELLIUM_API_DOMAIN" ]; then
    echo "CORELLIUM_API_DOMAIN is not set in the .env file"
    exit 1
fi

npx openapi-typescript@6.7.6 https://$CORELLIUM_API_DOMAIN/api/openapi.json -o ./types/corellium.d.ts