FROM 280813755867.dkr.ecr.us-east-1.amazonaws.com/super-portal-base:node19alpine AS build

ARG SECRET_ID
ENV SECRET_ID=$SECRET_ID

WORKDIR /usr/src/app
RUN apk update
RUN apk add git curl wget vim openssh postgresql-client

COPY . .

RUN nvm install
RUN nvm use

RUN rm -f .env
RUN npm config set cache .npm-cache --global
RUN npm remove @swc/core-darwin-x64
RUN npm i -g @nestjs/cli
RUN npm i
RUN npm run build

FROM 280813755867.dkr.ecr.us-east-1.amazonaws.com/super-portal-base:node19alpine AS server-build

ARG SECRET_ID
ENV SECRET_ID=$SECRET_ID

COPY --from=280813755867.dkr.ecr.us-east-1.amazonaws.com/node-base-image:devopscorner-awscli /usr/local/aws-cli/ /usr/local/aws-cli/
COPY --from=280813755867.dkr.ecr.us-east-1.amazonaws.com/node-base-image:devopscorner-awscli /usr/local/bin/ /usr/local/bin/

WORKDIR /usr/src/app
RUN mkdir dist node_modules
COPY --from=build /usr/src/app/dist dist
COPY --from=build /usr/src/app/node_modules node_modules
COPY --from=build /usr/src/app/package.json .

RUN apk add jq bash

COPY get_secrets_and_start_app.sh .

RUN chmod +x get_secrets_and_start_app.sh

EXPOSE 3336

ENTRYPOINT [/bin/bash]
