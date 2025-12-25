// higher order function
// - return a function from a function

import { NextFunction, Request, Response } from "express"
import Jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config";


const auth = (...roles : string[]) => {
   return (req: Request, res: Response, next: NextFunction) => {
      try {
      const token = req.headers.authorization;
      if (!token) {
         return res.status(500).json({
            message: "you are not allowed!"
         })
      }

      const decoded = Jwt
         .verify(token, config.jwtSecret as string)  as JwtPayload;

      console.log("decoded:\n", decoded);
      
      req.user = decoded; // User information in Request object

      // now we can access req.user in our controllers or other places to compare

      // ["admin"] => allow
      if( roles.length && !roles.includes(decoded.role as string) ) {
         return res.status(500).json({
            message: "unauthorized access!",
         })
      }

      return next();
      }
      catch(err) {
         res.status(500).json({
            message: "you are not allowed!"
         })
      }
   }
}


export default auth;