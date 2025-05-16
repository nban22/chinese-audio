// src/db/repositories/feedback/IFeedbackRepository.ts
import { FindOptions, WhereOptions, Includeable } from 'sequelize';
import { IBaseRepository } from '../base/IBaseRepository';
import { Feedback, FeedbackType } from '../../models/feedback.model';
import { PaginationOptions, PaginationResult } from '../../../types/pagination';

/**
 * Feedback repository interface that extends base repository
 */
export interface IFeedbackRepository extends IBaseRepository<Feedback> {
  /**
   * Find feedback by user ID with pagination
   * @param userId User ID
   * @param pagination Pagination options
   * @param options Additional Sequelize find options
   * @returns Paginated result
   */
  findByUserId(
    userId: number,
    pagination: PaginationOptions,
    options?: FindOptions
  ): Promise<PaginationResult<Feedback>>;
  
  /**
   * Find feedback by audio ID with pagination
   * @param audioId Audio ID
   * @param pagination Pagination options
   * @param options Additional Sequelize find options
   * @returns Paginated result
   */
  findByAudioId(
    audioId: number,
    pagination: PaginationOptions,
    options?: FindOptions
  ): Promise<PaginationResult<Feedback>>;
  
  /**
   * Find feedback by artist ID with pagination
   * @param artistId Artist ID
   * @param pagination Pagination options
   * @param options Additional Sequelize find options
   * @returns Paginated result
   */
  findByArtistId(
    artistId: number,
    pagination: PaginationOptions,
    options?: FindOptions
  ): Promise<PaginationResult<Feedback>>;
  
  /**
   * Find feedback by resolution status with pagination
   * @param isResolved Whether the feedback is resolved
   * @param pagination Pagination options
   * @param options Additional Sequelize find options
   * @returns Paginated result
   */
  findByResolutionStatus(
    isResolved: boolean,
    pagination: PaginationOptions,
    options?: FindOptions
  ): Promise<PaginationResult<Feedback>>;
  
  /**
   * Find feedback by type with pagination
   * @param feedbackType Type of feedback
   * @param pagination Pagination options
   * @param options Additional Sequelize find options
   * @returns Paginated result
   */
  findByType(
    feedbackType: FeedbackType,
    pagination: PaginationOptions,
    options?: FindOptions
  ): Promise<PaginationResult<Feedback>>;
  
  /**
   * Get common includes for eager loading relations
   * @returns Array of Sequelize include options
   */
  getCommonIncludes(): Includeable[];
}

export default IFeedbackRepository;