FROM node

WORKDIR /app

COPY package.json yarn.lock ./
COPY tsconfig.json ./

RUN npm install -g yarn

RUN yarn install

COPY src ./src

EXPOSE 3333

CMD [ "yarn", "start" ]
