#!/bin/bash

##############################
# This builds and pushes both the nginx/React image
# and the DRF one.  
#
# The nginx/React image gets built with an environment variable
# that sets the url of the DRF backend REACT_APP_BASE_URL.  Once you
# know the IP address of your EC2 instance, you would pass that in
# instead of localhost
##############################

BASE_URL=$1
NEW_VERSION=$2
# ./build-and-push-images.sh 44.195.22.5 1.0.0
# pass these in as parameters in the run command, use the url from the ec2 instance

docker buildx build --platform linux/amd64 --build-arg REACT_APP_BASE_URL=$BASE_URL -t tiffanyjoelle/group-webserver-prod:$NEW_VERSION -f webserver/Dockerfile . --no-cache
docker push tiffanyjoelle/group-webserver-prod:$NEW_VERSION
#webserver-prod is whatever name we want, but it has to match the compose image name

docker buildx build --platform linux/amd64  -t tiffanyjoelle/group-backend-prod:$NEW_VERSION -f backend/Dockerfile ./backend --no-cache
docker push tiffanyjoelle/group-backend-prod:$NEW_VERSION