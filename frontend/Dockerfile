FROM node

WORKDIR /app

COPY package.json yarn.lock ./
COPY tsconfig.json ./
COPY webpack.config.js ./

RUN yarn install

COPY src ./src
COPY public ./public

RUN yarn

EXPOSE 5533

CMD [ "yarn", "start" ]
