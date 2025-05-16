// src/db/repositories/course/CourseRepository.ts
import { FindOptions, WhereOptions, Op, Includeable } from 'sequelize';
import { ICourseRepository } from './ICourseRepository';
import { BaseRepository } from '../base/BaseRepository';
import { Course, CourseDifficultyLevel } from '../../models/course.model';
import { Artist } from '../../models/artist.model';
import { Category } from '../../models/category.model';
import { CourseAudio } from '../../models/courseAudio.model';
import { Audio } from '../../models/audio.model';
import { User } from '../../models/user.model';
import { PaginationOptions, PaginationResult } from '../../../types/pagination';
import { DatabaseError } from '../../../utils/errors';
import logger from '../../../utils/logger';

/**
 * Course repository implementation
 */
export class CourseRepository extends BaseRepository<Course> implements ICourseRepository {
  constructor() {
    super(Course);
  }

  /**
   * Find courses by artist ID with pagination
   */
  async findByArtistId(
    artistId: number,
    pagination: PaginationOptions,
    options: FindOptions = {}
  ): Promise<PaginationResult<Course>> {
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
      logger.error(`Error finding courses by artist ID ${artistId}:`, error);
      throw new DatabaseError(`Failed to find courses by artist ID`, error as Error);
    }
  }
  
  /**
   * Find courses by category ID with pagination
   */
  async findByCategoryId(
    categoryId: number,
    pagination: PaginationOptions,
    options: FindOptions = {}
  ): Promise<PaginationResult<Course>> {
    try {
      const where = {
        ...(options.where || {}),
        categoryId,
      };
      
      return await this.findAllPaginated(pagination, {
        ...options,
        where,
        include: options.include || this.getCommonIncludes(),
      });
    } catch (error) {
      logger.error(`Error finding courses by category ID ${categoryId}:`, error);
      throw new DatabaseError(`Failed to find courses by category ID`, error as Error);
    }
  }
  
  /**
   * Find approved courses with pagination
   */
  async findApproved(
    pagination: PaginationOptions,
    options: FindOptions = {}
  ): Promise<PaginationResult<Course>> {
    try {
      const where = {
        ...(options.where || {}),
        isApproved: true,
      };
      
      return await this.findAllPaginated(pagination, {
        ...options,
        where,
        include: options.include || this.getCommonIncludes(),
      });
    } catch (error) {
      logger.error('Error finding approved courses:', error);
      throw new DatabaseError('Failed to find approved courses', error as Error);
    }
  }
  
  /**
   * Find pending approval courses with pagination
   */
  async findPendingApproval(
    pagination: PaginationOptions,
    options: FindOptions = {}
  ): Promise<PaginationResult<Course>> {
    try {
      const where = {
        ...(options.where || {}),
        isApproved: false,
      };
      
      return await this.findAllPaginated(pagination, {
        ...options,
        where,
        include: options.include || this.getCommonIncludes(),
      });
    } catch (error) {
      logger.error('Error finding pending approval courses:', error);
      throw new DatabaseError('Failed to find pending approval courses', error as Error);
    }
  }
  
  /**
   * Search courses by title or description with pagination
   */
  async search(
    searchTerm: string,
    pagination: PaginationOptions,
    options: FindOptions = {}
  ): Promise<PaginationResult<Course>> {
    try {
      const where = {
        ...(options.where || {}),
        [Op.or]: [
          { title: { [Op.like]: `%${searchTerm}%` } },
          { description: { [Op.like]: `%${searchTerm}%` } },
        ],
        // Only show approved courses in search results
        isApproved: true,
      };
      
      return await this.findAllPaginated(pagination, {
        ...options,
        where,
        include: options.include || this.getCommonIncludes(),
      });
    } catch (error) {
      logger.error(`Error searching courses with term "${searchTerm}":`, error);
      throw new DatabaseError('Failed to search courses', error as Error);
    }
  }
  
  /**
   * Count courses by difficulty level
   */
  async countByDifficultyLevel(difficultyLevel: string): Promise<number> {
    try {
      return await this.model.count({
        where: {
          difficultyLevel,
          isApproved: true,
        },
      });
    } catch (error) {
      logger.error(`Error counting courses by difficulty level ${difficultyLevel}:`, error);
      throw new DatabaseError('Failed to count courses by difficulty level', error as Error);
    }
  }
  
  /**
   * Get common includes for eager loading relations
   */
  getCommonIncludes(): Includeable[] {
    return [
      {
        model: Artist,
        attributes: ['id', 'bio', 'isVerified'],
        include: [
          {
            model: User,
            attributes: ['id', 'fullName', 'profileImage'],
          },
        ],
      },
      {
        model: Category,
        attributes: ['id', 'name'],
      },
      {
        model: CourseAudio,
        attributes: ['id', 'orderPosition', 'sectionTitle', 'addedAt'],
        include: [
          {
            model: Audio,
            attributes: ['id', 'title', 'coverImage', 'duration', 'uploadDate'],
          },
        ],
        separate: true,
      },
    ];
  }
}

export default CourseRepository;