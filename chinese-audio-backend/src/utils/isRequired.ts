import { NextFunction } from "express";
import AppError from "./appError";
import { StatusCodes } from "http-status-codes";

export const isRequired = (key: any, keyName: string, messageCustom: string = "") => {
    if (!key) {
        throw new AppError(messageCustom.length === 0 ? `${keyName} is required` : messageCustom, StatusCodes.BAD_REQUEST);
    }
}