
import jwt from "jsonwebtoken";
import AppError from "./appError";
import { ERROR_CODES } from "../constants/errorCodes";

export const signToken = (id: any) => {
    if (!process.env.JWT_SECRET) {
        throw new AppError(ERROR_CODES.GENERAL.JWT_SECRET_NOT_DEFINED);
    }
    return jwt.sign({ id }, process.env.JWT_SECRET!, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
}

export const verifyToken = (token: string) => {
    if (!process.env.JWT_SECRET) {
        throw new AppError(ERROR_CODES.GENERAL.JWT_SECRET_NOT_DEFINED);
    }
    return jwt.verify(token, process.env.JWT_SECRET!);
}
