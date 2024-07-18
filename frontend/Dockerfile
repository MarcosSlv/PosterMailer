FROM node

WORKDIR /app

COPY package.json yarn.lock ./
COPY tsconfig.json ./
COPY webpack.config.js ./

RUN npm install -g yarn

RUN yarn install

COPY src ./src
COPY public ./public

RUN yarn build

EXPOSE 5533

CMD [ "yarn", "start" ]
