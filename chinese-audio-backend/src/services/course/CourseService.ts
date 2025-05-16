
// src/services/course/CourseService.ts
import { ICourseService, CourseCreateData, CourseUpdateData, CourseAudioAddOptions } from './ICourseService';
import { PaginationOptions, PaginationResult } from '../../types/pagination';
import { NotFoundError, ValidationError, ForbiddenError } from '../../utils/errors';
import logger from '../../utils/logger';

export class CourseService implements ICourseService {
  constructor(
    private readonly courseRepository: any,
    private readonly courseAudioRepository: any,
    private readonly audioRepository: any
  ) {}

  /**
   * Get all courses with pagination and filters
   */
  public async getAllCourses(options: PaginationOptions, filters?: any): Promise<PaginationResult<any>> {
    try {
      return await this.courseRepository.findAll(options, filters);
    } catch (error) {
      logger.error('Error in getAllCourses service:', error);
      throw error;
    }
  }

  /**
   * Get course by ID
   */
  public async getCourseById(courseId: number): Promise<any> {
    try {
      const course = await this.courseRepository.findById(courseId);
      
      if (!course) {
        return null;
      }
      
      // Get course audios
      const courseAudios = await this.courseAudioRepository.findByCourseId(courseId);
      
      // Return course with audios
      return {
        ...course,
        audios: courseAudios,
      };
    } catch (error) {
      logger.error(`Error in getCourseById service for ID ${courseId}:`, error);
      throw error;
    }
  }

  /**
   * Get courses by artist ID
   */
  public async getCoursesByArtistId(artistId: number, options: PaginationOptions): Promise<PaginationResult<any>> {
    try {
      return await this.courseRepository.findByArtistId(artistId, options);
    } catch (error) {
      logger.error(`Error in getCoursesByArtistId service for artist ID ${artistId}:`, error);
      throw error;
    }
  }

  /**
   * Get courses by category ID
   */
  public async getCoursesByCategoryId(categoryId: number, options: PaginationOptions): Promise<PaginationResult<any>> {
    try {
      return await this.courseRepository.findByCategoryId(categoryId, options);
    } catch (error) {
      logger.error(`Error in getCoursesByCategoryId service for category ID ${categoryId}:`, error);
      throw error;
    }
  }

  /**
   * Create course
   */
  public async createCourse(courseData: CourseCreateData): Promise<any> {
    try {
      // Validate price if premium
      if (courseData.isPremium && (courseData.price === undefined || courseData.price <= 0)) {
        throw new ValidationError({ price: 'Premium courses must have a valid price' });
      }
      
      // Create course
      const course = await this.courseRepository.create(courseData);
      
      return course;
    } catch (error) {
      logger.error('Error in createCourse service:', error);
      throw error;
    }
  }

  /**
   * Update course
   */
  public async updateCourse(courseId: number, updateData: CourseUpdateData): Promise<any> {
    try {
      // Check if course exists
      const course = await this.courseRepository.findById(courseId);
      
      if (!course) {
        throw new NotFoundError('Course not found');
      }
      
      // Validate price if premium
      if (updateData.isPremium && (updateData.price === undefined || updateData.price <= 0) && 
          (!course.price || course.price <= 0)) {
        throw new ValidationError({ price: 'Premium courses must have a valid price' });
      }
      
      // Update course
      const updatedCourse = await this.courseRepository.update(courseId, updateData);
      
      return updatedCourse;
    } catch (error) {
      logger.error(`Error in updateCourse service for ID ${courseId}:`, error);
      throw error;
    }
  }

  /**
   * Delete course
   */
  public async deleteCourse(courseId: number): Promise<boolean> {
    try {
      // Check if course exists
      const course = await this.courseRepository.findById(courseId);
      
      if (!course) {
        throw new NotFoundError('Course not found');
      }
      
      // Delete course audios first
      await this.courseAudioRepository.deleteByCourseId(courseId);
      
      // Delete course
      await this.courseRepository.delete(courseId);
      
      return true;
    } catch (error) {
      logger.error(`Error in deleteCourse service for ID ${courseId}:`, error);
      throw error;
    }
  }

  /**
   * Add audio to course
   */
  public async addAudioToCourse(courseId: number, audioId: number, options?: CourseAudioAddOptions): Promise<any> {
    try {
      // Check if course exists
      const course = await this.courseRepository.findById(courseId);
      
      if (!course) {
        throw new NotFoundError('Course not found');
      }
      
      // Check if audio exists
      const audio = await this.audioRepository.findById(audioId);
      
      if (!audio) {
        throw new NotFoundError('Audio not found');
      }
      
      // Check if audio already exists in course
      const existingCourseAudio = await this.courseAudioRepository.findByCourseIdAndAudioId(courseId, audioId);
      
      if (existingCourseAudio) {
        throw new ValidationError({ audioId: 'Audio already exists in this course' });
      }
      
      // Determine position
      let position = options?.position;
      
      if (position === undefined) {
        // Get the highest position in the course
        const maxPosition = await this.courseAudioRepository.getMaxPosition(courseId);
        position = maxPosition + 1;
      } else {
        // Validate position
        if (position < 0) {
          throw new ValidationError({ position: 'Position must be a non-negative number' });
        }
        
        // If inserting at a specific position, shift existing audios
        await this.courseAudioRepository.shiftPositions(courseId, position);
      }
      
      // Create course audio
      const courseAudio = await this.courseAudioRepository.create({
        courseId,
        audioId,
        position,
        sectionTitle: options?.sectionTitle,
      });
      
      return courseAudio;
    } catch (error) {
      logger.error(`Error in addAudioToCourse service for course ID ${courseId} and audio ID ${audioId}:`, error);
      throw error;
    }
  }

  /**
   * Remove audio from course
   */
  public async removeAudioFromCourse(courseId: number, audioId: number): Promise<boolean> {
    try {
      // Check if course exists
      const course = await this.courseRepository.findById(courseId);
      
      if (!course) {
        throw new NotFoundError('Course not found');
      }
      
      // Check if audio exists in course
      const courseAudio = await this.courseAudioRepository.findByCourseIdAndAudioId(courseId, audioId);
      
      if (!courseAudio) {
        throw new NotFoundError('Audio not found in this course');
      }
      
      // Delete course audio
      await this.courseAudioRepository.delete(courseAudio.id);
      
      // Reorder remaining audios
      await this.courseAudioRepository.normalizePositions(courseId);
      
      return true;
    } catch (error) {
      logger.error(`Error in removeAudioFromCourse service for course ID ${courseId} and audio ID ${audioId}:`, error);
      throw error;
    }
  }

  /**
   * Reorder audio in course
   */
  public async reorderCourseAudio(courseId: number, audioId: number, newPosition: number, sectionTitle?: string): Promise<boolean> {
    try {
      // Check if course exists
      const course = await this.courseRepository.findById(courseId);
      
      if (!course) {
        throw new NotFoundError('Course not found');
      }
      
      // Check if audio exists in course
      const courseAudio = await this.courseAudioRepository.findByCourseIdAndAudioId(courseId, audioId);
      
      if (!courseAudio) {
        throw new NotFoundError('Audio not found in this course');
      }
      
      // Validate position
      if (newPosition < 0) {
        throw new ValidationError({ position: 'Position must be a non-negative number' });
      }
      
      // Get current position
      const currentPosition = courseAudio.position;
      
      // If position is the same, only update section title if needed
      if (currentPosition === newPosition && sectionTitle === undefined) {
        return true;
      }
      
      // Update position and optionally section title
      if (currentPosition !== newPosition) {
        // Shift other audios
        if (currentPosition < newPosition) {
          // Moving down, shift audios between current and new position up
          await this.courseAudioRepository.shiftPositionsRange(courseId, currentPosition + 1, newPosition, -1);
        } else {
          // Moving up, shift audios between new and current position down
          await this.courseAudioRepository.shiftPositionsRange(courseId, newPosition, currentPosition - 1, 1);
        }
      }
      
      // Update the course audio
      const updateData: any = { position: newPosition };
      
      if (sectionTitle !== undefined) {
        updateData.sectionTitle = sectionTitle;
      }
      
      await this.courseAudioRepository.update(courseAudio.id, updateData);
      
      return true;
    } catch (error) {
      logger.error(`Error in reorderCourseAudio service for course ID ${courseId} and audio ID ${audioId}:`, error);
      throw error;
    }
  }
}

export default CourseService;

