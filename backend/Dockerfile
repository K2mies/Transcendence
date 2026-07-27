FROM node:20-alpine3.22

WORKDIR /app

COPY package*.json ./

RUN npm ci --include=dev

COPY . .

ENV DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"

RUN npx prisma generate

RUN chmod +x docker-entryscript.sh

# should match with BACK_PORT in .env (used in docker-compose.yml)
EXPOSE 4243

CMD ["sh", "docker-entryscript.sh"]
