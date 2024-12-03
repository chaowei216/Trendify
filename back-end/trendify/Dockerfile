FROM openjdk:21-jdk-slim

# Sao chép JAR từ thư mục target vào container
COPY ./target/trendify-0.0.1-SNAPSHOT.jar trendify-0.0.1-SNAPSHOT.jar

# Chạy ứng dụng JAR
ENTRYPOINT ["java", "-jar", "/trendify-0.0.1-SNAPSHOT.jar"]
