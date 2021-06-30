FROM docker.repos.blinfo.se/blinfo/maven:3.6.3-jdk-14 as resolve
WORKDIR /workspace
COPY pom.xml .
RUN mvn -e -ntp -B dependency:resolve

FROM resolve as package
COPY src ./src
RUN mvn -e -ntp -B package -DskipTests

FROM adoptopenjdk:14.0.2_8-jre-hotspot as app
WORKDIR /app
COPY --from=package /workspace/target/blapp-support-api-0.0.1-SNAPSHOT.jar .
CMD ["java","-jar","blapp-support-api-0.0.1-SNAPSHOT.jar"]
