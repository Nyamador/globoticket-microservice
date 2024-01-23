FROM --platform=linux/amd64 node:16-slim

RUN apt-get update && apt-get install -y build-essential && apt-get install -y openssl && apt-get install -y python

WORKDIR /app

COPY . .

RUN yarn install --ignore-engines && yarn prisma generate && yarn build

ENV PORT 3000
ENV DATABASE_URL postgresql://postgres:Testingmic12@@35.226.189.242:5432/bookings?schema=public

EXPOSE 3000

# RUN yarn start
CMD [ "node" , "dist/main"]