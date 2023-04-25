FROM 280813755867.dkr.ecr.us-east-1.amazonaws.com/super-portal-base:node19alpine

ARG SECRET_ID
ENV SECRET_ID=$SECRET_ID

COPY --from=280813755867.dkr.ecr.us-east-1.amazonaws.com/node-base-image:devopscorner-awscli /usr/local/aws-cli/ /usr/local/aws-cli/
COPY --from=280813755867.dkr.ecr.us-east-1.amazonaws.com/node-base-image:devopscorner-awscli /usr/local/bin/ /usr/local/bin/

RUN apk --update add --no-cache git curl wget vim openssh

RUN npm config set cache .npm-cache --global

RUN npm i -g @nestjs/cli

RUN npm rum migration:run

RUN apk --update add postgresql-client

RUN apk add jq bash

COPY get_secrets_and_start_app.sh .

RUN chmod +x get_secrets_and_start_app.sh

RUN nvm install

RUN nvm use

EXPOSE 3336

ENTRYPOINT [/bin/bash]
