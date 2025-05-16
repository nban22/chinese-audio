// backend/src/utils/response.ts
import { Response } from 'express';
import { 
  JSendSuccessResponse, 
  JSendFailResponse, 
  JSendErrorResponse,
  PaginatedData
} from '../types/api';

/**
 * Response utility class for handling JSend formatted responses
 */
export class ApiResponse {
  /**
   * Send a success response
   * @param res Express response object
   * @param data Data to be returned in response
   * @param message Optional message to include
   * @param statusCode HTTP status code (default: 200)
   */
  public static success<T>(
    res: Response, 
    data: T, 
    message?: string, 
    statusCode: number = 200
  ): Response {
    const response: JSendSuccessResponse<T> = {
      status: 'success',
      data
    };
    
    if (message) {
      response.message = message;
    }
    
    return res.status(statusCode).json(response);
  }

  /**
   * Send a paginated success response
   * @param res Express response object
   * @param paginatedData Paginated data with items and metadata
   * @param message Optional message to include
   * @param statusCode HTTP status code (default: 200)
   */
  public static paginatedSuccess<T>(
    res: Response,
    paginatedData: PaginatedData<T>,
    message?: string,
    statusCode: number = 200
  ): Response {
    return this.success(res, paginatedData, message, statusCode);
  }

  /**
   * Send a fail response for validation errors, invalid requests, etc.
   * @param res Express response object
   * @param data Object containing error details
   * @param message Optional message explaining the failure
   * @param statusCode HTTP status code (default: 400)
   */
  public static fail(
    res: Response, 
    data: Record<string, any> | null = null, 
    message?: string, 
    statusCode: number = 400
  ): Response {
    const response: JSendFailResponse = {
      status: 'fail',
      data
    };
    
    if (message) {
      response.message = message;
    }
    
    return res.status(statusCode).json(response);
  }

  /**
   * Send an error response for server errors, unexpected conditions, etc.
   * @param res Express response object
   * @param message Error message
   * @param code Optional error code
   * @param data Optional additional error data
   * @param statusCode HTTP status code (default: 500)
   */
  public static error(
    res: Response, 
    message: string, 
    code?: string | number, 
    data?: Record<string, any> | null, 
    statusCode: number = 500
  ): Response {
    const response: JSendErrorResponse = {
      status: 'error',
      message
    };
    
    if (code !== undefined) {
      response.code = code;
    }
    
    if (data) {
      response.data = data;
    }
    
    return res.status(statusCode).json(response);
  }

  /**
   * Send a not found error response
   * @param res Express response object
   * @param message Custom not found message (default: "Resource not found")
   */
  public static notFound(
    res: Response, 
    message: string = 'Resource not found'
  ): Response {
    return this.fail(res, null, message, 404);
  }

  /**
   * Send an unauthorized error response
   * @param res Express response object
   * @param message Custom unauthorized message (default: "Unauthorized access")
   */
  public static unauthorized(
    res: Response, 
    message: string = 'Unauthorized access'
  ): Response {
    return this.fail(res, null, message, 401);
  }

  /**
   * Send a forbidden error response
   * @param res Express response object
   * @param message Custom forbidden message (default: "Access forbidden")
   */
  public static forbidden(
    res: Response, 
    message: string = 'Access forbidden'
  ): Response {
    return this.fail(res, null, message, 403);
  }
}

export default ApiResponse;