#!/bin/zsh

if [ ! -f ".env" ]; then
    cp .env.example .env
fi

npm install
while sleep 1000; do :; done
