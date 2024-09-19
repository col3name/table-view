FROM node:20.13-alpine3.18 as build
WORKDIR /app

COPY package.json package-lock.json ./
CMD ["sh", "-c", "npm install -f"]

COPY . .
RUN npm install
RUN npm run build

#FROM node:22-alpine3.18
FROM nginx:stable-alpine

# Dependencies
RUN apk update

# Set up work directory
WORKDIR /app
CMD ["sh", "-c", "ls -a"]

COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
## Configure host
#ENV PORT 8081
#EXPOSE 8081
#
#CMD ["sh", "-c", "npm install -f && npm start"]
