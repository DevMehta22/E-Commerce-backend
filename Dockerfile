FROM node:22 as builder

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY . .

FROM node:22-slim

WORKDIR /app

COPY --from=builder /app .

COPY .env.sample .env

EXPOSE 8000

CMD ["npm", "run","dev"]



