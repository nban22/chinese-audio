// backend/src/api/routes/user.routes.ts
import { Router } from 'express';
import { controllers } from '../controllers';
import { userValidation } from '../middlewares/validation';
import authMiddleware from '../middlewares/auth/authMiddleware';

const router = Router();
const { userController } = controllers;

/**
 * @route   GET /api/users/profile
 * @desc    Get user profile
 * @access  Private
 */
router.get(
  '/profile',
  authMiddleware.authenticate,
  userController.getCurrentUser.bind(userController)
);

/**
 * @route   PUT /api/users/profile
 * @desc    Update user profile
 * @access  Private
 */
router.put(
  '/profile',
  authMiddleware.authenticate,
  userValidation.updateProfile,
  userController.updateProfile.bind(userController)
);

/**
 * @route   GET /api/users/:id
 * @desc    Get user by ID (admin only)
 * @access  Private (Admin only)
 */
router.get(
  '/:id',
  authMiddleware.authenticate,
  authMiddleware.requireAdmin,
  userController.getUserById.bind(userController)
);

/**
 * @route   GET /api/users
 * @desc    Get all users (admin only)
 * @access  Private (Admin only)
 */
router.get(
  '/',
  authMiddleware.authenticate,
  authMiddleware.requireAdmin,
  userController.getAllUsers.bind(userController)
);

/**
 * @route   PUT /api/users/:id
 * @desc    Update user by ID (admin only)
 * @access  Private (Admin only)
 */
router.put(
  '/:id',
  authMiddleware.authenticate,
  authMiddleware.requireAdmin,
  userValidation.updateProfile,
  userController.updateUser.bind(userController)
);

/**
 * @route   PATCH /api/users/:id/status
 * @desc    Set user active status (admin only)
 * @access  Private (Admin only)
 */
router.patch(
  '/:id/status',
  authMiddleware.authenticate,
  authMiddleware.requireAdmin,
  userController.setUserActiveStatus.bind(userController)
);

/**
 * @route   DELETE /api/users/:id
 * @desc    Delete user (admin only)
 * @access  Private (Admin only)
 */
router.delete(
  '/:id',
  authMiddleware.authenticate,
  authMiddleware.requireAdmin,
  userController.deleteUser.bind(userController)
);

/**
 * @route   GET /api/users/search
 * @desc    Search users (admin only)
 * @access  Private (Admin only)
 */
router.get(
  '/search',
  authMiddleware.authenticate,
  authMiddleware.requireAdmin,
  userController.searchUsers.bind(userController)
);

export default router;