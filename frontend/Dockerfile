FROM node

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY webpack.config.js ./

RUN npm install

COPY src ./src
COPY public ./public

EXPOSE 5533

CMD [ "npm", "run", "start" ]
