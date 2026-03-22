 - To run the server execute
 ```
 npm run dev
 ```

You  can use npx nodemon src/index.js to start the node server.
Also you can use npm run dev to start the node server.
If you have higher version of node then you can use node --watch to start the server.

auther git repo
https://github.com/singhsanket143/Base-Node-Project-Template.git


To initiliaze sequelize run this command inside `src` folder
        npx sequelize init

To see sequelize command search `sequelise cli` in google

To create database specified by config file use this command `npx sequelize db:create`

To create modal use this commands `npx sequelize model:generate --name Airplane --attributes modelNumber:string, capacity:integer`

To migrate migration use this command `npx sequelize db:migrate`

To undo use this `npx sequelize db:migrate:undo`

To create seed file use this command `npx sequelize seed:generate --name add-airplanes`
After entry all the data in seed file you can use this command to insert in db `npx sequelize db:seed:all`

To seed particular seed file use this command `sequelize db:seed seed my_seeder_file.js`

IMPORTANT CONCEPT-----------------------------------------------

----------------------------------------------------------------------
id Error	                                When it happens
----------------------------------------------------------------------
1  SequelizeValidationError	                Model validation fails
2  SequelizeUniqueConstraintError	        Unique column duplicate
3  SequelizeForeignKeyConstraintError	        Foreign key invalid
4  SequelizeDatabaseError	                Database rejects query

`How to implements validation logic`

<https://gemini.google.com/app/7559941cea834a41>

<https://oneuptime.com/blog/post/2026-02-02-express-validator-input-validation/view#:~:text=withMessage('Quantity%20must%20be%20at,const%20listProductsValidation%20=%20%5B%20//%20Validate%20?>

`how to set association with table`

<https://chatgpt.com/c/69b8284d-da7c-83aa-97ac-08ae707fe644>

`Pessimistic Lock / Exclusive Lock`

<https://gemini.google.com/app/85911f0e96822247>

`For time related issue`

<https://chatgpt.com/c/69ba4dd8-7910-8324-a475-9bc89ff3d93d>

`JS Date object concepts`

<https://chatgpt.com/c/69bd3258-c384-8323-ba03-2b4038d3f6fa>

`File uplaod using multer in api`

<https://chatgpt.com/c/69bed342-0798-8322-9e44-b58ba6d77391>