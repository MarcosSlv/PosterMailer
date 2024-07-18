FROM node

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY tsconfig.json ./
COPY webpack.config.js ./


COPY src ./src
COPY public ./public

RUN yarn build

EXPOSE 5533

CMD [ "yarn", "start" ]
