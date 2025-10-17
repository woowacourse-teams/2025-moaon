FROM amazoncorretto:21 AS builder

WORKDIR /app

COPY gradlew .
COPY gradle ./gradle
COPY build.gradle .
COPY settings.gradle .

RUN chmod +x ./gradlew

RUN --mount=type=cache,target=/root/.gradle,id=gradle-home,sharing=locked \
    ./gradlew --no-daemon dependencies

COPY src ./src

RUN --mount=type=cache,target=/root/.gradle,id=gradle-home,sharing=locked \
    ./gradlew --no-daemon bootJar

FROM amazoncorretto:21-alpine

WORKDIR /app

RUN apk add --no-cache curl && \
    curl -L -o opentelemetry-javaagent.jar \
    https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/latest/download/opentelemetry-javaagent.jar && \
    apk del curl

COPY --from=builder /app/build/libs/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-javaagent:opentelemetry-javaagent.jar", "-jar", "app.jar"]
