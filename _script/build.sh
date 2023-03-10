#!/bin/bash

mkdir dist
cd dist
mkdir assets
mkdir data
cd ../
cp index.html dist/index.html
cp -r ./assets ./dist
cp data/data.json ./dist/data/
sass scss/style.scss:dist/css/style.css --style compressed
npx tsc --project tsconfig.config.json