#!/bin/zsh

if [ ! -f ".env" ]; then
    cp .env.example .env
fi

npm install
## npm run migration-dev:run
while sleep 1000; do :; done
