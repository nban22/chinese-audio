import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import AppError from "../utils/appError";
import { StatusCodes } from "http-status-codes";
import { isNotFound, isValidEmail } from "../utils/validationServices";
import User from "../models/user";
import { signToken } from "../utils/tokenServices";
import { ERROR_CODES } from "../constants/errorCodes";

export const getMe = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as User;

    const userFiltered = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
    }
    
    return res.status(StatusCodes.OK).json({
        status: "success",
        data: {
            user: userFiltered,
        },
    });
});

export const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError(ERROR_CODES.USER.MISSING_CREDENTIALS));
    }

    isValidEmail(email);

    const existingUser = await User.findOne({ where: { email } });

    if (!existingUser) {
        return next(new AppError(ERROR_CODES.USER.USER_NOT_FOUND));
    }

    const isMatch = await existingUser!.correctPassword(password);

    if (!isMatch) {
        return next(new AppError(ERROR_CODES.USER.INCORRECT_PASSWORD));
    }

    const token = signToken(existingUser!.id);

    res.status(StatusCodes.OK).json({
        status: "success",
        data: {
            user: req.user,
            token,
        },
    });
});

export const logout = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    res.status(StatusCodes.OK).json({
        status: "success",
    });
});

export const signup = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body;

    if (!email || !password) {
        return next(new AppError(ERROR_CODES.USER.MISSING_CREDENTIALS));
    }

    isValidEmail(email);

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
        return next(new AppError(ERROR_CODES.USER.USER_ALREADY_EXISTS));
    }

    const newUser = await User.create({ email, password, username: username || email.split("@")[0] });

    res.status(StatusCodes.CREATED).json({
        status: "success",
        data: {
            user: newUser,
        },
    });
});
