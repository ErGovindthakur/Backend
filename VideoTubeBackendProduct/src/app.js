import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";


dotenv.config()

const app = express();

app.use(cors({
     origin:process.env.CORS_ORIGIN,
     credentials:true
}))

// Middleware
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static("public"))
app.use(cookieParser());


// routes import
import userRouter from "./routes/user.routes.js"

// route declaration
app.use("/api/v1/users",userRouter);

// Error Handler Middleware

export default app;
