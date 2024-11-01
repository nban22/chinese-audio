import { Request, Response } from "express";

import db from "../models/index.js";

export const createNewUser = async (req: Request, res: Response) => {
    try {
        const jane = await db.User.create({
            name: "Jane",
            username: "janedoe",
            password: "password",
        });
        console.log("Jane's auto-generated ID:", jane.id);
        return res.status(200).json({
            status: "success",
            data: jane,
        });
    } catch (e: any) {
        return res.status(400).json({
            status: "fail",
            message: e,
        });
    }
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await db.User.findAll();
        return res.status(200).json({
            status: "success",
            data: users,
        })
    } catch (e: any) {
        return res.status(400).json({
            status: "fail",
            message: e,
        });
    }
};

export const getUser = async (req: Request<{ id: string }>, res: Response) => {
    try {
        return res.status(200).json({
            status: "success",
            message: "Get user successfully",
        });
    } catch (e: any) {
        return res.status(400).json({
            status: "fail",
            message: e,
        });
    }
};

export const deleteUser = async (req: Request<{ id: string }>, res: Response) => {
    try {
        return res.status(200).json({
            status: "success",
            message: "Delete user successfully",
        });
    } catch (e: any) {
        return res.status(400).json({
            status: "fail",
            message: e.message,
        });
    }
};
