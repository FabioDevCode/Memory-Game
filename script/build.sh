#!/bin/bash

mkdir dist
cd dist
mkdir assets
mkdir data
cd ../
cp index.html dist/index.html
cp assets/*.* ./dist/assets/
cp data/data.json ./dist/data/
sass scss/style.scss:dist/css/style.css --style compressed
npx tsc --project tsconfig.production.json
cd dist
esbuild app.js --minify --allow-overwrite --outfile=app.js
cd css
rm style.css.map