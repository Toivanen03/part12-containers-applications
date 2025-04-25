FROM node:20-slim
ENV NODE_ENV=development
ENV PATH=/usr/src/app/node_modules/.bin:$PATH
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "dev", "--", "--host"]