// backend/src/db/repositories/user/UserRepository.ts
import { FindOptions, WhereOptions, Op, Includeable } from 'sequelize';
import { IUserRepository } from './IUserRepository';
import { BaseRepository } from '../base/BaseRepository';
import { User, UserType } from '../../models/user.model';
import { Artist } from '../../models/artist.model';
import { Admin } from '../../models/admin.model';
import { PaginationOptions, PaginationResult } from '../../../types/pagination';
import { DatabaseError } from '../../../utils/errors';
import logger from '../../../utils/logger';

/**
 * User repository implementation
 */
export class UserRepository extends BaseRepository<User> implements IUserRepository {
  constructor() {
    super(User);
  }

  /**
   * Find user by email
   */
  async findByEmail(email: string, options: FindOptions = {}): Promise<User | null> {
    try {
      return await this.model.findOne({
        ...options,
        where: {
          ...(options.where || {}),
          email,
        },
      });
    } catch (error) {
      logger.error(`Error finding user by email ${email}:`, error);
      throw new DatabaseError(`Failed to find user by email`, error as Error);
    }
  }

  /**
   * Find user with artist information
   */
  async findWithArtist(userId: number): Promise<User | null> {
    try {
      return await this.model.findByPk(userId, {
        include: [
          {
            model: Artist,
            required: false,
          },
        ],
      });
    } catch (error) {
      logger.error(`Error finding user with artist for ID ${userId}:`, error);
      throw new DatabaseError(`Failed to find user with artist`, error as Error);
    }
  }

  /**
   * Find user with admin information
   */
  async findWithAdmin(userId: number): Promise<User | null> {
    try {
      return await this.model.findByPk(userId, {
        include: [
          {
            model: Admin,
            required: false,
          },
        ],
      });
    } catch (error) {
      logger.error(`Error finding user with admin for ID ${userId}:`, error);
      throw new DatabaseError(`Failed to find user with admin`, error as Error);
    }
  }

  /**
   * Find user with artist and admin information
   */
  async findWithRelations(userId: number): Promise<User | null> {
    try {
      return await this.model.findByPk(userId, {
        include: this.getCommonIncludes(),
      });
    } catch (error) {
      logger.error(`Error finding user with relations for ID ${userId}:`, error);
      throw new DatabaseError(`Failed to find user with relations`, error as Error);
    }
  }

  /**
   * Find all active users with pagination
   */
  async findAllActive(
    pagination: PaginationOptions,
    options: FindOptions = {}
  ): Promise<PaginationResult<User>> {
    try {
      const where = {
        ...(options.where || {}),
        isActive: true,
      };
      
      return await this.findAllPaginated(pagination, {
        ...options,
        where,
      });
    } catch (error) {
      logger.error('Error finding all active users:', error);
      throw new DatabaseError('Failed to find all active users', error as Error);
    }
  }

  /**
   * Find all users by role with pagination
   */
  async findByRole(
    role: string,
    pagination: PaginationOptions,
    options: FindOptions = {}
  ): Promise<PaginationResult<User>> {
    try {
      const where = {
        ...(options.where || {}),
        userType: role,
      };
      
      return await this.findAllPaginated(pagination, {
        ...options,
        where,
      });
    } catch (error) {
      logger.error(`Error finding users by role ${role}:`, error);
      throw new DatabaseError(`Failed to find users by role`, error as Error);
    }
  }

  /**
   * Search users by name or email with pagination
   */
  async search(
    searchTerm: string,
    pagination: PaginationOptions,
    options: FindOptions = {}
  ): Promise<PaginationResult<User>> {
    try {
      const where = {
        ...(options.where || {}),
        [Op.or]: [
          { fullName: { [Op.like]: `%${searchTerm}%` } },
          { email: { [Op.like]: `%${searchTerm}%` } },
        ],
      };
      
      return await this.findAllPaginated(pagination, {
        ...options,
        where,
      });
    } catch (error) {
      logger.error(`Error searching users with term "${searchTerm}":`, error);
      throw new DatabaseError('Failed to search users', error as Error);
    }
  }

  /**
   * Check if email exists
   */
  async emailExists(email: string): Promise<boolean> {
    try {
      const count = await this.model.count({
        where: { email },
      });
      
      return count > 0;
    } catch (error) {
      logger.error(`Error checking if email ${email} exists:`, error);
      throw new DatabaseError('Failed to check if email exists', error as Error);
    }
  }

  /**
   * Get common includes for eager loading relations
   */
  getCommonIncludes(): Includeable[] {
    return [
      {
        model: Artist,
        required: false,
      },
      {
        model: Admin,
        required: false,
      },
    ];
  }
}

export default UserRepository;