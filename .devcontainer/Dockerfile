FROM node:19-alpine

RUN apk --update add --no-cache zsh zsh-vcs git curl wget vim openssh

ENV HOME=/home/node
ENV APP=${HOME}/app
ENV ZSH_CUSTOM=${HOME}/.oh-my-zsh

WORKDIR ${HOME}

USER root

RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)" && \
  git clone https://github.com/denysdovhan/spaceship-prompt.git "${ZSH_CUSTOM}/themes/spaceship-prompt" && \
  ln -s "${ZSH_CUSTOM}/themes/spaceship-prompt/spaceship.zsh-theme" "${ZSH_CUSTOM}/themes/spaceship.zsh-theme" && \
  git clone https://github.com/zsh-users/zsh-syntax-highlighting "${ZSH_CUSTOM}/plugins/zsh-syntax-highlighting" && \
  git clone https://github.com/zsh-users/zsh-syntax-highlighting "${HOME}/zsh-syntax-highlighting" && \
  git clone https://github.com/zsh-users/zsh-completions "${ZSH_CUSTOM}/plugins/zsh-completions" && \
  git clone https://github.com/zsh-users/zsh-autosuggestions "${ZSH_CUSTOM}/plugins/zsh-autosuggestions"

COPY ./terminal/.zshrc ${HOME}/.zshrc

RUN npm config set cache ${APP}/.npm-cache --global

RUN npm i -g @nestjs/cli

RUN apk --update add postgresql-client

WORKDIR ${APP}

EXPOSE 3336
