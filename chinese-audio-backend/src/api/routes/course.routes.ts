// backend/src/api/routes/course.routes.ts
import { Router } from 'express';
import { controllers } from '../controllers';
import authMiddleware from '../middlewares/auth/authMiddleware';
import { courseValidation } from '../middlewares/validation';

const router = Router();
const { courseController } = controllers;

/**
 * @route   GET /api/courses
 * @desc    Get all courses with pagination and filtering
 * @access  Public
 */
router.get(
  '/',
  authMiddleware.optionalAuth,
  courseController.getAllCourses.bind(courseController)
);

/**
 * @route   GET /api/courses/:id
 * @desc    Get course by ID
 * @access  Public/Private (depends on approval status)
 */
router.get(
  '/:id',
  authMiddleware.optionalAuth,
  courseController.getCourseById.bind(courseController)
);

/**
 * @route   GET /api/courses/categories/:categoryId
 * @desc    Get courses by category
 * @access  Public
 */
router.get(
  '/categories/:categoryId',
  courseController.getCoursesByCategory.bind(courseController)
);

/**
 * @route   POST /api/courses
 * @desc    Create new course
 * @access  Private (Artist only)
 */
router.post(
  '/',
  authMiddleware.authenticate,
  authMiddleware.requireArtist,
  courseValidation.createCourse,
  courseController.createCourse.bind(courseController)
);

/**
 * @route   PUT /api/courses/:id
 * @desc    Update course
 * @access  Private (Owner or Admin)
 */
router.put(
  '/:id',
  authMiddleware.authenticate,
  courseValidation.updateCourse,
  courseController.updateCourse.bind(courseController)
);

/**
 * @route   DELETE /api/courses/:id
 * @desc    Delete course
 * @access  Private (Owner or Admin)
 */
router.delete(
  '/:id',
  authMiddleware.authenticate,
  courseController.deleteCourse.bind(courseController)
);

/**
 * @route   POST /api/courses/:id/audios
 * @desc    Add audio to course
 * @access  Private (Owner or Admin)
 */
router.post(
  '/:id/audios',
  authMiddleware.authenticate,
  courseValidation.addAudioToCourse,
  courseController.addAudioToCourse.bind(courseController)
);

/**
 * @route   DELETE /api/courses/:id/audios/:audioId
 * @desc    Remove audio from course
 * @access  Private (Owner or Admin)
 */
router.delete(
  '/:id/audios/:audioId',
  authMiddleware.authenticate,
  courseController.removeAudioFromCourse.bind(courseController)
);

/**
 * @route   PUT /api/courses/:id/audios/:audioId/reorder
 * @desc    Reorder audio in course
 * @access  Private (Owner or Admin)
 */
router.put(
  '/:id/audios/:audioId/reorder',
  authMiddleware.authenticate,
  courseValidation.reorderCourseAudio,
  courseController.reorderCourseAudio.bind(courseController)
);

export default router;