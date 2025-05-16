// backend/src/api/middlewares/validation/artistValidation.ts
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import ApiResponse from '../../../utils/response';

/**
 * Artist validation middleware
 */
export const artistValidation = {
  /**
   * Validate create artist
   */
  createArtist: (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
      bio: Joi.string().max(1000).allow('', null)
        .messages({
          'string.max': 'Bio cannot exceed 1000 characters'
        }),
      
      contactInfo: Joi.string().max(255).allow('', null)
        .messages({
          'string.max': 'Contact info cannot exceed 255 characters'
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
   * Validate update artist
   */
  updateArtist: (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
      bio: Joi.string().max(1000).allow('', null)
        .messages({
          'string.max': 'Bio cannot exceed 1000 characters'
        }),
      
      contactInfo: Joi.string().max(255).allow('', null)
        .messages({
          'string.max': 'Contact info cannot exceed 255 characters'
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
   * Validate verify artist
   */
  verifyArtist: (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
      isApproved: Joi.boolean().required()
        .messages({
          'boolean.base': 'Approval status must be a boolean',
          'any.required': 'Approval status is required'
        }),
      
      adminNotes: Joi.string().max(1000).allow('', null)
        .messages({
          'string.max': 'Admin notes cannot exceed 1000 characters'
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

export default artistValidation;