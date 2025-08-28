import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorMiddleware } from "./middleware/error.middleware";
import userRouter from "./Users/Users.routes";
import carRouter from "./Cars/Cars.routes";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser())

app.use("/api/auth", userRouter);
app.use("/api/cars", carRouter);

app.use(errorMiddleware);

export default app;
