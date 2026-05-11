FROM node:20-alpine3.22

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

COPY docker-entryscript.sh /app/docker-entryscript.sh
RUN chmod +x docker-entryscript.sh

# should match with BACK_PORT in .env (used in docker-compose.yml)
EXPOSE 4242

CMD ["sh", "docker-entryscript.sh"]
