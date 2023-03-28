#!/bin/sh

# These environment variables come from command line arguments.
# They are consumed by the docker-compose file.
export SECRET_KEY=$1
export DEBUG=$3
export NEW_VERSION=$4

docker-compose -f docker-compose.prod.yml build --no-cache
docker-compose -f docker-compose.prod.yml up -d