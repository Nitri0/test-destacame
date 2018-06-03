#!/bin/sh
npm i npm@latest -g
npm install
ng build --prod
exec "$@"