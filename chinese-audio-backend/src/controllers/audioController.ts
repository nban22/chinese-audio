import { NextFunction, Request, Response } from "express";
import Audio from "../models/audio";
import AppError from "../utils/appError";
import { isRequired } from "../utils/isRequired";
import { deleteAudioFromDropbox, uploadAudioToDropbox } from "../services/dropboxServices";
import { catchAsync } from "../utils/catchAsync";
import * as mm from "music-metadata";
import { ERROR_CODES } from "../constants/errorCodes";

const audioFiltered = (audio: any) => {
    return {
        id: audio.id || null,
        title: audio.title || null,
        description: audio.description || null,
        playCount: audio.playCount,
        likeCount: audio.likeCount,
        isPublic: audio.isPublic,
        duration: audio.duration || null,
        originalFileName: audio.originalFileName || null,
        url: audio.url || null,
        size: audio.size || null,
        uploadDate: audio.uploadDate || null,
        updateDate: audio.updateDate || null,
    };
};

export const uploadAudio = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { title, description } = req.body;
    isRequired(title, "title");

    const file = Array.isArray(req.files)
        ? req.files.find((file) => file.fieldname === "audio" && ["audio/mpeg", "audio/wav"].includes(file.mimetype))
        : undefined;

    if (!file) {
        return next(new AppError(ERROR_CODES.AUDIO.AUDIO_FIELD_MISSING));
    }
    const { buffer, originalname } = file;

    const dataFromDropboxAPI = await uploadAudioToDropbox(buffer, originalname);

    const metadata = await mm.parseBuffer(buffer);

    const audio = await Audio.create({
        title: title,
        description: description,
        originalFileName: originalname,
        fileName: dataFromDropboxAPI.name || "",
        dropboxPath: dataFromDropboxAPI.path_display || "",
        size: dataFromDropboxAPI.size || 0,
        url: dataFromDropboxAPI.url || "",
        duration: metadata.format.duration || 0,
        uploadDate: new Date(),
    });

    res.status(201).json({
        status: "success",
        data: {
            auido: audioFiltered(audio),
        },
    });
});

export const getAllAudios = async (req: Request, res: Response, next: NextFunction) => {
    const audios = await Audio.findAll();
    if (!audios) {
        return next(new AppError("Something wrong with DB or backend server", 500));
    }

    const audiosFiltered = audios.map((audio) => {
        return audioFiltered(audio);
    });

    res.status(200).json({
        status: "success",
        data: {
            audios_total: audios.length,
            audios: audiosFiltered,
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
            audio: audioFiltered(audio),
        },
    });
};

export const deleteAudio = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const existingAudio = await Audio.findByPk(id);
    if (!existingAudio) {
        return next(new AppError(ERROR_CODES.AUDIO.AUDIO_NOT_FOUND));
    }
    const dataFromDropboxAPI = await deleteAudioFromDropbox(existingAudio.dropboxPath);
    if (!dataFromDropboxAPI) {
        return next(new AppError(ERROR_CODES.DROPBOX.DROPBOX_DELETE_ERROR));
    }
    const num = await Audio.destroy({
        where: {
            id: id,
        },
    });
    if (num === 0) {
        return next(new AppError(ERROR_CODES.AUDIO.AUDIO_DELETE_ERROR));
    }
    res.status(200).json({
        status: "success",
        data: {
            audio: null,
        },
    });
};
export const updateAudio = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const { title, description } = req.body;
    isRequired(title, "title");

    const file = Array.isArray(req.files) ? req.files.find((file) => file.fieldname === 'audio' && ['audio/mpeg', 'audio/wav'].includes(file.mimetype)) : undefined;

    const audio = await Audio.findByPk(id);
    if (!audio) {
        return next(new AppError(ERROR_CODES.AUDIO.AUDIO_NOT_FOUND));
    }

    if (file) {
        const { buffer, originalname } = file;    
        
        const dataFromDropboxAPI = await uploadAudioToDropbox(buffer, originalname);
        
        const metadata = await mm.parseBuffer(buffer);

        if (audio.dropboxPath) {
            await deleteAudioFromDropbox(audio.dropboxPath);
        }

        await audio.update({
            title,
            description,
            originalFileName: originalname,
            fileName: dataFromDropboxAPI.name || "",
            dropboxPath: dataFromDropboxAPI.path_display || "",
            size: dataFromDropboxAPI.size || 0,
            url: dataFromDropboxAPI.url || "",
            duration: metadata.format.duration || 0,
            updateDate: new Date(),
        });        
    } else {
        await audio.update({ title, description });
    }

    res.status(200).json({
        status: "success",
        data: {
            audio: audioFiltered(audio),
        },
    });
});
