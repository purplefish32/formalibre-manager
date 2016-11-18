# First setup

## requierment
 - docker-compose 1.8.0 minimum


## setup

docker-compose up -d
docker-compose exec api composer install
docker-compose exec backend bash -c 'composer install; bin/console doctrine:schema:create; bin/console doctrine:schema:update --force'
docker-compose exec api  bash -c "chmod 777 var/cache var/logs var -R"
docker-compose exec backend  bash -c "chmod 777 var/cache var/logs var -R"


docker exec -i -t [api_machine_name] composer install
docker exec -i -t [backend_machine_name] bash -c 'composer install; bin/console doctrine:schema:create; bin/console doctrine:schema:update --force'

sudo chmod 777 files/* -R

# Regular startup

docker-compose up

# After modification...

## clear the cache :

docker exec -it --user www-data [api_machine_name] rm var/cache/* -rf
docker exec -it --user www-data [backend_machine_name] php bin/console cache:clear --env=prod

docker exec -i -t nlkofmdev_backend_1 rm var/cache -R
docker exec -i -t nlkofmdev_api_1 rm var/cache -R

## Regenerate html files :

* on console 1
cd config/wesh
typings install --global node core-js --source dt --save
npm install
tsc

* on console2
cd config/wesh/app
nodemon main.js
