FROM node:18-alpine3.17 as build-stage

WORKDIR /app
COPY . .
RUN npm install 
RUN npm run build

FROM nginx:alpine3.17
# WIP: refactoring. Ist nicht ganz sauber
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
