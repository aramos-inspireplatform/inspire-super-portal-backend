FROM 280813755867.dkr.ecr.us-east-1.amazonaws.com/super-portal-base:node19alpine

RUN apk --update add --no-cache git curl wget vim openssh

RUN npm config set cache .npm-cache --global

RUN npm i -g @nestjs/cli

RUN apk --update add postgresql-client

EXPOSE 3336
