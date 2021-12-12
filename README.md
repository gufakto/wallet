NODE DOCKER
=============
build image : docker build . -t node-server
run container : docker run -p 5000:5000 -d --name node-server-app node-server
login into container CLI : docker exec -it node-server-app bash

POSTGRES DOCKER
============
run postgress docker: docker run --name postgres-docker -e POSTGRES_PASSWORD=postgres -d -p 5432:5432 postgres


docker-compose
================
To simplify run this apps. Please make sure your local/server already installed docker and docker-compose.
If it's already installed, make sure that docker services running. Then Please follow bellow instruction:
1. Build images and run application: docker-compose up --build -d
2. To check all container run please execute this command in the terminal: docker ps 
3. run this command to migrate all table into database: docker exec test_server_1 npm run migrate
4. run the seed command to fill dummy data into database : docker exec test_server_1 npm run seed
5. To login into container database please execute this command :  docker exec -it test_db_1 psql -p 5432 -d postgres -U postgres
6. To loign into container node server please execute this command: docker exec -it test_server_1 bash
7. If these step already done please visit http://localhost:5000

(*Next TODO):
- Finish unit test
- Install and implement API Documentation tools (Swagger)
- Error Handler
- Authentication with jsonwebtoken