NODE DOCKER
=============
build image : docker build . -t node-server
run container : docker run -p 5000:5000 -d --name node-server-app node-server
login into container CLI : docker exec -it node-server-app bash

POSTGRES 
============
run postgress docker: docker run --name postgres-docker -e POSTGRES_PASSWORD=postgres -d -p 5432:5432 postgres


docker-compose
================
1. run applikasi: docker-compose up --build -d
2. To check all container run please execute this command in the terminal: docker ps 
3. run this command to migrate all table into database: docker exec test_server_1 npm run migrate
4. run the seed command to fill dummy data into database : docker exec test_server_1 npm run seed
5. To login into container database please execute this command :  docker exec -it test_db_1 psql -p 5432 -d postgres -U postgres
6. To loign into container node server please execute this command: docker exec -it test_server_1 bash
