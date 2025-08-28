import { Response } from "express";
import jwt from "jsonwebtoken";

export const generateToken = (res: Response, userId: string) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY!, {
    expiresIn: "7d",
  });

  // Set token in cookie
  res.cookie("jwt", token, {
    httpOnly: true,         // Prevent access via JS
    secure: process.env.NODE_ENV === "production", // HTTPS only in production
    sameSite: "strict",     // CSRF protection
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};
