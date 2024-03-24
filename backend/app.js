import express from "express";
import userRouter from "./routes/userRouter.js";
import { errorHandling } from "./middlewares/errorHandler.js";
import cookieParser from "cookie-parser";
import cors from "cors";

export const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/user", userRouter);
app.use(errorHandling);
