import { NextFunction, Request, Response } from "express";
import Audio from "../models/audio";
import AppError from "../utils/appError";
import { StatusCodes } from "http-status-codes";
import { isRequired } from "../utils/isRequired";
import { fetchUploadAudio, getAccessToken, uploadAudioToDropbox } from "../services/dropboxAPIServices";

export const getAllAudios = async (req: Request, res: Response, next: NextFunction) => {
    const audios = await Audio.findAll();
    if (!audios) {
        return next(new AppError("Something wrong with DB or backend server", 500));
    }
    res.status(200).json({
        status: "success",
        data: {
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
export const uploadAudio = async (req: Request, res: Response, next: NextFunction) => {
    const { title, description, isPublic } = req.body;

    isRequired(title, "title", next);
    isRequired(isPublic, "isPublic", next);
    isRequired(req.file, "audio", next, "audio file is required, with fieldname is audio");

    if (req.file!.mimetype !== "audio/mpeg" && req.file!.mimetype !== "audio/wav") {
        return next(new AppError("Only .mp3 and .wav format allowed!", StatusCodes.BAD_REQUEST));
    }
    const { buffer, ...fileWithoutBuffer } = req.file as Express.Multer.File;

    const dataFromDropboxAPI = await uploadAudioToDropbox(buffer);
    console.log({dataFromDropboxAPI});

    const audio = await Audio.create({
        title: title,
        description: description,
        isPublic: isPublic,
        originalFileName: fileWithoutBuffer.originalname,
        fileName: fileWithoutBuffer.originalname,
        size: fileWithoutBuffer.size || 0,
        url: fileWithoutBuffer.path || "",
    })
    
    res.status(201).json({
        status: "success",
        data: {
            auido: fileWithoutBuffer,
        },
    });
};

export const deleteAudio = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
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
