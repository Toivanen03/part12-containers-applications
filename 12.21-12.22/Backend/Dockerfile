FROM node:23-slim AS base
WORKDIR /usr/src/app

FROM base AS test
ENV NODE_ENV=test
COPY package-lock.json ./
COPY package.json ./
RUN npm ci --include=dev
COPY . .
RUN npm run lint

FROM base AS build-stage
ENV NODE_ENV=production
COPY package-lock.json ./
COPY package.json ./
RUN npm ci --omit=dev
COPY --chown=node:node . .
ENV DEBUG=patients-express-backend:server*
USER node
RUN npm run tsc

