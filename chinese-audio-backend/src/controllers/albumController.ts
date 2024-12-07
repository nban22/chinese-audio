import { NextFunction, Request, Response } from "express";
import Album from "../models/album";
import { catchAsync } from "../utils/catchAsync";
import AppError from "../utils/appError";

export const getAllAlbums = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const limit = req.query?.limit ? parseInt(req.query.limit as string) : undefined;
    const page = req.query?.page ? parseInt(req.query.page as string) : undefined;

    const albums = await Album.findAll({
        limit: limit,
        offset: page && limit ? (page - 1) * limit : undefined,
    });

    if (!albums) {
        return next(new AppError("Failed to get album list", 500));
    }

    res.status(200).json({
        status: "success",
        data: {
            albums: albums,
            total_albums: albums.length,
            page: page,
            limit: limit,
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

export const getAlbumById = catchAsync(async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const album = await Album.findByPk(req.params.id, {
        include: ["audios"],
    });

    if (!album) {
        return next(new AppError("Album not found", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            album,
        },
    });
});

export const updateAlbum = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
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
    });
});
