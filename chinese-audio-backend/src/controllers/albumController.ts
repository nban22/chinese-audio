import { NextFunction, Request, Response } from "express";
import Album from "../models/album";
import { catchAsync } from "../utils/catchAsync";
import AppError from "../utils/appError";

export const getAlbums = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const albums = await Album.findAll();

    if (!albums) {
        return next(new AppError("Failed to get albums", 500));
    }

    res.status(200).json({
        status: "success",
        data: {
            albums,
        },
    });
});

export const createAlbum = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { title, description, isPublic, avatar, releaseDate } = req.body;
    
    if (!title) {
        return next(new AppError("Title is required", 400));
    }
    
    const album = await Album.create({ title, description, isPublic, avatar, releaseDate });

    if (!album) {
        return next(new AppError("Failed to create album", 500));
    }

    res.status(201).json({
        status: "success",
        data: {
            album,
        },
    });
});

export const getAlbum = catchAsync(async (req: Request<{id:string}>, res: Response, next: NextFunction) => {
    const album = await Album.findByPk(req.params.id);
    if (!album) {
        return next(new AppError("Album not found", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            album,
        },
    })
})

export const updateAlbum = catchAsync(async (req: Request<{id:string}>, res: Response, next: NextFunction) => {
    const album = await Album.findByPk(req.params.id);
    if (!album) {
        return next(new AppError("Album not found", 404));
    }

    const { title, description, isPublic, avatar, releaseDate } = req.body;
    if (title) {
        album.title = title;
    }
    if (description) {
        album.description = description;
    }
    if (isPublic) {
        album.isPublic = isPublic;
    }
    if (avatar) {
        album.avatar = avatar;
    }
    if (releaseDate) {
        album.releaseDate = releaseDate;
    }

    await album.save();

    res.status(200).json({
        status: "success",
        data: {
            album,
        },
    })
})