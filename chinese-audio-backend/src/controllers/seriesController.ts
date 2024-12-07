import { NextFunction, Request, Response } from "express";
import AlbumList from "../models/series";
import { catchAsync } from "../utils/catchAsync";
import AppError from "../utils/appError";
import Album from "../models/album";

export const getSeriesList = catchAsync(async (req: Request, res: Response, next: NextFunction) => {    
    const series = await AlbumList.findAll({
        include: {
            model: Album,
            as: "albums",
        },
    });

    if (!series) {
        return next(new AppError("Failed to get album list", 500));
    }

    res.status(200).json({
        status: "success",
        data: {
            series: series,
        },
    });
});


export const getSeriesById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
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