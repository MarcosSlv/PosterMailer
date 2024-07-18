FROM node

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY src ./src

EXPOSE 3333

CMD [ "npm", "run", "start" ]
