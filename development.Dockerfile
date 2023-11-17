# syntax=docker/dockerfile:1
FROM node:lts-alpine AS base

RUN \
  --mount=type=cache,target=/var/cache/apk -- \
  apk -U upgrade && \
  apk add --no-cache \
  shadow \
  coreutils \
  make \
  jq \
  yarn \
  git \
  curl \
  zsh \
  zsh-vcs \
  openssh \
  postgresql13-client \
  sudo \
  bash

ENV ZSH_CUSTOM=${HOME}/.oh-my-zsh

ENV HOME=/home/node
WORKDIR ${HOME}

RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)" && \
  git clone https://github.com/denysdovhan/spaceship-prompt.git "${ZSH_CUSTOM}/themes/spaceship-prompt" && \
  ln -s "${ZSH_CUSTOM}/themes/spaceship-prompt/spaceship.zsh-theme" "${ZSH_CUSTOM}/themes/spaceship.zsh-theme" && \
  git clone https://github.com/zsh-users/zsh-syntax-highlighting "${ZSH_CUSTOM}/plugins/zsh-syntax-highlighting" && \
  git clone https://github.com/zsh-users/zsh-syntax-highlighting "${HOME}/zsh-syntax-highlighting" && \
  git clone https://github.com/zsh-users/zsh-completions "${ZSH_CUSTOM}/plugins/zsh-completions" && \
  git clone https://github.com/zsh-users/zsh-autosuggestions "${ZSH_CUSTOM}/plugins/zsh-autosuggestions"

RUN \
  echo "node ALL=(ALL) ALL" > /etc/sudoers.d/node && \
  chmod 0440 /etc/sudoers.d/node && \
  echo 'node:123456' | chpasswd

# >>>>>>>>>>>>>>>> STAGE 1 [BASE] <<<<<<<<<<<<<<<<<<

FROM base AS environment

WORKDIR /home/node

RUN \
  mkdir -p /home/node/app && \
  mkdir -p /home/node/.antigen && \
  chown -R 1000:1000 /home/node

# >>>>>>>>>>>>>>>> STAGE 2 [ENVIRONMENT] <<<<<<<<<<<<<<<<<<

FROM environment AS development
WORKDIR /home/node/app

USER node

ARG DEV_CONTAINER
ARG GIT_USER_EMAIL
ARG GIT_USER_NAME
ARG NODE_ENV=development

ENV NODE_ENV=${NODE_ENV}
ENV DEV_CONTAINER=${DEV_CONTAINER}
ENV GIT_USER_NAME=${GIT_USER_NAME}
ENV GIT_USER_EMAIL=${GIT_USER_EMAIL}

RUN [ -n "$GIT_USER_EMAIL" ] && git config --global user.email "${GIT_USER_EMAIL}" || echo ""
RUN [ -n "$GIT_USER_NAME" ] && git config --global user.name "${GIT_USER_NAME}" || echo ""

RUN git config --global --add safe.directory .

RUN echo "->> Setting up the development environment. "
