#!env bash

if [ ! -d node_modules ]; then
  npm install
fi

if [ ! `which forever` ]; then
  npm install -s nodemon
fi

nodemon $1
