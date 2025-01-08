import { NextFunction, Request, Response } from "express";

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    err.errorCode = err.errorCode || "0";
    return res.status(err.statusCode).json({
        status: err.status,
        errorCode: err.errorCode,
        message: err.message,
        error: err,
        // stack: err.stack,
    });
};