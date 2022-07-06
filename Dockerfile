FROM node:16-alpine

RUN mkdir -p /featuredTable

WORKDIR /featuredTable

COPY . ./

RUN npm install

CMD [ "sh", "-c", "/featuredTable/run.sh", "pro"]