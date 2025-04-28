FROM node:23-slim
ENV NODE_ENV=development
WORKDIR /usr/src/app
COPY --chown=node:node . .
RUN npm ci
ENV DEBUG=patients-express-backend:server*
USER node