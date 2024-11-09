import { NextFunction, Request, Response } from "express";
import AlbumList from "../models/albumlist";
import { catchAsync } from "../utils/catchAsync";
import AppError from "../utils/appError";
import Album from "../models/album";

export const getAllAlbumLists = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const albumList = await AlbumList.findAll();
    // {
    //     include: {
    //         model: Album,
    //         through: {
    //             attributes: [],
    //         }
    //     }
    // }
    console.log(albumList);
    
    if (!albumList) {
        return next(new AppError("Failed to get album list", 500));
    }
   
    res.status(200).json({
        status: "success",
        data: {
            albumList,
        },
    })
})