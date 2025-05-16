// backend/src/api/middlewares/validation/userValidation.ts
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import ApiResponse from '../../../utils/response';
import { UserType } from '../../../db/models/user.model';
import config from '../../../config';

/**
 * User validation middleware
 */
export const userValidation = {
  /**
   * Validate user registration
   */
  register: (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
      email: Joi.string().email().required()
        .messages({
          'string.email': 'Email must be a valid email address',
          'string.empty': 'Email is required',
          'any.required': 'Email is required'
        }),
      
      password: Joi.string().min(config.auth.passwordMinLength).required()
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'))
        .messages({
          'string.min': `Password must be at least ${config.auth.passwordMinLength} characters long`,
          'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
          'string.empty': 'Password is required',
          'any.required': 'Password is required'
        }),
      
      confirmPassword: Joi.string().valid(Joi.ref('password')).required()
        .messages({
          'any.only': 'Passwords do not match',
          'string.empty': 'Confirm password is required',
          'any.required': 'Confirm password is required'
        }),
      
      fullName: Joi.string().min(2).max(100).required()
        .messages({
          'string.min': 'Full name must be at least 2 characters long',
          'string.max': 'Full name cannot exceed 100 characters',
          'string.empty': 'Full name is required',
          'any.required': 'Full name is required'
        }),
      
      phoneNumber: Joi.string().pattern(/^[0-9+\-\s()]{8,20}$/).allow('', null)
        .messages({
          'string.pattern.base': 'Phone number must be a valid phone number'
        }),
      
      userType: Joi.string().valid(UserType.LISTENER, UserType.ARTIST).default(UserType.LISTENER)
        .messages({
          'any.only': `User type must be one of: ${UserType.LISTENER}, ${UserType.ARTIST}`
        }),
      
      // For artists
      bio: Joi.when('userType', {
        is: UserType.ARTIST,
        then: Joi.string().max(1000)
          .messages({
            'string.max': 'Bio cannot exceed 1000 characters'
          }),
        otherwise: Joi.string().allow('', null)
      }),
      
      contactInfo: Joi.when('userType', {
        is: UserType.ARTIST,
        then: Joi.string().max(255)
          .messages({
            'string.max': 'Contact info cannot exceed 255 characters'
          }),
        otherwise: Joi.string().allow('', null)
      }),
      
      // Terms acceptance
      acceptTerms: Joi.boolean().valid(true).required()
        .messages({
          'any.only': 'You must accept the terms and conditions',
          'any.required': 'Terms acceptance is required'
        })
    });
    
    const { error } = schema.validate(req.body, { abortEarly: false });
    
    if (error) {
      const validationErrors = error.details.reduce((acc: Record<string, string>, curr: Joi.ValidationErrorItem) => {
        const key = curr.path[0] as string;
        acc[key] = curr.message;
        return acc;
      }, {} as Record<string, string>);
      
      return ApiResponse.fail(res, validationErrors, 'Validation failed');
    }
    
    next();
  },
  
  /**
   * Validate user login
   */
  login: (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
      email: Joi.string().email().required()
        .messages({
          'string.email': 'Email must be a valid email address',
          'string.empty': 'Email is required',
          'any.required': 'Email is required'
        }),
      
      password: Joi.string().required()
        .messages({
          'string.empty': 'Password is required',
          'any.required': 'Password is required'
        }),
      
      rememberMe: Joi.boolean()
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
   * Validate forgot password
   */
  forgotPassword: (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
      email: Joi.string().email().required()
        .messages({
          'string.email': 'Email must be a valid email address',
          'string.empty': 'Email is required',
          'any.required': 'Email is required'
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
   * Validate reset password
   */
  resetPassword: (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
      token: Joi.string().required()
        .messages({
          'string.empty': 'Token is required',
          'any.required': 'Token is required'
        }),
      
      password: Joi.string().min(config.auth.passwordMinLength).required()
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'))
        .messages({
          'string.min': `Password must be at least ${config.auth.passwordMinLength} characters long`,
          'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
          'string.empty': 'Password is required',
          'any.required': 'Password is required'
        }),
      
      confirmPassword: Joi.string().valid(Joi.ref('password')).required()
        .messages({
          'any.only': 'Passwords do not match',
          'string.empty': 'Confirm password is required',
          'any.required': 'Confirm password is required'
        })
    });
    
    const { error } = schema.validate(req.body, { abortEarly: false });
    
    if (error) {
      interface ValidationErrorAccumulator {
        [key: string]: string;
      }

      interface ValidationErrorDetail {
        message: string;
        path: (string | number)[];
      }

      const validationErrors = error.details.reduce(
        (acc: ValidationErrorAccumulator, curr: ValidationErrorDetail) => {
          const key = curr.path[0] as string;
          acc[key] = curr.message;
          return acc;
        },
        {} as ValidationErrorAccumulator
      );
      
      return ApiResponse.fail(res, validationErrors, 'Validation failed');
    }
    
    next();
  },
  
  /**
   * Validate update profile
   */
  updateProfile: (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
      fullName: Joi.string().min(2).max(100)
        .messages({
          'string.min': 'Full name must be at least 2 characters long',
          'string.max': 'Full name cannot exceed 100 characters'
        }),
      
      phoneNumber: Joi.string().pattern(/^[0-9+\-\s()]{8,20}$/).allow('', null)
        .messages({
          'string.pattern.base': 'Phone number must be a valid phone number'
        }),
      
      profileImage: Joi.string().uri().allow('', null)
        .messages({
          'string.uri': 'Profile image must be a valid URL'
        }),
      
      // For artists
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
   * Validate change password
   */
  changePassword: (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
      currentPassword: Joi.string().required()
        .messages({
          'string.empty': 'Current password is required',
          'any.required': 'Current password is required'
        }),
      
      newPassword: Joi.string().min(config.auth.passwordMinLength).required()
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'))
        .invalid(Joi.ref('currentPassword')) // New password must be different from current
        .messages({
          'string.min': `Password must be at least ${config.auth.passwordMinLength} characters long`,
          'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
          'string.empty': 'New password is required',
          'any.required': 'New password is required',
          'any.invalid': 'New password must be different from current password'
        }),
      
      confirmPassword: Joi.string().valid(Joi.ref('newPassword')).required()
        .messages({
          'any.only': 'Passwords do not match',
          'string.empty': 'Confirm password is required',
          'any.required': 'Confirm password is required'
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

export default userValidation;