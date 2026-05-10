FROM node:20-alpine3.22

WORKDIR /app

COPY package*.json ./

RUN apk add --no-cache openssl curl

RUN npm ci

COPY . .

RUN npx prisma generate

COPY docker-entryscript.sh /app/docker-entryscript.sh
RUN chmod +x docker-entryscript.sh

# should match with BACK_PORT in .env (used in docker-compose.yml)
EXPOSE 4242

# in package.json, we need to define in "scripts": { "start": "node server.js" } or similar
CMD ["sh", "docker-entryscript.sh"]
