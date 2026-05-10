#!/bin/sh
set -e

echo "🚀 Starting backend (PRODUCTION MODE)..."

echo "⏳ Waiting for database..."
until nc -z postgres_db 5432; do
  sleep 1
done

echo "✅ Database is ready"

echo "📦 Running migrations..."
npx prisma migrate deploy

echo "🌱 Running seed (idempotent)..."
node prisma/gamesSeed.js

echo "🚀 Starting server..."
exec npm start