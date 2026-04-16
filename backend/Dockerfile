# Backend API only. Requires PostgreSQL and env (DB_*, API_URL, API_TOKEN) at runtime.
# Build: docker build -t cursor_explore .
# Run:   docker run -p 3000:3000 --env-file .env cursor_explore
FROM node:24-alpine AS deps

WORKDIR /app

# Copy backend package manifests first for better layer caching
COPY package.json package-lock.json ./

# Install production dependencies only
RUN npm ci --omit=dev

FROM node:24-alpine
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["node", "app.js"]