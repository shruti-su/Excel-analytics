# React-project

# Copy .env from .env.docker

  `cp client/.env.docker client/.env && cp server/.env.docker server/.env`

# Docker 
# install docker 
https://www.docker.com/

# for windows 
* first install wls 
  =
  ` wsl --install -d ubuntu`
  ` wsl --update`
* build 
  =
  `docker compose build`
* run 
  =
  `docker compose up -d`
* stop 
  =
  `docker compose down -v`
* start only frontend 
  =
  `docker compose up -d client`
* start only backend 
  =
  `docker compose up -d server`

# react running on
http://localhost:5173/
# server running on 
http://localhost:5000/
