#!/bin/bash  
echo " [ - ] Building docker images with docker compose"

docker-compose build

echo " [ - ] Pushing docker images to remote repository"
docker-compose push

echo " [ - ] Applying kubernetes configuration"
kubectl apply -f k8s

