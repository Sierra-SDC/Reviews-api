FROM node:12

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install

COPY . .

ENV PORT=1234

EXPOSE 1234

CMD [ "npm", "start" ]