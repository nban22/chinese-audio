// backend/src/db/repositories/base/BaseRepository.ts
import { 
  Model, 
  ModelStatic, 
  FindOptions, 
  WhereOptions, 
  CreateOptions, 
  UpdateOptions, 
  DestroyOptions,
  Op
} from 'sequelize';
import { IBaseRepository } from './IBaseRepository';
import { PaginationOptions, PaginationResult } from '../../../types/pagination';
import config from '../../../config';
import { DatabaseError } from '../../../utils/errors';
import logger from '../../../utils/logger';

/**
 * Base repository implementation for common CRUD operations
 */
export class BaseRepository<T extends Model> implements IBaseRepository<T> {
  protected model: ModelStatic<T>;

  constructor(model: ModelStatic<T>) {
    this.model = model;
  }

  /**
   * Find one record by primary key
   */
  async findById(id: number, options?: FindOptions): Promise<T | null> {
    try {
      return await this.model.findByPk(id, options);
    } catch (error) {
      logger.error(`Error finding by ID in ${this.model.name} repository:`, error);
      throw new DatabaseError(`Failed to find ${this.model.name} by ID`, error as Error);
    }
  }

  /**
   * Find one record by specific attributes
   */
  async findOne(where: WhereOptions, options?: FindOptions): Promise<T | null> {
    try {
      return await this.model.findOne({ 
        ...options,
        where
      });
    } catch (error) {
      logger.error(`Error finding one in ${this.model.name} repository:`, error);
      throw new DatabaseError(`Failed to find ${this.model.name}`, error as Error);
    }
  }

  /**
   * Find all records
   */
  async findAll(options?: FindOptions): Promise<T[]> {
    try {
      return await this.model.findAll(options);
    } catch (error) {
      logger.error(`Error finding all in ${this.model.name} repository:`, error);
      throw new DatabaseError(`Failed to find all ${this.model.name}`, error as Error);
    }
  }

  /**
   * Find all records with pagination
   */
  async findAllPaginated(
    pagination: PaginationOptions, 
    options: FindOptions = {}
  ): Promise<PaginationResult<T>> {
    try {
      const { page, limit } = pagination;
      
      // Ensure page and limit are valid
      const currentPage = page < 1 ? 1 : page;
      const pageSize = Math.min(
        limit < 1 ? config.pagination.defaultLimit : limit,
        config.pagination.maxLimit
      );
      
      // Calculate offset
      const offset = (currentPage - 1) * pageSize;
      
      // Find total count
      const countOptions = { ...options };
      delete countOptions.limit;
      delete countOptions.offset;
      delete countOptions.order;
      
      const { count, rows } = await this.model.findAndCountAll({
        ...options,
        limit: pageSize,
        offset,
      });
      
      // Calculate pagination metadata
      const totalPages = Math.ceil(count / pageSize);
      
      return {
        items: rows,
        meta: {
          totalItems: count,
          itemsPerPage: pageSize,
          currentPage,
          totalPages,
          hasNextPage: currentPage < totalPages,
          hasPrevPage: currentPage > 1,
        },
      };
    } catch (error) {
      logger.error(`Error finding paginated in ${this.model.name} repository:`, error);
      throw new DatabaseError(`Failed to find paginated ${this.model.name}`, error as Error);
    }
  }

  /**
   * Count records
   */
  async count(where?: WhereOptions): Promise<number> {
    try {
      return await this.model.count({ where });
    } catch (error) {
      logger.error(`Error counting in ${this.model.name} repository:`, error);
      throw new DatabaseError(`Failed to count ${this.model.name}`, error as Error);
    }
  }

  /**
   * Create a new record
   */
  async create(data: Partial<T>, options?: CreateOptions): Promise<T> {
    try {
      return await this.model.create(data as any, options);
    } catch (error) {
      logger.error(`Error creating in ${this.model.name} repository:`, error);
      throw new DatabaseError(`Failed to create ${this.model.name}`, error as Error);
    }
  }

  /**
   * Update a record by id
   */
  async update(id: number, data: Partial<T>, options?: UpdateOptions): Promise<T | null> {
    try {
      const [affectedCount] = await this.model.update(data as any, {
        ...options,
        where: { id } as any,
      });
      
      if (affectedCount === 0) {
        return null;
      }
      
      return this.findById(id);
    } catch (error) {
      logger.error(`Error updating in ${this.model.name} repository:`, error);
      throw new DatabaseError(`Failed to update ${this.model.name}`, error as Error);
    }
  }

  /**
   * Update records based on where condition
   */
  async updateWhere(
    where: WhereOptions, 
    data: Partial<T>, 
    options?: UpdateOptions
  ): Promise<number> {
    try {
      const [affectedCount] = await this.model.update(data as any, {
        ...options,
        where,
      });
      
      return affectedCount;
    } catch (error) {
      logger.error(`Error updating multiple in ${this.model.name} repository:`, error);
      throw new DatabaseError(`Failed to update multiple ${this.model.name}`, error as Error);
    }
  }

  /**
   * Delete a record
   */
  async delete(id: number, options?: DestroyOptions): Promise<boolean> {
    try {
      const affectedCount = await this.model.destroy({
        ...options,
        where: { id } as any,
      });
      
      return affectedCount > 0;
    } catch (error) {
      logger.error(`Error deleting in ${this.model.name} repository:`, error);
      throw new DatabaseError(`Failed to delete ${this.model.name}`, error as Error);
    }
  }

  /**
   * Delete records based on where condition
   */
  async deleteWhere(where: WhereOptions, options?: DestroyOptions): Promise<number> {
    try {
      return await this.model.destroy({
        ...options,
        where,
      });
    } catch (error) {
      logger.error(`Error deleting multiple in ${this.model.name} repository:`, error);
      throw new DatabaseError(`Failed to delete multiple ${this.model.name}`, error as Error);
    }
  }
}

export default BaseRepository;