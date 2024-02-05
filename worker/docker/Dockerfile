FROM node:21-alpine

WORKDIR /app

COPY ./worker/ ./worker/
COPY ./common/ ./common/
WORKDIR /app/worker
RUN npm install
CMD [ "npm", "run", "start" ]