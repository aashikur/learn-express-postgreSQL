## then 
create auth post 
login 
  username: testuser 
  password: testpass 
end

## then
jsonwebtoken
import => type -> install jsonwebtoken type 
auth - login with bcrypt and jsonwebtoken
higher order function


## middleware for auth with jwt
I Think - Middleware just a Function that runs before the actual request handler. 

that function take some parameters like req, res, next and Act accordingly. 


Let's create a middleware for auth with check the jwt token request form header.



Setting Auth Middleware - JWT secrit in Header
 and Decoded console.log
```
 Now create a Type declaration for payload Name must me "name.d.ts"
```


 ## payload set in req.user
now lets set role based access control
so need to drop all the users table and create again with role column. 


now added role to the token payload.
and need to login again and set the token to headers to see the payload in console update.
## role based access control middleware
Now create a role based access control middleware to check the user role before accessing the route.


## Created app.ts and server.ts file for better structure


## Software design pattern used:
Interface | Routes | (M)odels | (V)iews | (C)ontrollers 
=> MVC Pattern

## We Used Modular Structure for better code management.

 -> Student Files 
   - interface.ts
   - student.model.ts
   - student.routes.ts
   - student.controller.ts
   - student.service.ts
  

  fate module thin controller


## Official Documentation (Essential)
```
- Express.js: https://expressjs.com/
- PostgreSQL: https://www.postgresql.org/docs/
- Node.js: https://nodejs.org/docs/
```