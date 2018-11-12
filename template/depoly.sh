#!/bin/bash

set -r
if [[ "$1" == "-i" ]]; then
  echo -e "\n\033[41;37m Install dependence:\033[0m\n "
  docker-compose run --rm deploy npm install
  if [[ "$?" == 1 ]]; then
    echo -e "\t\033[31m Error in npm install, pleace check your package.json\n\033[0m"
    exit 1
  fi
fi;

echo -e "\n\n\033[41;37m Build... :\033[0m\n "
docker-compose run --rm deploy npm run build
if [[ "$?" == 1 ]]; then
  echo -e "\t\033[31m Error in npm run build \n\033[0m"
  exit 1
else
  echo -e "\033[32mBuild Success \033[0m\n"
fi

exit $?
