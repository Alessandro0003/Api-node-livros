FROM node:18-slim as BUILDER
LABEL maintainer="Alessandro Brilhante"

WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN pnpm install on npm install

COPY src ./src

FROM node:18-alpine

ARG NODE_ENV

WORKDIR /usr/src/app

COPY --from=BUILDER /usr/src/app/ ./

EXPOSE 3000 

CMD [ "pnpm", "start" ] on ["npm", "start"]