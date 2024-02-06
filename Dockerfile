# cd C:\GitProjects\schedulerTMFront docker build -t scheduler .

# Estágio de compilação
FROM node:20-alpine AS build

# Instala o Git
RUN apk add --no-cache git

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia o arquivo package.json para o diretório de trabalho
RUN git clone https://github.com/V1centR/schedulerTMFront.git .

WORKDIR /app/schedulerTMFront/

# Instala as dependências do projeto
RUN npm ci

# Compila o projeto Angular
RUN npm run build --prod

# Estágio de produção
FROM nginx:1.24.0-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY ./dist/scheduler-tmfront/browser/* /usr/share/nginx/html

# Expor a porta 80 para o tráfego da web
EXPOSE 80

# Comando para iniciar o servidor Nginx
CMD ["nginx", "-g", "daemon off;"]