FROM nikolaik/python-nodejs:latest AS builder

RUN apt-get update
RUN apt-get install poppler-utils -y
RUN virtualenv -p python3.7 /env
# RUN ls /usr/bin/

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn

ENV PATH="./node_modules/.bin:$PATH"

# add app
COPY . ./

# buld
RUN yarn build

ENV POPPLER_PATH="/usr/bin/"
# start app
CMD ["npm", "start"]
