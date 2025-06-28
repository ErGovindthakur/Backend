import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../Users/Users.models";

export interface AuthRequest extends Request {
  user?: any;
}

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as { id: string };
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) throw new Error("User not found");

    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
