FROM node:16.18

COPY . /app
WORKDIR /app

RUN npm install
RUN npm audit fix --force
RUN npm run build

EXPOSE 50051 3003 3005
ENTRYPOINT [ "npm", "run", "start:prod" ]
