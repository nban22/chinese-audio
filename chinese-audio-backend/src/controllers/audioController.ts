import { NextFunction, Request, Response } from "express";
import Audio from "../models/audio";
import AppError from "../utils/appError";
import { StatusCodes } from "http-status-codes";
import { isRequired } from "../utils/isRequired";
import { deleteAudioFromDropbox, uploadAudioToDropbox } from "../services/dropboxServices";
import { catchAsync } from "../utils/catchAsync";
import * as mm from "music-metadata";

export const uploadAudio = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { title, description, isPublic } = req.body;
    isRequired(title, "title", next);
    isRequired(isPublic, "isPublic", next);
    isRequired(req.file, "audio", next, "audio file is required, with fieldname is audio");

    if (req.file!.mimetype !== "audio/mpeg" && req.file!.mimetype !== "audio/wav") {
        return next(new AppError("Only .mp3 and .wav format allowed!", StatusCodes.BAD_REQUEST));
    }
    const { buffer, ...fileWithoutBuffer } = req.file as Express.Multer.File;

    const dataFromDropboxAPI = await uploadAudioToDropbox(buffer, fileWithoutBuffer.originalname);

    const metadata = await mm.parseBuffer(buffer);

    if (!metadata.format.duration) {
        return next(new AppError("Can't get duration of audio file", StatusCodes.INTERNAL_SERVER_ERROR));
    }

    const audio = await Audio.create({
        title: title,
        description: description,
        isPublic: isPublic,
        originalFileName: fileWithoutBuffer.originalname,
        fileName: dataFromDropboxAPI.name || "",
        dropboxPath: dataFromDropboxAPI.path_display || "",
        size: dataFromDropboxAPI.size || 0,
        url: dataFromDropboxAPI.url || "",
        duration: metadata.format.duration,
    });

    res.status(201).json({
        status: "success",
        data: {
            auido: audio,
        },
    });
});

export const getAllAudios = async (req: Request, res: Response, next: NextFunction) => {
    const audios = await Audio.findAll();
    if (!audios) {
        return next(new AppError("Something wrong with DB or backend server", 500));
    }
    res.status(200).json({
        status: "success",
        data: {
            audios_total: audios.length,
            audios: audios,
        },
    });
};
export const getAudio = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const audio = await Audio.findByPk(id);
    if (!audio) {
        return next(new AppError(`audio with id:${id} param not found`, 400));
    }
    res.status(200).json({
        status: "success",
        data: {
            audio: audio,
        },
    });
};

export const deleteAudio = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const audio = await Audio.findByPk(id);
    if (!audio) {
        return next(new AppError(`audio with id:${id} not found`, 400));
    }
    const dataFromDropboxAPI = await deleteAudioFromDropbox(audio.dropboxPath);
    if (!dataFromDropboxAPI) {
        return next(new AppError("Can't delete audio from Dropbox", 500));
    }
    const num = await Audio.destroy({
        where: {
            id: id,
        },
    });
    if (num === 0) {
        return next(new AppError("Something wrong when delete a Audio", 400));
    }
    res.status(200).json({
        status: "success",
        data: {
            audio: null,
        },
    });
};
export const updateAudio = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const { title, description, isPublic } = req.body;

    const audio = await Audio.findByPk(id);
    if (!audio) {
        return next(new AppError(`audio with id:${id} not found`, 400));
    }

    await audio.update({ title, description, isPublic });

    res.status(200).json({
        status: "success",
        data: {
            audio: audio,
        },
    });
};
