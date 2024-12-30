# Usa una imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json al contenedor
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia todo el código fuente al contenedor
COPY . .

# Expone el puerto en el que React corre por defecto
EXPOSE 5173

# Comando para iniciar la aplicación
CMD ["npm","run","start"]
