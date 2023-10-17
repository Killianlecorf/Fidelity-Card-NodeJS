# FROM node:14 as base

# WORKDIR /home/node/app

# COPY package*.json ./

# RUN npm i

# COPY . .

# FROM base as production

# ENV NODE_PATH=./build

# RUN npm run build


# FROM node:lts-alpine as build

# WORKDIR /usr/local/app
# COPY ./ /usr/local/app
# RUN npm i

# EXPOSE 5152

# CMD ["node", "dist/app.js"]


FROM node:18 as development

WORKDIR /usr/src/app

COPY package*.json .

# RUN npm install
RUN npm install --include=dev

COPY . .

CMD [ "npm", "run", "dev" ]

FROM development as build

RUN npm run build


FROM node:18 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY .env .env

COPY package*.json .

RUN npm install

COPY --from=build /usr/src/app/dist ./dist

CMD ["node", "dist/server.js"]