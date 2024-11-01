import { NextFunction, Request, Response } from "express";

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.log("Welcome you guys come to error handler");
    return res.status(500).json({
        status: "error",
        message: err.message,
    });
};
