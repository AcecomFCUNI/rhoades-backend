FROM node:lts

WORKDIR /app

COPY package.json ./

RUN yarn install --prod

# RUN yarn build

copy dist /app/dist

CMD [ "yarn", "start" ]
