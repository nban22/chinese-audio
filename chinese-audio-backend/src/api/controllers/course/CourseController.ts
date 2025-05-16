// src/api/controllers/course/CourseController.ts
import { Request, Response } from 'express';
import { ICourseService } from '../../../services/course/ICourseService';
import ApiResponse from '../../../utils/response';
import { PaginationOptions } from '../../../types/pagination';
import { NotFoundError, ValidationError, ForbiddenError } from '../../../utils/errors';
import logger from '../../../utils/logger';
import config from '../../../config';

/**
 * Controller for handling course-related requests
 */
export class CourseController {
  constructor(private readonly courseService: ICourseService) {}

  /**
   * Get all courses with pagination
   * GET /api/courses
   */
  public async getAllCourses(req: Request, res: Response): Promise<Response> {
    try {
      const page = parseInt(req.query.page as string) || config.pagination.defaultPage;
      const limit = parseInt(req.query.limit as string) || config.pagination.defaultLimit;
      const options: PaginationOptions = { page, limit };
      
      // Extract filters from query params
      const filters: Record<string, any> = {};
      
      if (req.query.isPremium !== undefined) {
        filters.isPremium = req.query.isPremium === 'true';
      }
      
      if (req.query.difficultyLevel) {
        filters.difficultyLevel = req.query.difficultyLevel;
      }
      
      if (req.query.categoryId) {
        filters.categoryId = parseInt(req.query.categoryId as string);
      }
      
      const result = await this.courseService.getAllCourses(options, filters);
      
      return ApiResponse.paginatedSuccess(res, result);
    } catch (error) {
      logger.error('Error in getAllCourses controller:', error);
      
      if (error instanceof ValidationError) {
        return ApiResponse.fail(res, error.data, error.message);
      }
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch courses';
      return ApiResponse.error(res, errorMessage);
    }
  }

  /**
   * Get course by ID
   * GET /api/courses/:id
   */
  public async getCourseById(req: Request, res: Response): Promise<Response> {
    try {
      const courseId = parseInt(req.params.id);
      
      if (isNaN(courseId)) {
        return ApiResponse.fail(res, { id: 'Invalid course ID' }, 'Validation failed');
      }
      
      const course = await this.courseService.getCourseById(courseId);
      
      if (!course) {
        return ApiResponse.notFound(res, 'Course not found');
      }
      
      // Check if the course is approved
      const isUserOwner = req.user?.artistId === course.artistId;
      const isAdmin = req.user?.role === 'admin';
      
      if (!course.isApproved && !isUserOwner && !isAdmin) {
        return ApiResponse.forbidden(res, 'This course is not approved yet');
      }
      
      return ApiResponse.success(res, course);
    } catch (error) {
      logger.error(`Error in getCourseById controller for ID ${req.params.id}:`, error);
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch course';
      return ApiResponse.error(res, errorMessage);
    }
  }

  /**
   * Get courses by artist
   * GET /api/artists/:artistId/courses
   */
  public async getCoursesByArtist(req: Request, res: Response): Promise<Response> {
    try {
      const artistId = parseInt(req.params.artistId);
      
      if (isNaN(artistId)) {
        return ApiResponse.fail(res, { artistId: 'Invalid artist ID' }, 'Validation failed');
      }
      
      const page = parseInt(req.query.page as string) || config.pagination.defaultPage;
      const limit = parseInt(req.query.limit as string) || config.pagination.defaultLimit;
      const options: PaginationOptions = { page, limit };
      
      const result = await this.courseService.getCoursesByArtistId(artistId, options);
      
      return ApiResponse.paginatedSuccess(res, result);
    } catch (error) {
      logger.error(`Error in getCoursesByArtist controller for artist ID ${req.params.artistId}:`, error);
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch artist courses';
      return ApiResponse.error(res, errorMessage);
    }
  }

  /**
   * Get courses by category
   * GET /api/categories/:categoryId/courses
   */
  public async getCoursesByCategory(req: Request, res: Response): Promise<Response> {
    try {
      const categoryId = parseInt(req.params.categoryId);
      
      if (isNaN(categoryId)) {
        return ApiResponse.fail(res, { categoryId: 'Invalid category ID' }, 'Validation failed');
      }
      
      const page = parseInt(req.query.page as string) || config.pagination.defaultPage;
      const limit = parseInt(req.query.limit as string) || config.pagination.defaultLimit;
      const options: PaginationOptions = { page, limit };
      
      const result = await this.courseService.getCoursesByCategoryId(categoryId, options);
      
      return ApiResponse.paginatedSuccess(res, result);
    } catch (error) {
      logger.error(`Error in getCoursesByCategory controller for category ID ${req.params.categoryId}:`, error);
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch category courses';
      return ApiResponse.error(res, errorMessage);
    }
  }

  /**
   * Create new course
   * POST /api/courses
   */
  public async createCourse(req: Request, res: Response): Promise<Response> {
    try {
      // Validate required fields
      const validationErrors: Record<string, string> = {};
      
      if (!req.body.title) {
        validationErrors.title = 'Title is required';
      }
      
      if (!req.body.difficultyLevel) {
        validationErrors.difficultyLevel = 'Difficulty level is required';
      }
      
      if (Object.keys(validationErrors).length > 0) {
        return ApiResponse.fail(res, validationErrors, 'Validation failed');
      }
      
      // Set artist ID from authenticated user
      const artistId = req.user?.artistId;
      
      if (!artistId) {
        return ApiResponse.forbidden(res, 'Only artists can create courses');
      }
      
      // Prepare course data
      const courseData = {
        ...req.body,
        artistId,
        isApproved: false, // Courses require admin approval
      };
      
      const createdCourse = await this.courseService.createCourse(courseData);
      
      return ApiResponse.success(res, createdCourse, 'Course created successfully', 201);
    } catch (error) {
      logger.error('Error in createCourse controller:', error);
      
      if (error instanceof ValidationError) {
        return ApiResponse.fail(res, error.data, error.message);
      }
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to create course';
      return ApiResponse.error(res, errorMessage);
    }
  }

  /**
   * Update course
   * PUT /api/courses/:id
   */
  public async updateCourse(req: Request, res: Response): Promise<Response> {
    try {
      const courseId = parseInt(req.params.id);
      
      if (isNaN(courseId)) {
        return ApiResponse.fail(res, { id: 'Invalid course ID' }, 'Validation failed');
      }
      
      // Get existing course to check ownership
      const existingCourse = await this.courseService.getCourseById(courseId);
      
      if (!existingCourse) {
        return ApiResponse.notFound(res, 'Course not found');
      }
      
      // Check if user is the owner or an admin
      const isUserOwner = req.user?.artistId === existingCourse.artistId;
      const isAdmin = req.user?.role === 'admin';
      
      if (!isUserOwner && !isAdmin) {
        return ApiResponse.forbidden(res, 'You can only update your own courses');
      }
      
      // Only admins can approve courses
      if (req.body.isApproved !== undefined && !isAdmin) {
        return ApiResponse.forbidden(res, 'Only administrators can approve courses');
      }
      
      // Prepare update data
      const updateData = { ...req.body };
      
      // If artist makes changes to approved course, set it back to unapproved
      if (isUserOwner && !isAdmin && existingCourse.isApproved && 
          (updateData.title || updateData.description || updateData.difficultyLevel)) {
        updateData.isApproved = false;
      }
      
      // Remove undefined values
      Object.keys(updateData).forEach(key => 
        updateData[key] === undefined && delete updateData[key]
      );
      
      const updatedCourse = await this.courseService.updateCourse(courseId, updateData);
      
      return ApiResponse.success(res, updatedCourse, 'Course updated successfully');
    } catch (error) {
      logger.error(`Error in updateCourse controller for ID ${req.params.id}:`, error);
      
      if (error instanceof NotFoundError) {
        return ApiResponse.notFound(res, error.message);
      }
      
      if (error instanceof ValidationError) {
        return ApiResponse.fail(res, error.data, error.message);
      }
      
      if (error instanceof ForbiddenError) {
        return ApiResponse.forbidden(res, error.message);
      }
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to update course';
      return ApiResponse.error(res, errorMessage);
    }
  }

  /**
   * Delete course
   * DELETE /api/courses/:id
   */
  public async deleteCourse(req: Request, res: Response): Promise<Response> {
    try {
      const courseId = parseInt(req.params.id);
      
      if (isNaN(courseId)) {
        return ApiResponse.fail(res, { id: 'Invalid course ID' }, 'Validation failed');
      }
      
      // Get existing course to check ownership
      const existingCourse = await this.courseService.getCourseById(courseId);
      
      if (!existingCourse) {
        return ApiResponse.notFound(res, 'Course not found');
      }
      
      // Check if user is the owner or an admin
      const isUserOwner = req.user?.artistId === existingCourse.artistId;
      const isAdmin = req.user?.role === 'admin';
      
      if (!isUserOwner && !isAdmin) {
        return ApiResponse.forbidden(res, 'You can only delete your own courses');
      }
      
      await this.courseService.deleteCourse(courseId);
      
      return ApiResponse.success(res, null, 'Course deleted successfully');
    } catch (error) {
      logger.error(`Error in deleteCourse controller for ID ${req.params.id}:`, error);
      
      if (error instanceof NotFoundError) {
        return ApiResponse.notFound(res, error.message);
      }
      
      if (error instanceof ForbiddenError) {
        return ApiResponse.forbidden(res, error.message);
      }
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete course';
      return ApiResponse.error(res, errorMessage);
    }
  }

  /**
   * Add audio to course
   * POST /api/courses/:id/audios
   */
  public async addAudioToCourse(req: Request, res: Response): Promise<Response> {
    try {
      const courseId = parseInt(req.params.id);
      
      if (isNaN(courseId)) {
        return ApiResponse.fail(res, { id: 'Invalid course ID' }, 'Validation failed');
      }
      
      // Validate audio ID
      const audioId = parseInt(req.body.audioId);
      
      if (!audioId || isNaN(audioId)) {
        return ApiResponse.fail(res, { audioId: 'Valid audio ID is required' }, 'Validation failed');
      }
      
      // Get existing course to check ownership
      const existingCourse = await this.courseService.getCourseById(courseId);
      
      if (!existingCourse) {
        return ApiResponse.notFound(res, 'Course not found');
      }
      
      // Check if user is the owner or an admin
      const isUserOwner = req.user?.artistId === existingCourse.artistId;
      const isAdmin = req.user?.role === 'admin';
      
      if (!isUserOwner && !isAdmin) {
        return ApiResponse.forbidden(res, 'You can only modify your own courses');
      }
      
      // Optional position and section title
      const position = req.body.position ? parseInt(req.body.position) : undefined;
      const sectionTitle = req.body.sectionTitle;
      
      await this.courseService.addAudioToCourse(courseId, audioId, {
        position,
        sectionTitle
      });
      
      // If course was approved, set it back to unapproved after content change
      if (existingCourse.isApproved && !isAdmin) {
        await this.courseService.updateCourse(courseId, { isApproved: false });
      }
      
      return ApiResponse.success(res, { courseId, audioId }, 'Audio added to course successfully');
    } catch (error) {
      logger.error(`Error in addAudioToCourse controller for course ID ${req.params.id}:`, error);
      
      if (error instanceof NotFoundError) {
        return ApiResponse.notFound(res, error.message);
      }
      
      if (error instanceof ValidationError) {
        return ApiResponse.fail(res, error.data, error.message);
      }
      
      if (error instanceof ForbiddenError) {
        return ApiResponse.forbidden(res, error.message);
      }
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to add audio to course';
      return ApiResponse.error(res, errorMessage);
    }
  }

  /**
   * Remove audio from course
   * DELETE /api/courses/:id/audios/:audioId
   */
  public async removeAudioFromCourse(req: Request, res: Response): Promise<Response> {
    try {
      const courseId = parseInt(req.params.id);
      const audioId = parseInt(req.params.audioId);
      
      if (isNaN(courseId)) {
        return ApiResponse.fail(res, { id: 'Invalid course ID' }, 'Validation failed');
      }
      
      if (isNaN(audioId)) {
        return ApiResponse.fail(res, { audioId: 'Invalid audio ID' }, 'Validation failed');
      }
      
      // Get existing course to check ownership
      const existingCourse = await this.courseService.getCourseById(courseId);
      
      if (!existingCourse) {
        return ApiResponse.notFound(res, 'Course not found');
      }
      
      // Check if user is the owner or an admin
      const isUserOwner = req.user?.artistId === existingCourse.artistId;
      const isAdmin = req.user?.role === 'admin';
      
      if (!isUserOwner && !isAdmin) {
        return ApiResponse.forbidden(res, 'You can only modify your own courses');
      }
      
      await this.courseService.removeAudioFromCourse(courseId, audioId);
      
      // If course was approved, set it back to unapproved after content change
      if (existingCourse.isApproved && !isAdmin) {
        await this.courseService.updateCourse(courseId, { isApproved: false });
      }
      
      return ApiResponse.success(res, null, 'Audio removed from course successfully');
    } catch (error) {
      logger.error(`Error in removeAudioFromCourse controller for course ID ${req.params.id} and audio ID ${req.params.audioId}:`, error);
      
      if (error instanceof NotFoundError) {
        return ApiResponse.notFound(res, error.message);
      }
      
      if (error instanceof ForbiddenError) {
        return ApiResponse.forbidden(res, error.message);
      }
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to remove audio from course';
      return ApiResponse.error(res, errorMessage);
    }
  }

  /**
   * Reorder audio in course
   * PUT /api/courses/:id/audios/:audioId/reorder
   */
  public async reorderCourseAudio(req: Request, res: Response): Promise<Response> {
    try {
      const courseId = parseInt(req.params.id);
      const audioId = parseInt(req.params.audioId);
      
      if (isNaN(courseId)) {
        return ApiResponse.fail(res, { id: 'Invalid course ID' }, 'Validation failed');
      }
      
      if (isNaN(audioId)) {
        return ApiResponse.fail(res, { audioId: 'Invalid audio ID' }, 'Validation failed');
      }
      
      // Validate new position
      const newPosition = parseInt(req.body.position);
      
      if (isNaN(newPosition) || newPosition < 0) {
        return ApiResponse.fail(res, { position: 'Valid position is required' }, 'Validation failed');
      }
      
      // Get existing course to check ownership
      const existingCourse = await this.courseService.getCourseById(courseId);
      
      if (!existingCourse) {
        return ApiResponse.notFound(res, 'Course not found');
      }
      
      // Check if user is the owner or an admin
      const isUserOwner = req.user?.artistId === existingCourse.artistId;
      const isAdmin = req.user?.role === 'admin';
      
      if (!isUserOwner && !isAdmin) {
        return ApiResponse.forbidden(res, 'You can only modify your own courses');
      }
      
      // Optional new section title
      const sectionTitle = req.body.sectionTitle;
      
      await this.courseService.reorderCourseAudio(courseId, audioId, newPosition, sectionTitle);
      
      return ApiResponse.success(res, null, 'Audio reordered successfully');
    } catch (error) {
      logger.error(`Error in reorderCourseAudio controller for course ID ${req.params.id} and audio ID ${req.params.audioId}:`, error);
      
      if (error instanceof NotFoundError) {
        return ApiResponse.notFound(res, error.message);
      }
      
      if (error instanceof ValidationError) {
        return ApiResponse.fail(res, error.data, error.message);
      }
      
      if (error instanceof ForbiddenError) {
        return ApiResponse.forbidden(res, error.message);
      }
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to reorder audio in course';
      return ApiResponse.error(res, errorMessage);
    }
  }
}

export default CourseController;