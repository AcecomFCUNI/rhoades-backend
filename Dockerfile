FROM node:lts

WORKDIR /app

COPY package.json ./

RUN yarn install --prod

# RUN yarn build

COPY dist /app/dist

CMD [ "yarn", "start" ]
