FROM node:26-bookworm

RUN mkdir /app
COPY . /app

WORKDIR /app

RUN npm install
RUN npm run build

ENTRYPOINT [ "/bin/node", "build/index.js" ]