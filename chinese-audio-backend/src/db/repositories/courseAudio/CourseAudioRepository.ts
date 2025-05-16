// src/db/repositories/courseAudio/CourseAudioRepository.ts
import { FindOptions, WhereOptions, Op, literal } from 'sequelize';
import { ICourseAudioRepository } from './ICourseAudioRepository';
import { BaseRepository } from '../base/BaseRepository';
import { CourseAudio } from '../../models/courseAudio.model';
import { Audio } from '../../models/audio.model';
import { DatabaseError } from '../../../utils/errors';
import logger from '../../../utils/logger';

/**
 * CourseAudio repository implementation
 */
export class CourseAudioRepository extends BaseRepository<CourseAudio> implements ICourseAudioRepository {
  constructor() {
    super(CourseAudio);
  }

  /**
   * Find CourseAudio records by course ID
   */
  async findByCourseId(courseId: number, options: FindOptions = {}): Promise<CourseAudio[]> {
    try {
      return await this.model.findAll({
        ...options,
        where: {
          ...(options.where || {}),
          courseId,
        },
        order: [['orderPosition', 'ASC']],
        include: options.include || [
          {
            model: Audio,
            attributes: ['id', 'title', 'coverImage', 'duration', 'uploadDate', 'artistId', 'isPremium'],
          },
        ],
      });
    } catch (error) {
      logger.error(`Error finding CourseAudio by course ID ${courseId}:`, error);
      throw new DatabaseError(`Failed to find course audios`, error as Error);
    }
  }
  
  /**
   * Find CourseAudio record by course ID and audio ID
   */
  async findByCourseIdAndAudioId(
    courseId: number,
    audioId: number,
    options: FindOptions = {}
  ): Promise<CourseAudio | null> {
    try {
      return await this.model.findOne({
        ...options,
        where: {
          ...(options.where || {}),
          courseId,
          audioId,
        },
      });
    } catch (error) {
      logger.error(`Error finding CourseAudio by course ID ${courseId} and audio ID ${audioId}:`, error);
      throw new DatabaseError(`Failed to find course audio`, error as Error);
    }
  }
  
  /**
   * Get the maximum order position in a course
   */
  async getMaxPosition(courseId: number): Promise<number> {
    try {
      const result = await this.model.findOne({
        where: { courseId },
        attributes: [[literal('MAX(order_position)'), 'maxPosition']],
        raw: true,
      }) as any;
      
      return result?.maxPosition || 0;
    } catch (error) {
      logger.error(`Error getting max position for course ID ${courseId}:`, error);
      throw new DatabaseError(`Failed to get max position`, error as Error);
    }
  }
  
  /**
   * Shift positions of course audios to make room for a new entry
   */
  async shiftPositions(courseId: number, position: number): Promise<number> {
    try {
      const [affectedRows] = await this.model.update(
        { orderPosition: literal('order_position + 1') },
        {
          where: {
            courseId,
            orderPosition: { [Op.gte]: position },
          },
        }
      );
      
      return affectedRows;
    } catch (error) {
      logger.error(`Error shifting positions for course ID ${courseId} at position ${position}:`, error);
      throw new DatabaseError(`Failed to shift positions`, error as Error);
    }
  }
  
  /**
   * Shift positions of course audios within a range
   */
  async shiftPositionsRange(
    courseId: number,
    startPosition: number,
    endPosition: number,
    shiftAmount: number
  ): Promise<number> {
    try {
      const [affectedRows] = await this.model.update(
        { orderPosition: literal(`order_position + ${shiftAmount}`) },
        {
          where: {
            courseId,
            orderPosition: { [Op.between]: [startPosition, endPosition] },
          },
        }
      );
      
      return affectedRows;
    } catch (error) {
      logger.error(`Error shifting positions range for course ID ${courseId}:`, error);
      throw new DatabaseError(`Failed to shift positions range`, error as Error);
    }
  }
  
  /**
   * Normalize positions after removal (ensuring sequential ordering)
   */
  async normalizePositions(courseId: number): Promise<number> {
    try {
      // This is a more complex operation that requires raw SQL or multiple steps
      // For a proper implementation, a stored procedure or multiple steps would be better
      const sequelize = this.model.sequelize;
      
      if (!sequelize) {
        throw new Error('Sequelize instance not available');
      }
      
      // Get all course audios ordered by position
      const courseAudios = await this.model.findAll({
        where: { courseId },
        order: [['orderPosition', 'ASC']],
        attributes: ['id', 'orderPosition'],
      });
      
      // Update positions to ensure sequential ordering
      let updateCount = 0;
      
      for (let i = 0; i < courseAudios.length; i++) {
        const courseAudio = courseAudios[i];
        
        if (courseAudio.orderPosition !== i + 1) {
          await courseAudio.update({ orderPosition: i + 1 });
          updateCount++;
        }
      }
      
      return updateCount;
    } catch (error) {
      logger.error(`Error normalizing positions for course ID ${courseId}:`, error);
      throw new DatabaseError(`Failed to normalize positions`, error as Error);
    }
  }
  
  /**
   * Delete all CourseAudio entries for a specific course
   */
  async deleteByCourseId(courseId: number): Promise<number> {
    try {
      return await this.model.destroy({
        where: { courseId },
      });
    } catch (error) {
      logger.error(`Error deleting course audios for course ID ${courseId}:`, error);
      throw new DatabaseError(`Failed to delete course audios`, error as Error);
    }
  }
}

export default CourseAudioRepository;