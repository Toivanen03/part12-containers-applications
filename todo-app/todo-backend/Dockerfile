FROM node:23-slim
WORKDIR /usr/src/app
COPY --chown=node:node . .
RUN npm ci --omit=dev
ENV DEBUG=todo-express-backend:server*
USER node
CMD ["npm", "start"]