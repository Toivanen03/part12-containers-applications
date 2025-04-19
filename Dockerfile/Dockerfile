FROM node:23-slim
WORKDIR /usr/src/app
COPY --chown=node:node . .
RUN npm ci --omit=dev
ENV DEBUG=server:*
USER node
CMD ["npm", "start"]