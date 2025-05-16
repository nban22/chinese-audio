// src/db/repositories/courseAudio/ICourseAudioRepository.ts
import { FindOptions, WhereOptions } from 'sequelize';
import { IBaseRepository } from '../base/IBaseRepository';
import { CourseAudio } from '../../models/courseAudio.model';

/**
 * CourseAudio repository interface that extends base repository
 */
export interface ICourseAudioRepository extends IBaseRepository<CourseAudio> {
  /**
   * Find CourseAudio records by course ID
   * @param courseId Course ID
   * @param options Additional Sequelize find options
   * @returns Array of course audio entries
   */
  findByCourseId(courseId: number, options?: FindOptions): Promise<CourseAudio[]>;
  
  /**
   * Find CourseAudio record by course ID and audio ID
   * @param courseId Course ID
   * @param audioId Audio ID
   * @param options Additional Sequelize find options
   * @returns Found course audio entry or null
   */
  findByCourseIdAndAudioId(courseId: number, audioId: number, options?: FindOptions): Promise<CourseAudio | null>;
  
  /**
   * Get the maximum order position in a course
   * @param courseId Course ID
   * @returns Maximum position value or 0 if course is empty
   */
  getMaxPosition(courseId: number): Promise<number>;
  
  /**
   * Shift positions of course audios to make room for a new entry
   * @param courseId Course ID
   * @param position Position from which to shift
   * @returns Number of affected rows
   */
  shiftPositions(courseId: number, position: number): Promise<number>;
  
  /**
   * Shift positions of course audios within a range
   * @param courseId Course ID
   * @param startPosition Start of position range (inclusive)
   * @param endPosition End of position range (inclusive)
   * @param shiftAmount Amount to shift positions by (positive or negative)
   * @returns Number of affected rows
   */
  shiftPositionsRange(
    courseId: number,
    startPosition: number,
    endPosition: number,
    shiftAmount: number
  ): Promise<number>;
  
  /**
   * Normalize positions after removal (ensuring sequential ordering)
   * @param courseId Course ID
   * @returns Number of affected rows
   */
  normalizePositions(courseId: number): Promise<number>;
  
  /**
   * Delete all CourseAudio entries for a specific course
   * @param courseId Course ID
   * @returns Number of deleted rows
   */
  deleteByCourseId(courseId: number): Promise<number>;
}

export default ICourseAudioRepository;