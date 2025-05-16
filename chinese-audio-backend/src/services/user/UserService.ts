// backend/src/services/user/UserService.ts
import { IUserService, UserUpdateData } from './IUserService';
import { IUserRepository } from '../../db/repositories/user/IUserRepository';
import { User } from '../../db/models/user.model';
import { PaginationOptions, PaginationResult } from '../../types/pagination';
import { NotFoundError, ForbiddenError, ValidationError } from '../../utils/errors';
import logger from '../../utils/logger';

/**
 * User service implementation
 */
export class UserService implements IUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  /**
   * Get user by ID
   */
  async getUserById(userId: number): Promise<User | null> {
    try {
      return await this.userRepository.findById(userId);
    } catch (error) {
      logger.error(`Error in getUserById for ID ${userId}:`, error);
      throw error;
    }
  }

  /**
   * Get user with full details (artist or admin relation)
   */
  async getUserWithDetails(userId: number): Promise<User | null> {
    try {
      return await this.userRepository.findWithRelations(userId);
    } catch (error) {
      logger.error(`Error in getUserWithDetails for ID ${userId}:`, error);
      throw error;
    }
  }

  /**
   * Get all users with pagination
   */
  async getAllUsers(options: PaginationOptions): Promise<PaginationResult<User>> {
    try {
      return await this.userRepository.findAllActive(options);
    } catch (error) {
      logger.error('Error in getAllUsers:', error);
      throw error;
    }
  }

  /**
   * Get users by role with pagination
   */
  async getUsersByRole(role: string, options: PaginationOptions): Promise<PaginationResult<User>> {
    try {
      return await this.userRepository.findByRole(role, options);
    } catch (error) {
      logger.error(`Error in getUsersByRole for role ${role}:`, error);
      throw error;
    }
  }

  /**
   * Search users by name or email
   */
  async searchUsers(searchTerm: string, options: PaginationOptions): Promise<PaginationResult<User>> {
    try {
      return await this.userRepository.search(searchTerm, options);
    } catch (error) {
      logger.error(`Error in searchUsers for term "${searchTerm}":`, error);
      throw error;
    }
  }

  /**
   * Update user profile
   */
  async updateUser(userId: number, userData: UserUpdateData): Promise<User | null> {
    try {
      // Check if user exists
      const existingUser = await this.userRepository.findById(userId);
      if (!existingUser) {
        throw new NotFoundError(`User with ID ${userId} not found`);
      }

      // Validate data if needed
      if (userData.fullName && userData.fullName.trim().length < 2) {
        throw new ValidationError({ fullName: 'Full name must be at least 2 characters' });
      }

      // Update user
      const updatedUser = await this.userRepository.update(userId, userData);
      return updatedUser;
    } catch (error) {
      logger.error(`Error in updateUser for ID ${userId}:`, error);
      throw error;
    }
  }

  /**
   * Activate or deactivate user
   */
  async setUserActiveStatus(userId: number, isActive: boolean): Promise<User | null> {
    try {
      // Check if user exists
      const existingUser = await this.userRepository.findById(userId);
      if (!existingUser) {
        throw new NotFoundError(`User with ID ${userId} not found`);
      }

      // Update user active status
      const updatedUser = await this.userRepository.update(userId, { isActive });
      return updatedUser;
    } catch (error) {
      logger.error(`Error in setUserActiveStatus for ID ${userId}:`, error);
      throw error;
    }
  }

  /**
   * Delete user
   */
  async deleteUser(userId: number): Promise<boolean> {
    try {
      // Check if user exists
      const existingUser = await this.userRepository.findById(userId);
      if (!existingUser) {
        throw new NotFoundError(`User with ID ${userId} not found`);
      }

      // Delete user (or set isActive to false in a real implementation)
      // For a soft delete, you might prefer:
      // await this.userRepository.update(userId, { isActive: false });
      
      const deleted = await this.userRepository.delete(userId);
      return deleted;
    } catch (error) {
      logger.error(`Error in deleteUser for ID ${userId}:`, error);
      throw error;
    }
  }

  /**
   * Check if email is already taken
   */
  async isEmailTaken(email: string): Promise<boolean> {
    try {
      return await this.userRepository.emailExists(email);
    } catch (error) {
      logger.error(`Error in isEmailTaken for email ${email}:`, error);
      throw error;
    }
  }
}

export default UserService;