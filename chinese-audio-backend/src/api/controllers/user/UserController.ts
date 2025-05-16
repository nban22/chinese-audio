// backend/src/api/controllers/user/UserController.ts
import { Request, Response } from 'express';
import { IUserService, UserUpdateData } from '../../../services/user';
import ApiResponse from '../../../utils/response';
import { PaginationOptions } from '../../../types/pagination';
import { ValidationError, NotFoundError, ForbiddenError } from '../../../utils/errors';
import logger from '../../../utils/logger';
import config from '../../../config';

/**
 * Controller for handling user-related requests
 */
export class UserController {
  constructor(private readonly userService: IUserService) {}

  /**
   * Get current user profile
   * GET /api/users/me
   */
  public async getCurrentUser(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return ApiResponse.unauthorized(res, 'User not authenticated');
      }

      const user = await this.userService.getUserWithDetails(userId);

      if (!user) {
        return ApiResponse.notFound(res, 'User not found');
      }

      return ApiResponse.success(res, user);
    } catch (error) {
      logger.error('Error in getCurrentUser controller:', error);
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to get user profile';
      return ApiResponse.error(res, errorMessage);
    }
  }

  /**
   * Get user by ID
   * GET /api/users/:id
   */
  public async getUserById(req: Request, res: Response): Promise<Response> {
    try {
      const userId = parseInt(req.params.id);
      
      if (isNaN(userId)) {
        return ApiResponse.fail(res, { id: 'Invalid user ID' }, 'Validation failed');
      }
      
      const user = await this.userService.getUserWithDetails(userId);
      
      if (!user) {
        return ApiResponse.notFound(res, 'User not found');
      }
      
      return ApiResponse.success(res, user);
    } catch (error) {
      logger.error(`Error in getUserById controller for ID ${req.params.id}:`, error);
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to get user';
      return ApiResponse.error(res, errorMessage);
    }
  }

  /**
   * Get all users with pagination
   * GET /api/users
   */
  public async getAllUsers(req: Request, res: Response): Promise<Response> {
    try {
      // Check if user is admin (should be done in middleware)
      if (req.user?.role !== 'admin') {
        return ApiResponse.forbidden(res, 'Admin access required');
      }
      
      const page = parseInt(req.query.page as string) || config.pagination.defaultPage;
      const limit = parseInt(req.query.limit as string) || config.pagination.defaultLimit;
      const options: PaginationOptions = { page, limit };
      
      const result = await this.userService.getAllUsers(options);
      
      return ApiResponse.paginatedSuccess(res, result);
    } catch (error) {
      logger.error('Error in getAllUsers controller:', error);
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to get users';
      return ApiResponse.error(res, errorMessage);
    }
  }

  /**
   * Update user profile
   * PUT /api/users/me
   */
  public async updateProfile(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return ApiResponse.unauthorized(res, 'User not authenticated');
      }
      
      // Validation happens in middleware, so we can assume data is valid
      const userData: UserUpdateData = {
        fullName: req.body.fullName,
        phoneNumber: req.body.phoneNumber,
        profileImage: req.body.profileImage,
      };
      
      const updatedUser = await this.userService.updateUser(userId, userData);
      
      if (!updatedUser) {
        return ApiResponse.notFound(res, 'User not found');
      }
      
      return ApiResponse.success(res, updatedUser, 'Profile updated successfully');
    } catch (error) {
      logger.error('Error in updateProfile controller:', error);
      
      if (error instanceof ValidationError) {
        return ApiResponse.fail(res, error.data, error.message);
      }
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to update profile';
      return ApiResponse.error(res, errorMessage);
    }
  }

  /**
   * Update user by ID (admin only)
   * PUT /api/users/:id
   */
  public async updateUser(req: Request, res: Response): Promise<Response> {
    try {
      // Check if user is admin (should be done in middleware)
      if (req.user?.role !== 'admin') {
        return ApiResponse.forbidden(res, 'Admin access required');
      }
      
      const userId = parseInt(req.params.id);
      
      if (isNaN(userId)) {
        return ApiResponse.fail(res, { id: 'Invalid user ID' }, 'Validation failed');
      }
      
      // Validation happens in middleware, so we can assume data is valid
      const userData: UserUpdateData = {
        fullName: req.body.fullName,
        phoneNumber: req.body.phoneNumber,
        profileImage: req.body.profileImage,
      };
      
      const updatedUser = await this.userService.updateUser(userId, userData);
      
      if (!updatedUser) {
        return ApiResponse.notFound(res, 'User not found');
      }
      
      return ApiResponse.success(res, updatedUser, 'User updated successfully');
    } catch (error) {
      logger.error(`Error in updateUser controller for ID ${req.params.id}:`, error);
      
      if (error instanceof ValidationError) {
        return ApiResponse.fail(res, error.data, error.message);
      }
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to update user';
      return ApiResponse.error(res, errorMessage);
    }
  }

  /**
   * Set user active status (admin only)
   * PATCH /api/users/:id/status
   */
  public async setUserActiveStatus(req: Request, res: Response): Promise<Response> {
    try {
      // Check if user is admin (should be done in middleware)
      if (req.user?.role !== 'admin') {
        return ApiResponse.forbidden(res, 'Admin access required');
      }
      
      const userId = parseInt(req.params.id);
      const { isActive } = req.body;
      
      if (isNaN(userId)) {
        return ApiResponse.fail(res, { id: 'Invalid user ID' }, 'Validation failed');
      }
      
      if (typeof isActive !== 'boolean') {
        return ApiResponse.fail(res, { isActive: 'isActive must be a boolean' }, 'Validation failed');
      }
      
      const updatedUser = await this.userService.setUserActiveStatus(userId, isActive);
      
      if (!updatedUser) {
        return ApiResponse.notFound(res, 'User not found');
      }
      
      const statusMessage = isActive ? 'activated' : 'deactivated';
      return ApiResponse.success(res, updatedUser, `User ${statusMessage} successfully`);
    } catch (error) {
      logger.error(`Error in setUserActiveStatus controller for ID ${req.params.id}:`, error);
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to update user status';
      return ApiResponse.error(res, errorMessage);
    }
  }

  /**
   * Delete user (admin only)
   * DELETE /api/users/:id
   */
  public async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      // Check if user is admin (should be done in middleware)
      if (req.user?.role !== 'admin') {
        return ApiResponse.forbidden(res, 'Admin access required');
      }
      
      const userId = parseInt(req.params.id);
      
      if (isNaN(userId)) {
        return ApiResponse.fail(res, { id: 'Invalid user ID' }, 'Validation failed');
      }
      
      // Check if trying to delete self
      if (userId === req.user?.id) {
        return ApiResponse.forbidden(res, 'Cannot delete your own user account');
      }
      
      const deleted = await this.userService.deleteUser(userId);
      
      if (!deleted) {
        return ApiResponse.notFound(res, 'User not found');
      }
      
      return ApiResponse.success(res, null, 'User deleted successfully');
    } catch (error) {
      logger.error(`Error in deleteUser controller for ID ${req.params.id}:`, error);
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete user';
      return ApiResponse.error(res, errorMessage);
    }
  }

  /**
   * Search users (admin only)
   * GET /api/users/search
   */
  public async searchUsers(req: Request, res: Response): Promise<Response> {
    try {
      // Check if user is admin (should be done in middleware)
      if (req.user?.role !== 'admin') {
        return ApiResponse.forbidden(res, 'Admin access required');
      }
      
      const searchTerm = req.query.q as string;
      
      if (!searchTerm || searchTerm.trim().length < 2) {
        return ApiResponse.fail(res, { q: 'Search term must be at least 2 characters' }, 'Validation failed');
      }
      
      const page = parseInt(req.query.page as string) || config.pagination.defaultPage;
      const limit = parseInt(req.query.limit as string) || config.pagination.defaultLimit;
      const options: PaginationOptions = { page, limit };
      
      const result = await this.userService.searchUsers(searchTerm, options);
      
      return ApiResponse.paginatedSuccess(res, result);
    } catch (error) {
      logger.error(`Error in searchUsers controller for term "${req.query.q}":`, error);
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to search users';
      return ApiResponse.error(res, errorMessage);
    }
  }
}

export default UserController;