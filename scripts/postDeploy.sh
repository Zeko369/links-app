#!/bin/sh

export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

cp ~/links-app/.env .env

yarn
yarn build

git checkout yarn.lock

pm2 reload ecosystem.config.js --env production
