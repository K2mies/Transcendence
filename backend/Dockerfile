FROM node:latest

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# should match with BACK_PORT in .env (used in docker-compose.yml)
EXPOSE 4242

CMD ["bash.sh", "./server.js"]
