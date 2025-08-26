FROM openjdk:21-slim
WORKDIR /app
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
COPY src ./src
ARG ARTIFACT_ID
ARG VERSION
RUN ./mvnw clean package -DskipTests
EXPOSE 8092
ENV SERVER_PORT=8092
ENTRYPOINT ["java", "-jar", "-Dspring.profiles.active=prod", "target/headless-cms-0.0.1-SNAPSHOT.jar"]