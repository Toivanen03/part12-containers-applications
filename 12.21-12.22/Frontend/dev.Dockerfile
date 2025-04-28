FROM node:23-slim
ENV NODE_ENV=development
ENV PATH=/usr/src/app/node_modules/.bin:$PATH
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --include=dev
COPY . .