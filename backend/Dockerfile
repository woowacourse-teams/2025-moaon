# ==================================================
# 1. Builder Stage
# ==================================================
# Java21 JDK를 기반 이미지로 사용하여 빌드 환경 구성
FROM amazoncorretto:21 AS builder

# 작업 디렉터리를 /app 으로 설정
WORKDIR /app

# Gradle 빌드에 필요한 파일을 컨테이너로 복사
COPY gradlew .
COPY gradle ./gradle
COPY build.gradle .
COPY settings.gradle .

# Gradle Wrapper에 실행 권한 부여
RUN chmod +x ./gradlew

# 애플리케이션 소스 코드를 컨테이너로 복사
COPY src ./src

# Gradle을 사용하여 애플리케이션을 .jar 파일로 빌드
RUN ./gradlew bootJar --no-daemon

# ==================================================
# 2. Final Stage
# ==================================================
FROM alpine/java:21-jre

# 작업 디렉터리를 /app 으로 설정
WORKDIR /app

# 빌드 스테이지에서 생성된 JAR 파일을 최종 이미지의 app.jar로 복사
COPY --from=builder /app/build/libs/*.jar app.jar

EXPOSE 8080

# 컨테이너가 시작될 때 `java -jar app.jar` 명령어로 애플리케이션 실행
ENTRYPOINT ["java", "-jar", "app.jar"]
