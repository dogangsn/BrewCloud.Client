#stage 1
FROM node:20.10.0-alpine AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install --force
COPY . .
RUN npm run production  

#stage 2
FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/vetsystems.client /usr/share/nginx/html
EXPOSE 80
