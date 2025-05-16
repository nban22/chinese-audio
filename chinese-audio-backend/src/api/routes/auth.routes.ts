// backend/src/api/routes/auth.routes.ts
import { Router } from 'express';
import { controllers } from '../controllers';
import authValidation from '../middlewares/validation/authValidation';
import authMiddleware from '../middlewares/auth/authMiddleware';

const router = Router();
const { authController } = controllers;

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post(
  '/register',
  authValidation.register,
  authController.register.bind(authController)
);

/**
 * @route   POST /api/auth/login
 * @desc    Login user and return token
 * @access  Public
 */
router.post(
  '/login',
  authValidation.login,
  authController.login.bind(authController)
);

/**
 * @route   POST /api/auth/refresh
 * @desc    Refresh access token using refresh token
 * @access  Public
 */
router.post(
  '/refresh',
  authValidation.refreshToken,
  authController.refreshToken.bind(authController)
);

/**
 * @route   POST /api/auth/forgot-password
 * @desc    Send password reset email
 * @access  Public
 */
router.post(
  '/forgot-password',
  authValidation.forgotPassword,
  authController.forgotPassword.bind(authController)
);

/**
 * @route   POST /api/auth/reset-password
 * @desc    Reset password with token
 * @access  Public
 */
router.post(
  '/reset-password',
  authValidation.resetPassword,
  authController.resetPassword.bind(authController)
);

/**
 * @route   PUT /api/auth/change-password
 * @desc    Change user password
 * @access  Private
 */
router.put(
  '/change-password',
  authMiddleware.authenticate,
  authValidation.changePassword,
  authController.changePassword.bind(authController)
);

export default router;