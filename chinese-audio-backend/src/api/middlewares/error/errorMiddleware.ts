// backend/src/api/middlewares/error/errorMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { ValidationError as SequelizeValidationError } from 'sequelize';
import ApiResponse from '../../../utils/response';
import { 
  ApiError, 
  ValidationError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
  DatabaseError,
  ExternalServiceError 
} from '../../../utils/errors';
import logger from '../../../utils/logger';

/**
 * Handles Sequelize validation errors
 */
const handleSequelizeValidationError = (err: SequelizeValidationError, res: Response) => {
  const validationErrors: Record<string, string> = {};
  
  err.errors.forEach((error) => {
    if (error.path) {
      validationErrors[error.path] = error.message;
    }
  });
  
  return ApiResponse.fail(res, validationErrors, 'Validation failed', 400);
};

/**
 * Global error handler middleware
 */
export const errorHandler = (
  err: Error, 
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  // Log error
  logger.error(`Error: ${err.message}`, { 
    path: req.path,
    method: req.method,
    stack: err.stack,
    statusCode: err instanceof ApiError ? err.statusCode : 500
  });
  
  // Handle different error types
  
  // Sequelize validation errors
  if (err instanceof SequelizeValidationError) {
    return handleSequelizeValidationError(err, res);
  }
  
  // Custom API errors
  if (err instanceof ValidationError) {
    return ApiResponse.fail(res, err.data, err.message, 400);
  }
  
  if (err instanceof NotFoundError) {
    return ApiResponse.notFound(res, err.message);
  }
  
  if (err instanceof UnauthorizedError) {
    return ApiResponse.unauthorized(res, err.message);
  }
  
  if (err instanceof ForbiddenError) {
    return ApiResponse.forbidden(res, err.message);
  }
  
  if (err instanceof DatabaseError) {
    return ApiResponse.error(res, err.message, err.code, err.data, 500);
  }
  
  if (err instanceof ExternalServiceError) {
    return ApiResponse.error(res, err.message, err.code, err.data, 502);
  }
  
  if (err instanceof ApiError) {
    return ApiResponse.error(res, err.message, err.code, err.data, err.statusCode);
  }
  
  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    return ApiResponse.unauthorized(res, 'Invalid token');
  }
  
  if (err.name === 'TokenExpiredError') {
    return ApiResponse.unauthorized(res, 'Token expired');
  }
  
  // Handle other errors
  const isDevelopment = process.env.NODE_ENV === 'development';
  const message = isDevelopment ? err.message : 'Internal server error';
  const data = isDevelopment ? { stack: err.stack } : undefined;
  
  return ApiResponse.error(res, message, 'INTERNAL_ERROR', data, 500);
};

/**
 * Handle 404 errors for routes that don't exist
 */
export const notFoundHandler = (req: Request, res: Response) => {
  logger.warn(`Route not found: ${req.method} ${req.originalUrl}`);
  return ApiResponse.notFound(res, `Route not found: ${req.method} ${req.originalUrl}`);
};

export default { errorHandler, notFoundHandler };