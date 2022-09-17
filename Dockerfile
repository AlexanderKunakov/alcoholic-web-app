# stage1 - build react app first
FROM node:16.15.1-alpine as build
WORKDIR /app
COPY ./package.json /app/
COPY ./package-lock.json /app
RUN npm install --omit=dev
COPY . /app
RUN npm run build

# stage 2 - build the final image and copy the react build files
FROM nginx:1.17.8-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
