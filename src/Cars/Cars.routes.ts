import express from "express";
import {
  createCar,
  updateCar,
  deleteCar,
  getAllCars,
} from "../Cars/Cars.controllers";
import { Request, Response, NextFunction } from "express";
import { authMiddleware, AuthRequest } from "../middleware/auth.middleware";

const carRouter = express.Router();

carRouter.get("/", getAllCars);

carRouter.post(
  "/",
  authMiddleware as (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => void,
  createCar as (req: Request, res: Response, next: NextFunction) => void
);

carRouter.put(
  "/:id",
  authMiddleware as (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => void,
  updateCar as (req: Request, res: Response, next: NextFunction) => void
);
carRouter.delete(
  "/:id",
  authMiddleware as (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => void,
  deleteCar as (req: Request, res: Response, next: NextFunction) => void
);

export default carRouter;
