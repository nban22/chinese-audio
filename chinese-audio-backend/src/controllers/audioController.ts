import { NextFunction, Request, Response } from "express";
import Audio from "../models/audio";
import AppError from "../utils/appError";

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
export const createAudio = async (req: Request, res: Response, next: NextFunction) => {
    const { title, description, isPublic } = req.body;
    if (!title) {
        return next(new AppError("title is required", 400));
    }
    if (!isPublic) {
        return next(new AppError("isPublic is required", 400));
    }

    const audio = await Audio.create({
        title: title,
        description: description,
        isPublic: isPublic,
    } as Audio);

    if (!audio) {
        return next(new AppError("ST wrong with audio creation", 500));
    }
    res.status(201).json({
        status: "success",
        data: {
            auido: audio,
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
        return next(new AppError('Something wrong when delete a Audio', 400));
    }
    res.status(200).json({
        status: 'success',
        data: {
            audio: null,
        }
    })
};
export const updateAudio = async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;

    const {title, description, isPublic} = req.body;
    
    const audio = await Audio.findByPk(id);
    if (!audio) {
        return next(new AppError(`audio with id:${id} not found`, 400));
    }
    
    await audio.update({title, description, isPublic});

    res.status(200).json({
        status: 'success',
        data: {
            audio: audio
        }
    })
};
