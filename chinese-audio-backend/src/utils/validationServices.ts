import { NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import AppError from "./appError";
import { ERROR_CODES } from "../constants/errorCodes";


export const isRequired = (key: any, keyName: string, messageCustom: string = "") => {
    if (!key) {
        throw new AppError(messageCustom.length === 0 ? `${keyName} is required` : messageCustom, StatusCodes.BAD_REQUEST);
    }
}

export const isNotFound = (key: any, keyName: string, messageCustom: string = "") => {
    if (!key) {
        throw new AppError(messageCustom.length === 0 ? `${keyName} not found` : messageCustom, StatusCodes.NOT_FOUND);
    }
}

export const isValidEmail = (email: string, messageCustom: string = "") => {
    if (email) {
        const re = /\S+@\S+\.\S+/;
        if (!re.test(email)) {
            throw new AppError(ERROR_CODES.USER.INVALID_EMAIL);
        }
    }
}