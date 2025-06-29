import express, { Router } from "express";

import { register,login,logout } from "./Users.controllers";
import { Request, Response, NextFunction } from "express";
import { authMiddleware, AuthRequest } from "../middleware/auth.middleware";

const userRouter:Router = express.Router();


userRouter.post(
  "/register",
  register as (req: Request, res: Response, next: NextFunction) => void
);
userRouter.post(
  "/login",
  login as (req: Request, res: Response, next: NextFunction) => void
);
userRouter.post(
  "/logout",
  authMiddleware as (req:Request, res:Response, next:NextFunction) => void,
  logout as (req: Request, res: Response, next: NextFunction) => void
);

export default userRouter