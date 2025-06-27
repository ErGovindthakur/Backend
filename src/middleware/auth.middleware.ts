// writing middleware for authentication
import { Request,Response,NextFunction } from "express"
import jwt from "jsonwebtoken";
import User from "../Users/Users.models";

export interface AuthRequest extends Request{
     user?:any
}

export const authMiddleware = async(req:AuthRequest,res:Response,next:NextFunction) => {
     const token = req.headers.authorization?.split(" ")[1];
     if(!token){
          return res.status(401).json({
               message:"Unauthorized user"
          })
     }

     try{
          const decoded = await jwt.verify(token,process.env.JWT_SECRET_KEY!) as {id:string}
          req.user = await User.findById(decoded.id).select("-password");
          next()
     }
     catch(err){
          res.status(401).json({message:"token invalid",success:false})
     }
}