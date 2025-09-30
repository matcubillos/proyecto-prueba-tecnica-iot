# Base con Node
FROM node:20-alpine AS base
WORKDIR /var/api

# Instala dependencias del sistema SOLO si lo necesitas
# RUN apk add --no-cache git iputils procps

# Copia dependencias primero (aprovecha cache)
COPY package*.json ./

# ============ DEVELOPMENT ============
FROM base AS development

# Instala TODAS las dependencias (incluye devDependencies)
RUN npm install

# Copia el resto del proyecto directamente con permisos correctos
COPY --chown=node:node . .

# NO cambies a usuario node, mantente como root para que pueda escribir
# USER node

EXPOSE 3000

# En dev no necesitas build, usas ts-node/webpack hot reload
CMD ["npm", "run", "start:dev"]