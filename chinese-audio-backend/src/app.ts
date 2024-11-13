import express, { NextFunction, Request, Response } from "express";

import { globalErrorHandler } from "./controllers/errorController";
import albumRouter from "./routers/albumRouter";
import morgan from "morgan";
import AppError from "./utils/appError";
import cors from "cors";
import albumListRouter from "./routers/albumListRouter";
import audioRouter from "./routers/audioRouter";



const app = express();

app.use(cors());

app.use(express.json());



app.use(morgan("dev"));

app.use('/api/v1/albums', albumRouter);
app.use('/api/v1/album-lists', albumListRouter);
app.use('/api/v1/audios', audioRouter);


app.all('*', (req: Request, res: Response, next: NextFunction) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
