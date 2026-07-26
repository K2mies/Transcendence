#!/bin/sh
set -e

echo "🚀 Starting backend (PRODUCTION MODE)..."

echo "📦 Running migrations..."
npx prisma@6 migrate deploy

echo "🚀 Starting server..."
# in package.json, we need to define in "scripts": { "start": "node server.js" } or similar
exec npm start