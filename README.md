# First server_with_express
============================
part 1: Setting up a basic Express server with TypeScript

```
npm init -y
npm install express --save 
npm i -D typescript
npx tsc --init
npm i --save-dev @types/node

```

to run with ts without js 

```
npm i -D tsx
example:
npx tsx src/server.ts

```
add a 'dev' script to package.json
It will watch for changes and restart the server automatically

```
"scripts": {
    "dev": "npx tsx watch src/server.ts"
  },
```


part 2: postgreSQL + neon
npm i pg
neon server -> connection string with Pool form pg with connectionString (how to connect)

created users and todo data table in neon

part 3: Environment Variables
npm i dotenv
create .env file and add connection string there and added dotenv.config() in server.ts


part 4: CRUD operations with express and postgreSQL
GET /users
GET /users/:id
POST /users
PUT /users/:id
DELETE /users/:id
part 5: Error handling and 404 route
Added 404 route at the end of all routes in server.ts

part 6: Middleware for logging
Created a simple logger middleware that logs the method, path, and timestamp of each request to 

todos 
get all todos
get todo by id
create todo
update todo
delete todo

total learning time: ~4-5 hours this from scratch to this point

Next steps:
convert to -> modular pattern