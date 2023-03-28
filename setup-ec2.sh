#!/bin/sh

sudo amazon-linux-extras install docker -y
sudo curl -L https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo service docker start 
sudo usermod -a -G docker ec2-user

# scp  -i "personal_project.pem" ./run-compose-prod.sh ./docker-compose.prod.yml ec2-user@ec2-44-195-22-5.compute-1.amazonaws.com:/home/ec2-user