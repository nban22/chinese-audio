// backend/src/services/user/IUserService.ts
import { User } from '../../db/models/user.model';
import { PaginationOptions, PaginationResult } from '../../types/pagination';

/**
 * User update data
 */
export interface UserUpdateData {
  fullName?: string;
  phoneNumber?: string;
  profileImage?: string;
}

/**
 * User service interface
 */
export interface IUserService {
  /**
   * Get user by ID
   * @param userId User ID
   * @returns User object or null if not found
   */
  getUserById(userId: number): Promise<User | null>;
  
  /**
   * Get user with full details (artist or admin relation)
   * @param userId User ID
   * @returns User object with relations or null if not found
   */
  getUserWithDetails(userId: number): Promise<User | null>;
  
  /**
   * Get all users with pagination
   * @param options Pagination options
   * @returns Paginated result with users
   */
  getAllUsers(options: PaginationOptions): Promise<PaginationResult<User>>;
  
  /**
   * Get users by role with pagination
   * @param role User role (listener, artist, admin)
   * @param options Pagination options 
   * @returns Paginated result with users
   */
  getUsersByRole(role: string, options: PaginationOptions): Promise<PaginationResult<User>>;
  
  /**
   * Search users by name or email
   * @param searchTerm Search term
   * @param options Pagination options
   * @returns Paginated result with matching users
   */
  searchUsers(searchTerm: string, options: PaginationOptions): Promise<PaginationResult<User>>;
  
  /**
   * Update user profile
   * @param userId User ID
   * @param userData Profile update data
   * @returns Updated user object
   */
  updateUser(userId: number, userData: UserUpdateData): Promise<User | null>;
  
  /**
   * Activate or deactivate user
   * @param userId User ID
   * @param isActive Whether to activate or deactivate
   * @returns Updated user object
   */
  setUserActiveStatus(userId: number, isActive: boolean): Promise<User | null>;
  
  /**
   * Delete user
   * @param userId User ID
   * @returns Success status
   */
  deleteUser(userId: number): Promise<boolean>;
  
  /**
   * Check if email is already taken
   * @param email Email to check
   * @returns Whether email is taken
   */
  isEmailTaken(email: string): Promise<boolean>;
}

export default IUserService;