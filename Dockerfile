# Usa una imagen de Node
FROM node:18

# Carpeta de trabajo dentro del contenedor
WORKDIR /app

# Copiar dependencias e instalar
COPY package*.json ./
RUN npm install

# Copiar el resto del código
COPY . .

# Compilar TypeScript
RUN npm run build

# Exponer el puerto
EXPOSE 3000

# Comando para iniciar
CMD ["node", "dist/index.js"]
