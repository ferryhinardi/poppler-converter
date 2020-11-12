FROM python3.7-nodejs12-alpine AS builder

RUN apt-get update
RUN apt-get install poppler-utils -y
RUN virtualenv -p python3.7 /env

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn

ENV PATH="./node_modules/.bin:$PATH"

# add app
COPY . ./

# buld
RUN yarn build

# start app
CMD ["npm", "start"]
