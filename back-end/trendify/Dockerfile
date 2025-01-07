FROM openjdk:21-jdk-slim

ARG JAR_FILE=target/*.jar

# Sao chép JAR từ thư mục target vào container
COPY ${JAR_FILE} trendify.jar

# Chạy ứng dụng JAR
ENTRYPOINT ["java", "-jar", "trendify.jar"]

EXPOSE 8080
