import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import AppError from "../utils/appError";
import { StatusCodes } from "http-status-codes";
import { verifyToken } from "../utils/tokenServices";
import User from "../models/user";
import { ERROR_CODES } from "../constants/errorCodes";

type Role = "admin" | "user";

export const authorizeJWT = (roles?: Role[]) =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        if (!roles) roles = ["admin", "user"];

        if (!req.header("Authorization")) {
            return next(new AppError(ERROR_CODES.USER.NOT_LOGGED_IN));
        }

        if (!req.header("Authorization")?.startsWith("Bearer ")) {
            return next(new AppError(ERROR_CODES.USER.INVALID_TOKEN));
        }

        const token = req.header("Authorization")?.replace("Bearer ", "");

        if (!token || token.length < 10) {
            return next(new AppError(ERROR_CODES.USER.INVALID_TOKEN));
        }

        // Verify token
        let decoded;
        try {
            decoded = verifyToken(token);
        } catch (error: any) {
            if (error.name === "TokenExpiredError") {
                return next(new AppError(ERROR_CODES.USER.JWT_EXPIRED));
            } else {
                return next(new AppError(ERROR_CODES.USER.INVALID_TOKEN));
            }
        }
        const id = (decoded as any).id;

        const user = await User.findByPk(id);

        if (!user) {
            return next(new AppError(ERROR_CODES.USER.USER_NOT_FOUND));
        }

        if (!roles.includes(user.role as Role)) {
            return next(new AppError(ERROR_CODES.USER.PERMISSION_DENIED));
        }

        req.user = user;
        next();
    });
