#Build stage 1
FROM node:10.18.1-jessie as build-stage1

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm ci
COPY . ./

#Build stage 2
FROM build-stage1 as build-stage2

WORKDIR /usr/src/app

ARG buildscript="buildlocal"
RUN npm run-script ${buildscript}

#Build stage 3
FROM nginx:1.14.2-alpine

COPY --from=build-stage2 /usr/src/app/dist/ /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
