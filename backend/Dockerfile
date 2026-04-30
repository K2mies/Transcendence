FROM node:20-alpine3.22

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# should match with BACK_PORT in .env (used in docker-compose.yml)
EXPOSE 4242

# in package.json, we need to define in "scripts": { "start": "node server.js" } or similar
CMD ["npm", "start"]
