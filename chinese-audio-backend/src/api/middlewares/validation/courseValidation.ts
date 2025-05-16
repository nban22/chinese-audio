// backend/src/api/middlewares/validation/courseValidation.ts
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import ApiResponse from '../../../utils/response';

/**
 * Course validation middleware
 */
export const courseValidation = {
  /**
   * Validate create course
   */
  createCourse: (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
      title: Joi.string().required().min(2).max(100)
        .messages({
          'string.empty': 'Title is required',
          'string.min': 'Title must be at least 2 characters long',
          'string.max': 'Title cannot exceed 100 characters',
          'any.required': 'Title is required'
        }),
      
      description: Joi.string().max(2000).allow('', null)
        .messages({
          'string.max': 'Description cannot exceed 2000 characters'
        }),
      
      difficultyLevel: Joi.string().required().valid('beginner', 'intermediate', 'advanced')
        .messages({
          'string.empty': 'Difficulty level is required',
          'any.only': 'Difficulty level must be one of: beginner, intermediate, advanced',
          'any.required': 'Difficulty level is required'
        }),
      
      categoryId: Joi.number().integer().positive().allow(null)
        .messages({
          'number.base': 'Category ID must be a number',
          'number.integer': 'Category ID must be an integer',
          'number.positive': 'Category ID must be a positive number'
        }),
      
      isPremium: Joi.boolean()
        .messages({
          'boolean.base': 'Premium status must be a boolean'
        }),
      
      price: Joi.number().min(0).when('isPremium', {
        is: true,
        then: Joi.required(),
        otherwise: Joi.optional()
      }).messages({
        'number.base': 'Price must be a number',
        'number.min': 'Price must be greater than or equal to 0',
        'any.required': 'Price is required for premium courses'
      }),
      
      thumbnail: Joi.string().uri().allow('', null)
        .messages({
          'string.uri': 'Thumbnail must be a valid URL'
        }),
      
      language: Joi.string().max(30)
        .messages({
          'string.max': 'Language cannot exceed 30 characters'
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
   * Validate update course
   */
  updateCourse: (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
      title: Joi.string().min(2).max(100)
        .messages({
          'string.min': 'Title must be at least 2 characters long',
          'string.max': 'Title cannot exceed 100 characters'
        }),
      
      description: Joi.string().max(2000).allow('', null)
        .messages({
          'string.max': 'Description cannot exceed 2000 characters'
        }),
      
      difficultyLevel: Joi.string().valid('beginner', 'intermediate', 'advanced')
        .messages({
          'any.only': 'Difficulty level must be one of: beginner, intermediate, advanced'
        }),
      
      categoryId: Joi.number().integer().positive().allow(null)
        .messages({
          'number.base': 'Category ID must be a number',
          'number.integer': 'Category ID must be an integer',
          'number.positive': 'Category ID must be a positive number'
        }),
      
      isPremium: Joi.boolean()
        .messages({
          'boolean.base': 'Premium status must be a boolean'
        }),
      
      price: Joi.number().min(0)
        .messages({
          'number.base': 'Price must be a number',
          'number.min': 'Price must be greater than or equal to 0'
        }),
      
      thumbnail: Joi.string().uri().allow('', null)
        .messages({
          'string.uri': 'Thumbnail must be a valid URL'
        }),
      
      isApproved: Joi.boolean()
        .messages({
          'boolean.base': 'Approval status must be a boolean'
        }),
      
      language: Joi.string().max(30)
        .messages({
          'string.max': 'Language cannot exceed 30 characters'
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
   * Validate add audio to course
   */
  addAudioToCourse: (req: Request, res: Response, next: NextFunction) => {
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
        }),
      
      sectionTitle: Joi.string().max(100).allow('', null)
        .messages({
          'string.max': 'Section title cannot exceed 100 characters'
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
   * Validate reorder course audio
   */
  reorderCourseAudio: (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
      position: Joi.number().integer().min(0).required()
        .messages({
          'number.base': 'Position must be a number',
          'number.integer': 'Position must be an integer',
          'number.min': 'Position must be greater than or equal to 0',
          'any.required': 'Position is required'
        }),
      
      sectionTitle: Joi.string().max(100).allow('', null)
        .messages({
          'string.max': 'Section title cannot exceed 100 characters'
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

export default courseValidation;