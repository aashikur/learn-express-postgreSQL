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

 Now create a Type declaration for payload Name must me "name.d.ts"



 ## payload set in req.user
now lets set role based access control
so need to drop all the users table and create again with role column. 


now added role to the token payload.
and need to login again and set the token to headers to see the payload in console update.
## role based access control middleware
Now create a role based access control middleware to check the user role before accessing the route.