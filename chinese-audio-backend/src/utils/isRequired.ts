import { NextFunction } from "express";
import AppError from "./appError";
import { StatusCodes } from "http-status-codes";

export const isRequired = (key: any, keyName: string, next: NextFunction, messageCustom: string = "") => {
    if (!key) {
        return next(new AppError(messageCustom.length !== 0 ? `${keyName} is required` : messageCustom, StatusCodes.BAD_REQUEST));
    }
}