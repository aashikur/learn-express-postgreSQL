// higher order function
// - return a function from a function

import { NextFunction, Request, Response } from "express"
import Jwt from "jsonwebtoken";
import { config } from "../config";


const auth = () => {
   return (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization;
      if (!token) {
         return res.status(500).json({
            message: "you are not allowed!"
         })
      }

      const decoded = Jwt
         .verify(token, config.jwtSecret as string);

      console.log("decoded:\n", decoded);

      return next();
   }
}


export default auth;