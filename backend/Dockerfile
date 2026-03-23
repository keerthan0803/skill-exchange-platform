# syntax=docker/dockerfile:1

FROM maven:3.9.9-eclipse-temurin-17 AS build
WORKDIR /workspace/backend

# Cache dependencies first
COPY pom.xml ./
RUN mvn -B -ntp dependency:go-offline

# Build application
COPY src ./src
RUN mvn -B -ntp -DskipTests clean package && \
    JAR_PATH=$(find target -maxdepth 1 -type f -name "*.jar" ! -name "*.jar.original" | head -n 1) && \
    cp "$JAR_PATH" app.jar

FROM eclipse-temurin:17-jre
WORKDIR /app

COPY --from=build /workspace/backend/app.jar ./app.jar

EXPOSE 8000

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
