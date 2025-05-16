// src/db/repositories/feedback/FeedbackRepository.ts
import { FindOptions, WhereOptions, Op, Includeable } from 'sequelize';
import { IFeedbackRepository } from './IFeedbackRepository';
import { BaseRepository } from '../base/BaseRepository';
import { Feedback, FeedbackType } from '../../models/feedback.model';
import { User } from '../../models/user.model';
import { Audio } from '../../models/audio.model';
import { Artist } from '../../models/artist.model';
import { PaginationOptions, PaginationResult } from '../../../types/pagination';
import { DatabaseError } from '../../../utils/errors';
import logger from '../../../utils/logger';

/**
 * Feedback repository implementation
 */
export class FeedbackRepository extends BaseRepository<Feedback> implements IFeedbackRepository {
  constructor() {
    super(Feedback);
  }

  /**
   * Find feedback by user ID with pagination
   */
  async findByUserId(
    userId: number,
    pagination: PaginationOptions,
    options: FindOptions = {}
  ): Promise<PaginationResult<Feedback>> {
    try {
      const where = {
        ...(options.where || {}),
        userId,
      };
      
      return await this.findAllPaginated(pagination, {
        ...options,
        where,
        include: options.include || this.getCommonIncludes(),
      });
    } catch (error) {
      logger.error(`Error finding feedback by user ID ${userId}:`, error);
      throw new DatabaseError(`Failed to find feedback by user ID`, error as Error);
    }
  }
  
  /**
   * Find feedback by audio ID with pagination
   */
  async findByAudioId(
    audioId: number,
    pagination: PaginationOptions,
    options: FindOptions = {}
  ): Promise<PaginationResult<Feedback>> {
    try {
      const where = {
        ...(options.where || {}),
        audioId,
      };
      
      return await this.findAllPaginated(pagination, {
        ...options,
        where,
        include: options.include || this.getCommonIncludes(),
      });
    } catch (error) {
      logger.error(`Error finding feedback by audio ID ${audioId}:`, error);
      throw new DatabaseError(`Failed to find feedback by audio ID`, error as Error);
    }
  }
  
  /**
   * Find feedback by artist ID with pagination
   */
  async findByArtistId(
    artistId: number,
    pagination: PaginationOptions,
    options: FindOptions = {}
  ): Promise<PaginationResult<Feedback>> {
    try {
      const where = {
        ...(options.where || {}),
        artistId,
      };
      
      return await this.findAllPaginated(pagination, {
        ...options,
        where,
        include: options.include || this.getCommonIncludes(),
      });
    } catch (error) {
      logger.error(`Error finding feedback by artist ID ${artistId}:`, error);
      throw new DatabaseError(`Failed to find feedback by artist ID`, error as Error);
    }
  }
  
  /**
   * Find feedback by resolution status with pagination
   */
  async findByResolutionStatus(
    isResolved: boolean,
    pagination: PaginationOptions,
    options: FindOptions = {}
  ): Promise<PaginationResult<Feedback>> {
    try {
      const where = {
        ...(options.where || {}),
        isResolved,
      };
      
      return await this.findAllPaginated(pagination, {
        ...options,
        where,
        include: options.include || this.getCommonIncludes(),
      });
    } catch (error) {
      logger.error(`Error finding feedback by resolution status ${isResolved}:`, error);
      throw new DatabaseError(`Failed to find feedback by resolution status`, error as Error);
    }
  }
  
  /**
   * Find feedback by type with pagination
   */
  async findByType(
    feedbackType: FeedbackType,
    pagination: PaginationOptions,
    options: FindOptions = {}
  ): Promise<PaginationResult<Feedback>> {
    try {
      const where = {
        ...(options.where || {}),
        feedbackType,
      };
      
      return await this.findAllPaginated(pagination, {
        ...options,
        where,
        include: options.include || this.getCommonIncludes(),
      });
    } catch (error) {
      logger.error(`Error finding feedback by type ${feedbackType}:`, error);
      throw new DatabaseError(`Failed to find feedback by type`, error as Error);
    }
  }
  
  /**
   * Get common includes for eager loading relations
   */
  getCommonIncludes(): Includeable[] {
    return [
      {
        model: User,
        attributes: ['id', 'fullName', 'email', 'profileImage'],
      },
      {
        model: Audio,
        attributes: ['id', 'title', 'artistId'],
        required: false,
      },
      {
        model: Artist,
        attributes: ['id', 'bio', 'isVerified'],
        required: false,
      },
    ];
  }
}

export default FeedbackRepository;