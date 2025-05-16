// backend/src/db/repositories/user/IUserRepository.ts
import { FindOptions, WhereOptions, Includeable } from 'sequelize';
import { IBaseRepository } from '../base/IBaseRepository';
import { User } from '../../models/user.model';
import { PaginationOptions, PaginationResult } from '../../../types/pagination';

/**
 * User repository interface that extends base repository
 */
export interface IUserRepository extends IBaseRepository<User> {
  /**
   * Find user by email
   * @param email User email
   * @param options Optional Sequelize find options
   * @returns Found user or null
   */
  findByEmail(email: string, options?: FindOptions): Promise<User | null>;
  
  /**
   * Find user with artist information
   * @param userId User ID
   * @returns User with artist relation or null
   */
  findWithArtist(userId: number): Promise<User | null>;
  
  /**
   * Find user with admin information
   * @param userId User ID
   * @returns User with admin relation or null
   */
  findWithAdmin(userId: number): Promise<User | null>;
  
  /**
   * Find user with artist and admin information
   * @param userId User ID
   * @returns User with all relations or null
   */
  findWithRelations(userId: number): Promise<User | null>;
  
  /**
   * Find all active users with pagination
   * @param pagination Pagination options
   * @param options Additional Sequelize find options
   * @returns Paginated result
   */
  findAllActive(pagination: PaginationOptions, options?: FindOptions): Promise<PaginationResult<User>>;
  
  /**
   * Find all users by role with pagination
   * @param role User role
   * @param pagination Pagination options
   * @param options Additional Sequelize find options
   * @returns Paginated result
   */
  findByRole(role: string, pagination: PaginationOptions, options?: FindOptions): Promise<PaginationResult<User>>;
  
  /**
   * Search users by name or email with pagination
   * @param searchTerm Search term
   * @param pagination Pagination options
   * @param options Additional Sequelize find options
   * @returns Paginated result
   */
  search(searchTerm: string, pagination: PaginationOptions, options?: FindOptions): Promise<PaginationResult<User>>;
  
  /**
   * Check if email exists
   * @param email Email to check
   * @returns Whether email exists
   */
  emailExists(email: string): Promise<boolean>;
  
  /**
   * Get common includes for eager loading relations
   * @returns Array of Sequelize include options
   */
  getCommonIncludes(): Includeable[];
}

export default IUserRepository;