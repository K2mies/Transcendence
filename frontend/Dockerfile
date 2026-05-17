FROM node:20-alpine3.22 AS build
WORKDIR /app

COPY package*.json ./

RUN npm ci --include=dev

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
