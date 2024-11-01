import express, { NextFunction, Request, Response } from "express";
import userRouter from "./routers/userRouter.js";
import { globalErrorHandler } from "./controllers/errorController.js";

const app = express();

app.use(express.json());

// Config Router
app.use("/api/v1/users", userRouter);



app.use(globalErrorHandler);

export default app;
