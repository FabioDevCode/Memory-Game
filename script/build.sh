#!/bin/bash

mkdir dist
cd dist
mkdir assets
cd ../
cp index.html dist/index.html
cp assets/*.* ./dist/assets/
sass scss/style.scss:dist/css/style.css
npx tsc --project tsconfig.production.json