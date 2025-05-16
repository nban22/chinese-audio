// backend/src/api/middlewares/validation/authValidation.ts
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import ApiResponse from '../../../utils/response';
import { userValidation } from './userValidation';

export const authValidation = {
  register: userValidation.register,
  login: userValidation.login,
  
  refreshToken: (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
      refreshToken: Joi.string().required()
        .messages({
          'string.empty': 'Refresh token is required',
          'any.required': 'Refresh token is required'
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
  
  forgotPassword: userValidation.forgotPassword,
  resetPassword: userValidation.resetPassword,
  changePassword: userValidation.changePassword
};

export default authValidation;