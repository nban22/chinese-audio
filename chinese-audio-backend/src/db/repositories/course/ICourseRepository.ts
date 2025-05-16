// src/db/repositories/course/ICourseRepository.ts
import { FindOptions, WhereOptions, Includeable } from 'sequelize';
import { IBaseRepository } from '../base/IBaseRepository';
import { Course } from '../../models/course.model';
import { PaginationOptions, PaginationResult } from '../../../types/pagination';

/**
 * Course repository interface that extends base repository
 */
export interface ICourseRepository extends IBaseRepository<Course> {
  /**
   * Find courses by artist ID with pagination
   * @param artistId Artist ID
   * @param pagination Pagination options
   * @param options Additional Sequelize find options
   * @returns Paginated result
   */
  findByArtistId(
    artistId: number,
    pagination: PaginationOptions,
    options?: FindOptions
  ): Promise<PaginationResult<Course>>;
  
  /**
   * Find courses by category ID with pagination
   * @param categoryId Category ID
   * @param pagination Pagination options
   * @param options Additional Sequelize find options
   * @returns Paginated result
   */
  findByCategoryId(
    categoryId: number,
    pagination: PaginationOptions,
    options?: FindOptions
  ): Promise<PaginationResult<Course>>;
  
  /**
   * Find approved courses with pagination
   * @param pagination Pagination options
   * @param options Additional Sequelize find options
   * @returns Paginated result
   */
  findApproved(
    pagination: PaginationOptions,
    options?: FindOptions
  ): Promise<PaginationResult<Course>>;
  
  /**
   * Find pending approval courses with pagination
   * @param pagination Pagination options
   * @param options Additional Sequelize find options
   * @returns Paginated result
   */
  findPendingApproval(
    pagination: PaginationOptions,
    options?: FindOptions
  ): Promise<PaginationResult<Course>>;
  
  /**
   * Search courses by title or description with pagination
   * @param searchTerm Search term
   * @param pagination Pagination options
   * @param options Additional Sequelize find options
   * @returns Paginated result
   */
  search(
    searchTerm: string,
    pagination: PaginationOptions,
    options?: FindOptions
  ): Promise<PaginationResult<Course>>;
  
  /**
   * Count courses by difficulty level
   * @param difficultyLevel Difficulty level to count
   * @returns Number of courses with specified difficulty level
   */
  countByDifficultyLevel(difficultyLevel: string): Promise<number>;
  
  /**
   * Get common includes for eager loading relations
   * @returns Array of Sequelize include options
   */
  getCommonIncludes(): Includeable[];
}

export default ICourseRepository;