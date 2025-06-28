import { NextFunction, Request, Response } from "express";
import UserModel from "./Users.models";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateTokens";

// REGISTER
export const register = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existsUser = await UserModel.findOne({ email });
    if (existsUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists, please login",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    generateToken(res, user.id); // set cookie

    return res.status(201).json({
      success: true,
      _id: user._id,
      name: user.name,
      email: user.email,
      message: "Registered successfully",
    });
  } catch (err) {
     next(err)
//     return res.status(500).json({
//       success: false,
//       message: err instanceof Error ? err.message : "Error while registering",
//     });
  }
};

// LOGIN
export const login = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await UserModel.findOne({ email });
    const isMatch = user && (await bcrypt.compare(password, user.password));

    if (!user || !isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    generateToken(res, user.id); // set cookie

    return res.status(200).json({
      success: true,
      _id: user._id,
      name: user.name,
      email: user.email,
      message: "Login successful",
    });
  } catch (err) {
     next(err)
//     return res.status(500).json({
//       success: false,
//       message: err instanceof Error ? err.message : "Error while logging in",
//     });
  }
};

// LOGOUT
export const logout = (req: Request, res: Response,next:NextFunction) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
     next(err)
//     return res.status(500).json({
//       success: false,
//       message: err instanceof Error ? err.message : "Error during logout",
//     });
  }
};
