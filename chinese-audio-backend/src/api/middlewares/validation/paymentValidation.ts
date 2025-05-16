// backend/src/api/middlewares/validation/paymentValidation.ts
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import ApiResponse from '../../../utils/response';

/**
 * Payment validation middleware
 */
export const paymentValidation = {
  /**
   * Validate create checkout session
   */
  createCheckoutSession: (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
      planId: Joi.number().integer().positive().required()
        .messages({
          'number.base': 'Plan ID must be a number',
          'number.integer': 'Plan ID must be an integer',
          'number.positive': 'Plan ID must be a positive number',
          'any.required': 'Plan ID is required'
        }),
      
      couponCode: Joi.string().max(30)
        .messages({
          'string.max': 'Coupon code cannot exceed 30 characters'
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
   * Validate handle checkout success
   */
  handleCheckoutSuccess: (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
      sessionId: Joi.string().required()
        .messages({
          'string.empty': 'Session ID is required',
          'any.required': 'Session ID is required'
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
   * Validate cancel subscription
   */
  cancelSubscription: (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
      subscriptionId: Joi.number().integer().positive().required()
        .messages({
          'number.base': 'Subscription ID must be a number',
          'number.integer': 'Subscription ID must be an integer',
          'number.positive': 'Subscription ID must be a positive number',
          'any.required': 'Subscription ID is required'
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
   * Validate coupon code
   */
  validateCoupon: (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
      code: Joi.string().required().max(30)
        .messages({
          'string.empty': 'Coupon code is required',
          'string.max': 'Coupon code cannot exceed 30 characters',
          'any.required': 'Coupon code is required'
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

export default paymentValidation;