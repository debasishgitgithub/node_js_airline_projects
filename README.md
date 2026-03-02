You  can use npx nodemon src/index.js to start the node server.
Also you can use npm run dev to start the node server.
If you have higher version of node then you can use node --watch to start the server.

auther git repo
https://github.com/singhsanket143/Base-Node-Project-Template.git


To initiliaze sequelize run this command
        npx sequelize init

To see sequelize command search "sequelise cli" in google
To create database specified by config file use this command "npx sequelize db:create"
To create modal use this commands "npx sequelize model:generate --name Airplane --attributes modelNumber:string, capacity:integer"
To migrate migration use this command "npx sequelize db:migrate"
To undo use this "npx sequelize db: migrate: undo"