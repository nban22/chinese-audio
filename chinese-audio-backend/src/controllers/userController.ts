import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import User from "../models/user";

const userFiltered = (user: any) => {
    return {
        id: user.id || null,
        username: user.username || null,
        email: user.email || null,
        role: user.role || null,
        avatar: user.avatar || null,
    };
}


export const getUserList = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const users = await User.findAll();

    res.status(200).json({
        status: "success",
        data: {
            total_users: users.length,
            users: users.map(userFiltered),
        },
    });
})