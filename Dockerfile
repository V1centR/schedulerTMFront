# Estágio 2: Construir a aplicação Spring Boot

# cd C:\GitProjects\schedulerTMFront docker build -t scheduler .


FROM maven:3.8.4-openjdk-11-slim AS spring-build

# Instala o Git
RUN apt-get update && \
    apt-get install -y git

WORKDIR /app
RUN git clone https://github.com/V1centR/SchedulerTransferTM.git spring-boot-app
WORKDIR /app/spring-boot-app
RUN mvn clean package -DskipTests

# Estágio 1: Construir a aplicação Angular
FROM node:20 AS angular-build
WORKDIR /app
RUN git clone https://github.com/V1centR/schedulerTMFront.git angular-app
WORKDIR /app/angular-app
RUN npm install
RUN npm run build --prod

# Estágio 3: Executar as aplicações
FROM adoptopenjdk/openjdk11:alpine-jre
WORKDIR /app
COPY --from=spring-build /app/spring-boot-app/target/*.jar /app/spring-boot-app.jar
COPY --from=angular-build /app/angular-app/dist/angular-app /app/angular-app
EXPOSE 8080
CMD ["java", "-jar", "spring-boot-app.jar"]