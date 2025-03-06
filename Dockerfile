# Stage 1: Base para dependências
FROM node:22-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Gera os arquivos do Prisma usando o caminho correto
RUN npx prisma generate --schema=libs/prisma/schema.prisma

# Stage 2: Build da aplicação
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=base /app ./
RUN npm run build

# Stage 3: Execução da aplicação
FROM node:22-alpine AS dist
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/libs/prisma/schema.prisma ./libs/prisma/

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
