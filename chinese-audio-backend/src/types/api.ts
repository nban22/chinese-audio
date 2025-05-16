// backend/src/types/api.ts
/**
 * JSend response type definitions
 * Based on JSend specification: https://github.com/omniti-labs/jsend
 */

/**
 * Base JSend response structure
 */
export interface JSendResponse {
  status: 'success' | 'fail' | 'error';
  message?: string;
}

/**
 * Successful response with data
 */
export interface JSendSuccessResponse<T = any> extends JSendResponse {
  status: 'success';
  data: T;
}

/**
 * Failed response with data explaining the failure
 */
export interface JSendFailResponse extends JSendResponse {
  status: 'fail';
  data: Record<string, any> | null;
}

/**
 * Error response with error message and optional code/data
 */
export interface JSendErrorResponse extends JSendResponse {
  status: 'error';
  message: string;
  code?: string | number;
  data?: Record<string, any> | null;
}

/**
 * Generic API response that could be any of the JSend types
 */
export type ApiResponse<T = any> = 
  | JSendSuccessResponse<T>
  | JSendFailResponse 
  | JSendErrorResponse;

/**
 * Pagination metadata structure
 */
export interface PaginationMeta {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

/**
 * Paginated response data structure
 */
export interface PaginatedData<T> {
  items: T[];
  meta: PaginationMeta;
}

/**
 * Paginated success response
 */
export interface JSendPaginatedSuccessResponse<T> extends JSendSuccessResponse {
  data: PaginatedData<T>;
}