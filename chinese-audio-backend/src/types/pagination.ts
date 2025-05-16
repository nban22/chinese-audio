// backend/src/types/pagination.ts
/**
 * Options for pagination
 */
export interface PaginationOptions {
  /**
   * Page number (1-indexed)
   */
  page: number;
  
  /**
   * Number of items per page
   */
  limit: number;
}

/**
 * Metadata for pagination
 */
export interface PaginationMeta {
  /**
   * Total number of items
   */
  totalItems: number;
  
  /**
   * Number of items per page
   */
  itemsPerPage: number;
  
  /**
   * Current page number
   */
  currentPage: number;
  
  /**
   * Total number of pages
   */
  totalPages: number;
  
  /**
   * Whether there is a next page
   */
  hasNextPage: boolean;
  
  /**
   * Whether there is a previous page
   */
  hasPrevPage: boolean;
}

/**
 * Result of a paginated query
 */
export interface PaginationResult<T> {
  /**
   * Array of items for the current page
   */
  items: T[];
  
  /**
   * Pagination metadata
   */
  meta: PaginationMeta;
}

/**
 * Calculate pagination metadata
 * @param totalItems Total number of items
 * @param itemsPerPage Number of items per page
 * @param currentPage Current page number
 * @returns Pagination metadata
 */
export const calculatePaginationMeta = (
  totalItems: number,
  itemsPerPage: number,
  currentPage: number
): PaginationMeta => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  return {
    totalItems,
    itemsPerPage,
    currentPage,
    totalPages,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  };
};

/**
 * Create an empty pagination result
 * @param options Pagination options
 * @returns Empty pagination result
 */
export const emptyPaginationResult = <T>(options: PaginationOptions): PaginationResult<T> => {
  return {
    items: [],
    meta: {
      totalItems: 0,
      itemsPerPage: options.limit,
      currentPage: options.page,
      totalPages: 0,
      hasNextPage: false,
      hasPrevPage: false,
    },
  };
};

/**
 * Create a pagination result from items and total count
 * @param items Array of items
 * @param totalItems Total number of items
 * @param options Pagination options
 * @returns Pagination result
 */
export const createPaginationResult = <T>(
  items: T[],
  totalItems: number,
  options: PaginationOptions
): PaginationResult<T> => {
  return {
    items,
    meta: calculatePaginationMeta(totalItems, options.limit, options.page),
  };
};

export default {
  calculatePaginationMeta,
  emptyPaginationResult,
  createPaginationResult,
};