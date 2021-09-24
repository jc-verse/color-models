#!/bin/bash
yarn build
cd dist
cp ../package.json .
cp ../LICENSE .
cp ../README.md .
npm publish
