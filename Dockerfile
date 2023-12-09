FROM node:20.9.0-alpine3.18

ENV TZ=Asia/Almaty

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD [ "node", "dist/main.js" ]
