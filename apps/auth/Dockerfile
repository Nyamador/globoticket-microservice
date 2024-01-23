FROM --platform=linux/amd64 node:16-slim

RUN apt-get update && apt-get install -y build-essential && apt-get install -y openssl && apt-get install -y python

WORKDIR /ww-api

COPY . .

RUN yarn install --ignore-engines && yarn build

EXPOSE 3000

# RUN yarn start
CMD [ "node" , "dist/main"]