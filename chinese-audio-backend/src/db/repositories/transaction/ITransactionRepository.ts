// src/db/repositories/transaction/ITransactionRepository.ts
import { FindOptions, WhereOptions, Includeable } from 'sequelize';
import { IBaseRepository } from '../base/IBaseRepository';
import { Transaction, TransactionStatus } from '../../models/transaction.model';
import { PaginationOptions, PaginationResult } from '../../../types/pagination';

/**
 * Transaction repository interface that extends base repository
 */
export interface ITransactionRepository extends IBaseRepository<Transaction> {
  /**
   * Find transactions by user ID with pagination
   * @param userId User ID (via subscription)
   * @param pagination Pagination options
   * @param options Additional Sequelize find options
   * @returns Paginated result
   */
  findByUserId(
    userId: number,
    pagination: PaginationOptions,
    options?: FindOptions
  ): Promise<PaginationResult<Transaction>>;
  
  /**
   * Find transactions by subscription ID with pagination
   * @param subscriptionId Subscription ID
   * @param pagination Pagination options
   * @param options Additional Sequelize find options
   * @returns Paginated result
   */
  findBySubscriptionId(
    subscriptionId: number,
    pagination: PaginationOptions,
    options?: FindOptions
  ): Promise<PaginationResult<Transaction>>;
  
  /**
   * Find transactions by status with pagination
   * @param status Transaction status
   * @param pagination Pagination options
   * @param options Additional Sequelize find options
   * @returns Paginated result
   */
  findByStatus(
    status: TransactionStatus,
    pagination: PaginationOptions,
    options?: FindOptions
  ): Promise<PaginationResult<Transaction>>;
  
  /**
   * Find transactions by date range with pagination
   * @param startDate Start date
   * @param endDate End date
   * @param pagination Pagination options
   * @param options Additional Sequelize find options
   * @returns Paginated result
   */
  findByDateRange(
    startDate: Date,
    endDate: Date,
    pagination: PaginationOptions,
    options?: FindOptions
  ): Promise<PaginationResult<Transaction>>;
  
  /**
   * Find transaction by ID with detailed information
   * @param id Transaction ID
   * @returns Transaction with full details or null
   */
  findByIdWithDetails(id: number): Promise<Transaction | null>;
  
  /**
   * Generate revenue report grouped by time period
   * @param period Time period grouping ('day', 'week', 'month', 'year')
   * @param startDate Report start date
   * @param endDate Report end date
   * @returns Revenue report data
   */
  getRevenueReport(period: string, startDate: Date, endDate: Date): Promise<{ total: number, data: any[] }>;
  
  /**
   * Get common includes for eager loading relations
   * @returns Array of Sequelize include options
   */
  getCommonIncludes(): Includeable[];
}

export default ITransactionRepository;