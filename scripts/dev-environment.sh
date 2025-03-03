#!/bin/bash

# Instalar a versão lts/jod do Node.js usando nvm
echo "Instalando Node.js versão lts/jod..."
npx nvm install lts/jod
npx nvm use lts/jod

# Executar npm install no projeto
echo "Executando npm install..."
npm install

# Subir o Docker com o banco de dados do projeto
echo "Subindo o Docker com o banco de dados..."
docker compose up -d

# Rodar as migrations do Prisma
echo "Rodando as migrations do Prisma..."
npx prisma migrate dev --schema prisma/schema.prisma
npx prisma generate --schema prisma/schema.prisma

echo "Ambiente de desenvolvimento configurado com sucesso!"
