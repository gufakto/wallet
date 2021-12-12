FROM node:slim

WORKDIR /app

COPY package*.json ./

RUN apt-get update

RUN npm install

COPY . ./app

CMD ["npm", "start"]