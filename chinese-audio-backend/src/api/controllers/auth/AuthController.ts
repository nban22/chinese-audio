// backend/src/api/controllers/auth/AuthController.ts
import { Request, Response } from 'express';
import { IAuthService, RegistrationData } from '../../../services/auth';
import ApiResponse from '../../../utils/response';
import { ValidationError, UnauthorizedError, NotFoundError } from '../../../utils/errors';
import logger from '../../../utils/logger';

/**
 * Controller for handling authentication-related requests
 */
export class AuthController {
  constructor(private readonly authService: IAuthService) {}

  /**
   * Register a new user
   * POST /api/auth/register
   */
  public async register(req: Request, res: Response): Promise<Response> {
    try {
      // Validation happens in middleware, so we can assume data is valid
      const registrationData: RegistrationData = {
        email: req.body.email,
        password: req.body.password,
        fullName: req.body.fullName,
        phoneNumber: req.body.phoneNumber,
      };

      const authResponse = await this.authService.register(registrationData);

      return ApiResponse.success(
        res,
        authResponse,
        'User registered successfully',
        201
      );
    } catch (error) {
      logger.error('Error in register controller:', error);
      
      if (error instanceof ValidationError) {
        return ApiResponse.fail(res, error.data, error.message);
      }
      
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      return ApiResponse.error(res, errorMessage);
    }
  }

  /**
   * Login user
   * POST /api/auth/login
   */
  public async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;

      // Validate required fields
      if (!email || !password) {
        return ApiResponse.fail(
          res,
          {
            email: !email ? 'Email is required' : undefined,
            password: !password ? 'Password is required' : undefined,
          },
          'Validation failed'
        );
      }

      const authResponse = await this.authService.login(email, password);

      return ApiResponse.success(res, authResponse, 'Login successful');
    } catch (error) {
      logger.error('Error in login controller:', error);
      
      if (error instanceof UnauthorizedError) {
        return ApiResponse.unauthorized(res, error.message);
      }
      
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      return ApiResponse.error(res, errorMessage);
    }
  }

  /**
   * Refresh token
   * POST /api/auth/refresh-token
   */
  public async refreshToken(req: Request, res: Response): Promise<Response> {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return ApiResponse.fail(
          res,
          { refreshToken: 'Refresh token is required' },
          'Validation failed'
        );
      }

      const authResponse = await this.authService.refreshToken(refreshToken);

      return ApiResponse.success(res, authResponse, 'Token refreshed successfully');
    } catch (error) {
      logger.error('Error in refreshToken controller:', error);
      
      if (error instanceof UnauthorizedError) {
        return ApiResponse.unauthorized(res, error.message);
      }
      
      const errorMessage = error instanceof Error ? error.message : 'Token refresh failed';
      return ApiResponse.error(res, errorMessage);
    }
  }

  /**
   * Change password
   * POST /api/auth/change-password
   */
  public async changePassword(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.user?.id;
      const { currentPassword, newPassword } = req.body;

      if (!userId) {
        return ApiResponse.unauthorized(res, 'User not authenticated');
      }

      if (!currentPassword || !newPassword) {
        return ApiResponse.fail(
          res,
          {
            currentPassword: !currentPassword ? 'Current password is required' : undefined,
            newPassword: !newPassword ? 'New password is required' : undefined,
          },
          'Validation failed'
        );
      }

      await this.authService.changePassword(userId, currentPassword, newPassword);

      return ApiResponse.success(res, null, 'Password changed successfully');
    } catch (error) {
      logger.error('Error in changePassword controller:', error);
      
      if (error instanceof ValidationError) {
        return ApiResponse.fail(res, error.data, error.message);
      }
      
      if (error instanceof UnauthorizedError) {
        return ApiResponse.unauthorized(res, error.message);
      }
      
      const errorMessage = error instanceof Error ? error.message : 'Password change failed';
      return ApiResponse.error(res, errorMessage);
    }
  }

  /**
   * Forgot password - send reset link
   * POST /api/auth/forgot-password
   */
  public async forgotPassword(req: Request, res: Response): Promise<Response> {
    try {
      const { email } = req.body;

      if (!email) {
        return ApiResponse.fail(
          res,
          { email: 'Email is required' },
          'Validation failed'
        );
      }

      const resetTokenInfo = await this.authService.generatePasswordResetToken(email);

      // Even if no user was found with that email, we return a success response for security
      if (!resetTokenInfo) {
        return ApiResponse.success(
          res,
          null,
          'If your email exists in our system, you will receive a password reset link'
        );
      }

      // In a real application, you would send an email with the reset token
      // For testing purposes, we'll include the token in the response
      return ApiResponse.success(
        res,
        { 
          message: 'Password reset link has been sent to your email',
          // Only include token in development environments
          ...(process.env.NODE_ENV !== 'production' ? { token: resetTokenInfo.token } : {})
        },
        'Password reset initiated'
      );
    } catch (error) {
      logger.error('Error in forgotPassword controller:', error);
      
      const errorMessage = error instanceof Error ? error.message : 'Password reset failed';
      return ApiResponse.error(res, errorMessage);
    }
  }

  /**
   * Reset password with token
   * POST /api/auth/reset-password
   */
  public async resetPassword(req: Request, res: Response): Promise<Response> {
    try {
      const { token, newPassword } = req.body;

      if (!token || !newPassword) {
        return ApiResponse.fail(
          res,
          {
            token: !token ? 'Reset token is required' : undefined,
            newPassword: !newPassword ? 'New password is required' : undefined,
          },
          'Validation failed'
        );
      }

      await this.authService.resetPassword(token, newPassword);

      return ApiResponse.success(res, null, 'Password has been reset successfully');
    } catch (error) {
      logger.error('Error in resetPassword controller:', error);
      
      if (error instanceof ValidationError) {
        return ApiResponse.fail(res, error.data, error.message);
      }
      
      if (error instanceof UnauthorizedError) {
        return ApiResponse.unauthorized(res, error.message);
      }
      
      const errorMessage = error instanceof Error ? error.message : 'Password reset failed';
      return ApiResponse.error(res, errorMessage);
    }
  }
}

export default AuthController;