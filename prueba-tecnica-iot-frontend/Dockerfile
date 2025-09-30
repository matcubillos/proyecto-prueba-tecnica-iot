# Usar imagen ligera de Node para desarrollo
FROM node:20-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del proyecto
COPY . .

# Exponer puerto 4200 (Angular dev server)
EXPOSE 4200

# Comando para iniciar el servidor de desarrollo con hot-reload
CMD ["npm", "start"]