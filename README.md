NODE DOCKER (Optional)
=============
build image : docker build . -t node-server
run container : docker run -p 5000:5000 -d --name node-server-app node-server
login into container CLI : docker exec -it node-server-app bash

POSTGRES DOCKER (Optional)
============
run postgress docker: docker run --name postgres-docker -e POSTGRES_PASSWORD=postgres -d -p 5432:5432 postgres


docker-compose
================
To simplify run this apps. Please make sure your local/server already installed docker and docker-compose.
If it's already installed, make sure that docker services running. Then Please follow bellow instruction:
1. Enter into the pproject folder from your terminal using cd command 
2. Build and run application images containers with: docker-compose up --build -d
3. To check all running container, please execute this command in the terminal: docker ps 
4. Run this command to migrate all table into database: docker exec test_server_1 npm run migrate
5. Run the seed command to fill dummy data into database : docker exec test_server_1 npm run seed (Optional) 
6. To login into container database please execute this command :  docker exec -it test_db_1 psql -p 5432 -d postgres -U postgres (Optional) 
7. To loign into container node server please execute this command: docker exec -it test_server_1 bash (Optional) 
8. If these step already done please visit http://localhost:5000

End Point
================
- /user => register users with POST body: [username]
- /topup => topup with POST headers: [Authorization: token] body: [amount]
- /balance => Read Balance with GET headers[Authorization: token]
- /transfer => Transfer amount with POST headers[Authorization: token] body[to_username, amount]
- /top_transactions_per_user => Get the biggest amount with GET headers[Authorization: token]
- /top_users => get the biggest transaction from users with GET headers[Authorization: token]

(*Nb):
- test_server_1 is the name of node js container exp: if we run in the terminal docker ps it will show the running containers 

(*Next TODO):
- Finish unit test
- Install and implement API Documentation tools (Swagger)
- Error Handler
- Authentication with jsonwebtoken