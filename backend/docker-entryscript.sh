#!/bin/sh
set -e

echo "🚀 Starting backend (PRODUCTION MODE)..."

echo "📦 Running migrations..."
npx prisma@6 migrate deploy

npx prisma@6 generate

echo "🌱 Running seed (idempotent)..."
node prisma/gamesSeed.js

echo "🌱 Running profile seed..."
node prisma/profilesSeed.js

echo "🌱 Running review seed..."
node prisma/reviewsSeed.js

echo "🚀 Starting server..."
# in package.json, we need to define in "scripts": { "start": "node server.js" } or similar
exec npm start