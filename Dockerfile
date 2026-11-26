FROM node:26-bookworm

RUN mkdir /app
COPY . /app

WORKDIR /app

RUN npm install
RUN npm run build

# Drizzle
# Replace with your DB credentials!
ENV DATABASE_URL="postgres://bbtm:secretpass@localhost:5400/bbtm"

# BrownBird Auth configuration
ENV BBAUTH_CLIENT_ID="a"
ENV BBAUTH_CLIENT_SECRET="a"

# Google configuration
ENV GOOGLE_CLIENT_ID="a"
ENV GOOGLE_CLIENT_SECRET="a"

ENV IMAGE_STORAGE_PATH="./.image-storage" 

ENTRYPOINT [ "/bin/node", "build/index.js" ]