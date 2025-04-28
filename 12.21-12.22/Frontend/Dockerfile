FROM node:23-slim AS base

ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
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
RUN npm ci --include=dev
COPY . .
RUN npm run build


FROM nginx:1.27-alpine-slim
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html