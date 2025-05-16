// backend/src/api/middlewares/validation/playlistValidation.ts
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import ApiResponse from '../../../utils/response';

/**
 * Playlist validation middleware
 */
export const playlistValidation = {
  /**
   * Validate create playlist
   */
  createPlaylist: (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
      title: Joi.string().required().min(2).max(100)
        .messages({
          'string.empty': 'Title is required',
          'string.min': 'Title must be at least 2 characters long',
          'string.max': 'Title cannot exceed 100 characters',
          'any.required': 'Title is required'
        }),
      
      description: Joi.string().max(1000).allow('', null)
        .messages({
          'string.max': 'Description cannot exceed 1000 characters'
        }),
      
      isPublic: Joi.boolean()
        .messages({
          'boolean.base': 'Public status must be a boolean'
        }),
      
      isEditorial: Joi.boolean()
        .messages({
          'boolean.base': 'Editorial status must be a boolean'
        }),
      
      coverImage: Joi.string().uri().allow('', null)
        .messages({
          'string.uri': 'Cover image must be a valid URL'
        })
    });
    
    const { error } = schema.validate(req.body, { abortEarly: false });
    
    if (error) {
      const validationErrors = error.details.reduce((acc, curr) => {
        const key = curr.path[0] as string;
        acc[key] = curr.message;
        return acc;
      }, {} as Record<string, string>);
      
      return ApiResponse.fail(res, validationErrors, 'Validation failed');
    }
    
    next();
  },
  
  /**
   * Validate update playlist
   */
  updatePlaylist: (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
      title: Joi.string().min(2).max(100)
        .messages({
          'string.min': 'Title must be at least 2 characters long',
          'string.max': 'Title cannot exceed 100 characters'
        }),
      
      description: Joi.string().max(1000).allow('', null)
        .messages({
          'string.max': 'Description cannot exceed 1000 characters'
        }),
      
      isPublic: Joi.boolean()
        .messages({
          'boolean.base': 'Public status must be a boolean'
        }),
      
      isEditorial: Joi.boolean()
        .messages({
          'boolean.base': 'Editorial status must be a boolean'
        }),
      
      coverImage: Joi.string().uri().allow('', null)
        .messages({
          'string.uri': 'Cover image must be a valid URL'
        })
    }).min(1).messages({
      'object.min': 'At least one field must be provided for update'
    });
    
    const { error } = schema.validate(req.body, { abortEarly: false });
    
    if (error) {
      const validationErrors = error.details.reduce((acc, curr) => {
        const key = curr.path[0] as string;
        acc[key] = curr.message;
        return acc;
      }, {} as Record<string, string>);
      
      return ApiResponse.fail(res, validationErrors, 'Validation failed');
    }
    
    next();
  },
  
  /**
   * Validate add audio to playlist
   */
  addAudioToPlaylist: (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
      audioId: Joi.number().integer().positive().required()
        .messages({
          'number.base': 'Audio ID must be a number',
          'number.integer': 'Audio ID must be an integer',
          'number.positive': 'Audio ID must be a positive number',
          'any.required': 'Audio ID is required'
        }),
      
      position: Joi.number().integer().min(0)
        .messages({
          'number.base': 'Position must be a number',
          'number.integer': 'Position must be an integer',
          'number.min': 'Position must be greater than or equal to 0'
        })
    });
    
    const { error } = schema.validate(req.body, { abortEarly: false });
    
    if (error) {
      const validationErrors = error.details.reduce((acc, curr) => {
        const key = curr.path[0] as string;
        acc[key] = curr.message;
        return acc;
      }, {} as Record<string, string>);
      
      return ApiResponse.fail(res, validationErrors, 'Validation failed');
    }
    
    next();
  },
  
  /**
   * Validate reorder playlist audio
   */
  reorderPlaylistAudio: (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
      position: Joi.number().integer().min(0).required()
        .messages({
          'number.base': 'Position must be a number',
          'number.integer': 'Position must be an integer',
          'number.min': 'Position must be greater than or equal to 0',
          'any.required': 'Position is required'
        })
    });
    
    const { error } = schema.validate(req.body, { abortEarly: false });
    
    if (error) {
      const validationErrors = error.details.reduce((acc, curr) => {
        const key = curr.path[0] as string;
        acc[key] = curr.message;
        return acc;
      }, {} as Record<string, string>);
      
      return ApiResponse.fail(res, validationErrors, 'Validation failed');
    }
    
    next();
  }
};

export default playlistValidation;