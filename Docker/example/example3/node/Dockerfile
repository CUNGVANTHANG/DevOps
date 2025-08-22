# Dockerfile for java, maven container

FROM node:latest
WORKDIR /data
RUN npm install mysql2 && npm install express 
COPY . .
ENTRYPOINT ["node", "index.js"]
EXPOSE 3000

