// backend/src/utils/errors.ts
/**
 * Custom API error class
 */
export class ApiError extends Error {
  statusCode: number;
  code?: string;
  data?: Record<string, any> | null;

  constructor(
    message: string, 
    statusCode: number = 500, 
    code?: string,
    data?: Record<string, any> | null
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code;
    this.data = data;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Not found error
 */
export class NotFoundError extends ApiError {
  constructor(message: string = 'Resource not found') {
    super(message, 404, 'RESOURCE_NOT_FOUND');
    this.name = 'NotFoundError';
  }
}

/**
 * Unauthorized error
 */
export class UnauthorizedError extends ApiError {
  constructor(message: string = 'Unauthorized access') {
    super(message, 401, 'UNAUTHORIZED');
    this.name = 'UnauthorizedError';
  }
}

/**
 * Forbidden error
 */
export class ForbiddenError extends ApiError {
  constructor(message: string = 'Access forbidden') {
    super(message, 403, 'FORBIDDEN');
    this.name = 'ForbiddenError';
  }
}

/**
 * Validation error
 */
export class ValidationError extends ApiError {
  constructor(
    validationErrors: Record<string, string>,
    message: string = 'Validation failed'
  ) {
    super(message, 400, 'VALIDATION_ERROR', validationErrors);
    this.name = 'ValidationError';
  }
}

/**
 * Database error
 */
export class DatabaseError extends ApiError {
  constructor(message: string = 'Database error', originalError?: Error) {
    super(
      message, 
      500, 
      'DATABASE_ERROR', 
      originalError ? { originalError: originalError.message } : undefined
    );
    this.name = 'DatabaseError';
  }
}

/**
 * External service error
 */
export class ExternalServiceError extends ApiError {
  constructor(
    service: string,
    message: string = 'External service error',
    originalError?: Error
  ) {
    super(
      message, 
      502, 
      'EXTERNAL_SERVICE_ERROR', 
      { 
        service,
        originalError: originalError ? originalError.message : undefined 
      }
    );
    this.name = 'ExternalServiceError';
  }
}

/**
 * Authentication error
 */
export class AuthenticationError extends ApiError {
  constructor(message: string = 'Authentication failed') {
    super(message, 401, 'AUTHENTICATION_ERROR');
    this.name = 'AuthenticationError';
  }
}

/**
 * Rate limit error
 */
export class RateLimitError extends ApiError {
  constructor(message: string = 'Too many requests', retryAfter?: number) {
    super(
      message, 
      429, 
      'RATE_LIMIT_EXCEEDED',
      retryAfter ? { retryAfter } : undefined
    );
    this.name = 'RateLimitError';
  }
}

/**
 * Payment error
 */
export class PaymentError extends ApiError {
  constructor(message: string = 'Payment failed', details?: any) {
    super(message, 402, 'PAYMENT_ERROR', details);
    this.name = 'PaymentError';
  }
}

/**
 * Service unavailable error
 */
export class ServiceUnavailableError extends ApiError {
  constructor(message: string = 'Service temporarily unavailable') {
    super(message, 503, 'SERVICE_UNAVAILABLE');
    this.name = 'ServiceUnavailableError';
  }
}

export default {
  ApiError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
  ValidationError,
  DatabaseError,
  ExternalServiceError,
  AuthenticationError,
  RateLimitError,
  PaymentError,
  ServiceUnavailableError
};