FROM node

WORKDIR /app

COPY package.json yarn.lock ./
RUN npm install

COPY tsconfig.json ./
COPY webpack.config.js ./

COPY src ./src
COPY public ./public

RUN npm run build

EXPOSE 5533

CMD [ "npm", "run" "start" ]
