import { NextFunction, Request, Response } from "express";
import AlbumList from "../models/albumlist";
import { catchAsync } from "../utils/catchAsync";
import AppError from "../utils/appError";
import Album from "../models/album";

export const getAllAlbumLists = catchAsync(async (req: Request, res: Response, next: NextFunction) => {    
    const albumLists = await AlbumList.findAll({
        include: {
            model: Album,
            as: "albums",
        },
    });

    if (!albumLists) {
        return next(new AppError("Failed to get album list", 500));
    }

    res.status(200).json({
        status: "success",
        data: {
            albumLists: albumLists,
        },
    });
});


export const getAlbumList = catchAsync(async (req: Request<{id:string}>, res: Response, next: NextFunction) => {
    const albumList = await AlbumList.findByPk(req.params.id, {
        include: {
            model: Album,
            as: "albums",
        },
    });

    if (!albumList) {
        return next(new AppError("Album list not found", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            albumList,
        },
    });
});