// src/db/repositories/transaction/TransactionRepository.ts
import { FindOptions, WhereOptions, Op, Includeable, QueryTypes, literal, fn, col } from 'sequelize';
import { ITransactionRepository } from './ITransactionRepository';
import { BaseRepository } from '../base/BaseRepository';
import { Transaction, TransactionStatus } from '../../models/transaction.model';
import { Subscription } from '../../models/subscription.model';
import { User } from '../../models/user.model';
import { Coupon } from '../../models/coupon.model';
import { PaginationOptions, PaginationResult } from '../../../types/pagination';
import { DatabaseError } from '../../../utils/errors';
import logger from '../../../utils/logger';

/**
 * Transaction repository implementation
 */
export class TransactionRepository extends BaseRepository<Transaction> implements ITransactionRepository {
  constructor() {
    super(Transaction);
  }

  /**
   * Find transactions by user ID with pagination
   */
  async findByUserId(
    userId: number,
    pagination: PaginationOptions,
    options: FindOptions = {}
  ): Promise<PaginationResult<Transaction>> {
    try {
      return await this.findAllPaginated(pagination, {
        ...options,
        include: [
          {
            model: Subscription,
            where: { userId },
            attributes: ['id', 'subscriptionType', 'startDate', 'endDate', 'status'],
          },
          ...(options.include as Includeable[] || []).filter(
            include => typeof include === 'object' && 
                        include !== null && 
                        'model' in include && 
                        (include as any).model !== Subscription
          ),
        ],
      });
    } catch (error) {
      logger.error(`Error finding transactions by user ID ${userId}:`, error);
      throw new DatabaseError(`Failed to find transactions by user ID`, error as Error);
    }
  }
  
  /**
   * Find transactions by subscription ID with pagination
   */
  async findBySubscriptionId(
    subscriptionId: number,
    pagination: PaginationOptions,
    options: FindOptions = {}
  ): Promise<PaginationResult<Transaction>> {
    try {
      const where = {
        ...(options.where || {}),
        subscriptionId,
      };
      
      return await this.findAllPaginated(pagination, {
        ...options,
        where,
        include: options.include || this.getCommonIncludes(),
      });
    } catch (error) {
      logger.error(`Error finding transactions by subscription ID ${subscriptionId}:`, error);
      throw new DatabaseError(`Failed to find transactions by subscription ID`, error as Error);
    }
  }
  
  /**
   * Find transactions by status with pagination
   */
  async findByStatus(
    status: TransactionStatus,
    pagination: PaginationOptions,
    options: FindOptions = {}
  ): Promise<PaginationResult<Transaction>> {
    try {
      const where = {
        ...(options.where || {}),
        status,
      };
      
      return await this.findAllPaginated(pagination, {
        ...options,
        where,
        include: options.include || this.getCommonIncludes(),
      });
    } catch (error) {
      logger.error(`Error finding transactions by status ${status}:`, error);
      throw new DatabaseError(`Failed to find transactions by status`, error as Error);
    }
  }
  
  /**
   * Find transactions by date range with pagination
   */
  async findByDateRange(
    startDate: Date,
    endDate: Date,
    pagination: PaginationOptions,
    options: FindOptions = {}
  ): Promise<PaginationResult<Transaction>> {
    try {
      const where = {
        ...(options.where || {}),
        transactionDate: {
          [Op.between]: [startDate, endDate],
        },
      };
      
      return await this.findAllPaginated(pagination, {
        ...options,
        where,
        include: options.include || this.getCommonIncludes(),
      });
    } catch (error) {
      logger.error(`Error finding transactions by date range:`, error);
      throw new DatabaseError(`Failed to find transactions by date range`, error as Error);
    }
  }
  
  /**
   * Find transaction by ID with detailed information
   */
  async findByIdWithDetails(id: number): Promise<Transaction | null> {
    try {
      return await this.model.findByPk(id, {
        include: [
          {
            model: Subscription,
            attributes: ['id', 'subscriptionType', 'startDate', 'endDate', 'status'],
            include: [
              {
                model: User,
                attributes: ['id', 'fullName', 'email'],
              },
            ],
          },
          {
            model: Coupon,
            attributes: ['id', 'code', 'discountAmount', 'discountPercent'],
            required: false,
          },
        ],
      });
    } catch (error) {
      logger.error(`Error finding transaction with details for ID ${id}:`, error);
      throw new DatabaseError(`Failed to find transaction with details`, error as Error);
    }
  }
  
  /**
   * Generate revenue report grouped by time period
   */
  async getRevenueReport(
    period: string,
    startDate: Date,
    endDate: Date
  ): Promise<{ total: number, data: any[] }> {
    try {
      const sequelize = this.model.sequelize;
      
      if (!sequelize) {
        throw new Error('Sequelize instance not available');
      }
      
      let timeFormat: string;
      let groupBy: string;
      
      // Set SQL formatting based on period
      switch (period.toLowerCase()) {
        case 'day':
          timeFormat = '%Y-%m-%d';
          groupBy = 'day';
          break;
        case 'week':
          timeFormat = '%Y-%u';  // Year and week number
          groupBy = 'week';
          break;
        case 'month':
          timeFormat = '%Y-%m';
          groupBy = 'month';
          break;
        case 'year':
          timeFormat = '%Y';
          groupBy = 'year';
          break;
        default:
          timeFormat = '%Y-%m-%d';
          groupBy = 'day';
      }
      
      // Execute query to get revenue data
      // This is MySQL specific and would need to be adjusted for other databases
      const results = await sequelize.query(`
        SELECT 
          DATE_FORMAT(transaction_date, "${timeFormat}") AS time_period,
          SUM(amount) AS revenue,
          COUNT(*) AS count
        FROM 
          transactions
        WHERE 
          status = "completed" AND
          transaction_date BETWEEN ? AND ?
        GROUP BY 
          time_period
        ORDER BY 
          time_period ASC
      `, {
        replacements: [startDate, endDate],
        type: QueryTypes.SELECT,
        raw: true,
      });
      
      // Calculate total revenue
      const total = results.reduce((sum: number, row: any) => sum + parseFloat(row.revenue), 0);
      
      return {
        total,
        data: results,
      };
    } catch (error) {
      logger.error(`Error generating revenue report:`, error);
      throw new DatabaseError(`Failed to generate revenue report`, error as Error);
    }
  }
  
  /**
   * Get common includes for eager loading relations
   */
  getCommonIncludes(): Includeable[] {
    return [
      {
        model: Subscription,
        attributes: ['id', 'subscriptionType', 'startDate', 'endDate', 'status', 'userId'],
        include: [
          {
            model: User,
            attributes: ['id', 'fullName', 'email'],
          },
        ],
      },
      {
        model: Coupon,
        attributes: ['id', 'code', 'discountAmount', 'discountPercent'],
        required: false,
      },
    ];
  }
}

export default TransactionRepository;