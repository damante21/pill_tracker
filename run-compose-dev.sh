#!/bin/bash

# These environment variables are consumed by the docker-compose file.
export SECRET_KEY=abc123
export DEBUG=True

docker-compose -f docker-compose.dev.yml up -d --build