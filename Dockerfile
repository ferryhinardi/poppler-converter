FROM node:14.1-alpine AS builder

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
