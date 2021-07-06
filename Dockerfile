FROM node:12

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install

COPY . .

EXPOSE 1234

CMD [ "npm", "run", "start" ]