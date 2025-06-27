// Write generate token code using jwt 

import jwt from "jsonwebtoken";

export const generateToken = (id:string) => {
     return jwt.sign({id},process.env.JWT_SECRET_KEY!,{
          expiresIn:'7d'
     })
}