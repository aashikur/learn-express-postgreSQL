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