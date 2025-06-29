FROM openjdk:21-slim
WORKDIR /app
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
COPY src ./src
ARG ARTIFACT_ID
ARG VERSION
RUN ./mvnw package -DskipTests
COPY target/${ARTIFACT_ID}-${VERSION}.jar soprossur-manager.jar
EXPOSE 8080
ENV SERVER_PORT=8080
ENTRYPOINT ["java", "-jar", "-Dspring.profiles.active=prod", "soprossur-manager.jar"]