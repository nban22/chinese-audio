import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";

import AppError from "./utils/appError";
import { globalErrorHandler } from "./controllers/errorController";
import albumRouter from "./routers/albumRouter";
import seriesRouter from "./routers/seriesRouter";
import audioRouter from "./routers/audioRouter";
import authRouter from "./routers/authRouter";
import userRouter from "./routers/userRouter";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/albums", albumRouter);
app.use("/api/v1/series", seriesRouter);
app.use("/api/v1/audios", audioRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
    next(new AppError(`Can't find ${req.originalUrl} with ${req.method} method on this server!`, 404));
});
app.use(globalErrorHandler);

export default app;
