// backend/src/api/middlewares/validation/adminValidation.ts
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import ApiResponse from '../../../utils/response';

export const adminValidation = {
  updateUser: (req: Request, res: Response, next: NextFunction) => {
    // Validation logic here
    next();
  },
  
  processVerification: (req: Request, res: Response, next: NextFunction) => {
    // Validation logic here
    next();
  },
  
  setApprovalStatus: (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
      isApproved: Joi.boolean().required(),
      notes: Joi.string().allow('', null)
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
  
  processFeedback: (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
      isResolved: Joi.boolean().required(),
      adminNotes: Joi.string().allow('', null)
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
  
  createCoupon: (req: Request, res: Response, next: NextFunction) => {
    // Validation logic here
    next();
  },
  
  updateCoupon: (req: Request, res: Response, next: NextFunction) => {
    // Validation logic here
    next();
  }
};

export default adminValidation;