// backend/src/db/repositories/base/IBaseRepository.ts
import { WhereOptions, FindOptions, CreateOptions, UpdateOptions, DestroyOptions, Model } from 'sequelize';
import { PaginationOptions, PaginationResult } from '../../../types/pagination';

/**
 * Base repository interface for common CRUD operations
 */
export interface IBaseRepository<T extends Model> {
  /**
   * Find one record by primary key
   * @param id Primary key
   * @param options Find options
   * @returns Resolved entity or null if not found
   */
  findById(id: number, options?: FindOptions): Promise<T | null>;

  /**
   * Find one record by specific attributes
   * @param where Where conditions
   * @param options Find options
   * @returns Resolved entity or null if not found
   */
  findOne(where: WhereOptions, options?: FindOptions): Promise<T | null>;

  /**
   * Find all records
   * @param options Find options
   * @returns Array of entities
   */
  findAll(options?: FindOptions): Promise<T[]>;

  /**
   * Find all records with pagination
   * @param pagination Pagination options
   * @param options Find options
   * @returns Paginated result with items and metadata
   */
  findAllPaginated(pagination: PaginationOptions, options?: FindOptions): Promise<PaginationResult<T>>;

  /**
   * Count records
   * @param where Where conditions
   * @returns Number of records
   */
  count(where?: WhereOptions): Promise<number>;

  /**
   * Create a new record
   * @param data Entity data
   * @param options Create options
   * @returns Created entity
   */
  create(data: Partial<T>, options?: CreateOptions): Promise<T>;

  /**
   * Update a record
   * @param id Primary key
   * @param data Updated data
   * @param options Update options
   * @returns Updated entity or null if not found
   */
  update(id: number, data: Partial<T>, options?: UpdateOptions): Promise<T | null>;

  /**
   * Update records based on where condition
   * @param where Where conditions
   * @param data Updated data
   * @param options Update options
   * @returns Number of affected rows
   */
  updateWhere(where: WhereOptions, data: Partial<T>, options?: UpdateOptions): Promise<number>;

  /**
   * Delete a record
   * @param id Primary key
   * @param options Destroy options
   * @returns Whether the record was deleted
   */
  delete(id: number, options?: DestroyOptions): Promise<boolean>;

  /**
   * Delete records based on where condition
   * @param where Where conditions
   * @param options Destroy options
   * @returns Number of deleted rows
   */
  deleteWhere(where: WhereOptions, options?: DestroyOptions): Promise<number>;
}

export default IBaseRepository;