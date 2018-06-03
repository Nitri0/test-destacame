FROM node:8.11-alpine as node-angular-cli

LABEL authors="John Papa"

RUN mkdir /code
WORKDIR /code
ADD . /code/

COPY entrypoint.sh /entrypoint.sh
COPY package.json /code
RUN chmod +x /entrypoint.sh



#Linux setup
RUN apk update \
  && apk add --update alpine-sdk \
  && apk del alpine-sdk \
  && rm -rf /tmp/* /var/cache/apk/* *.tar.gz ~/.npm \
  && npm cache verify \
  && sed -i -e "s/bin\/ash/bin\/sh/" /etc/passwd

#Angular CLI
RUN npm i npm@latest -g
RUN npm install -g @angular/cli
RUN npm install