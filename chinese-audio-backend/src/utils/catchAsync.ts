import { NextFunction, Request, Response } from "express";

export const catchAsync = (fn: Function) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            fn(req, res, next);
        } catch (e: any) {
            next(e);
        }
    };
}