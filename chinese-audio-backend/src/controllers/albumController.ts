import { NextFunction, Request, Response } from "express";
import Album from "../models/album";
import { catchAsync } from "../utils/catchAsync";
import AppError from "../utils/appError";
import { ERROR_CODES } from "../constants/errorCodes";
import { isRequired } from "../utils/validationServices";
import { createImageData, deleteImageData, updateImageData } from "../services/imageService";
import Image from "../models/image";

const albumFilter = (album: any) => {
    const {Image, ...albumWithoutImage} = album.dataValues as any;
    return {
        ...albumWithoutImage,
        avatar: Image?.url || null
    }
}

export const getAllAlbums = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const limit = req.query?.limit ? parseInt(req.query.limit as string) : undefined;
    const page = req.query?.page ? parseInt(req.query.page as string) : undefined;

    const albums = await Album.findAll({
        limit: limit,
        offset: page && limit ? (page - 1) * limit : undefined,
        include: { model: Image, as: "Image" },
    });

    if (!albums) {
        return next(new AppError("Failed to get album list", 500));
    }

    res.status(200).json({
        status: "success",
        data: {
            total_albums: albums.length,
            page: page,
            limit: limit,
            albums: albums.map(albumFilter),
        },
    });
});

export const createAlbum = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { title, description, isPublic, releaseDate } = req.body;
    isRequired(title, "", "Title is required");

    const album = await Album.sequelize?.transaction(async (t) => {
        const newAlbum = await Album.create({
            title,
            description,
            isPublic: isPublic || false,
            releaseDate,
        }, {
            transaction: t
        })

        const file = req.file as Express.Multer.File | undefined;
        if (file) {
            await createImageData("Album", newAlbum.id, file);
        }

        return newAlbum;
    })

    const createdAlbum = await Album.findByPk(album?.id, {
        include: {model: Image, as: "Image"}
    })

    res.status(201).json({
        status: "success",
        data: { album: albumFilter(createdAlbum) },
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

export const updateAlbumById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const album = await Album.findByPk(req.params.id);
    if (!album) {
        return next(new AppError(ERROR_CODES.ALBUM.NOTFOUND));
    }

    const { title, description, isPublic, releaseDate } = req.body;

    isRequired(title, "", "Title is required");

    await updateImageData("Album", album.id, req.file);

    if (title) album.title = title;
    if (description) album.description = description;
    if (isPublic !== undefined) album.isPublic = isPublic;
    if (releaseDate) album.releaseDate = releaseDate;

    await album.save();

    const updatedAlbum = await Album.findByPk(req.params.id, { include: { model:Image, as: "Image"} });

    res.status(200).json({
        status: "success",
        data: {
            album: albumFilter(updatedAlbum),
        },
    });
});

export const deleteAlbum = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const albumId = req.params.id;

    const album = await Album.findByPk(albumId);
    if (!album) {
        return next(new AppError(`Album with id ${req.params.id} not found`, 404));
    }

    await deleteImageData("Album", album.id);

    await album.destroy();

    res.status(200).json({
        status: "success",
        data: null,
    });
});
