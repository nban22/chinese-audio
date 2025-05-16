// src/db/repositories/subscription/SubscriptionRepository.ts
import { FindOptions, WhereOptions, Op, Includeable, literal, fn, col } from 'sequelize';
import { ISubscriptionRepository } from './ISubscriptionRepository';
import { BaseRepository } from '../base/BaseRepository';
import { Subscription, SubscriptionStatus, SubscriptionType } from '../../models/subscription.model';
import { User } from '../../models/user.model';
import { Transaction } from '../../models/transaction.model';
import { PaginationOptions, PaginationResult } from '../../../types/pagination';
import { DatabaseError } from '../../../utils/errors';
import logger from '../../../utils/logger';

/**
 * Subscription repository implementation
 */
export class SubscriptionRepository extends BaseRepository<Subscription> implements ISubscriptionRepository {
  constructor() {
    super(Subscription);
    this.checkoutSessions = new Map<string, any>();  // In-memory store for checkout sessions (would be a DB table in production)
  }
  
  // In-memory store for checkout sessions (in a real implementation, this would be in the database)
  private checkoutSessions: Map<string, any>;

  /**
   * Find active subscription by user ID
   */
  async findActiveByUserId(userId: number, options: FindOptions = {}): Promise<Subscription | null> {
    try {
      const now = new Date();
      
      return await this.model.findOne({
        ...options,
        where: {
          ...(options.where || {}),
          userId,
          status: SubscriptionStatus.ACTIVE,
          endDate: { [Op.gt]: now },
        },
        order: [['endDate', 'DESC']],
        include: options.include || this.getCommonIncludes(),
      });
    } catch (error) {
      logger.error(`Error finding active subscription for user ID ${userId}:`, error);
      throw new DatabaseError(`Failed to find active subscription`, error as Error);
    }
  }
  
  /**
   * Find all subscriptions by user ID
   */
  async findAllByUserId(userId: number, options: FindOptions = {}): Promise<Subscription[]> {
    try {
      return await this.model.findAll({
        ...options,
        where: {
          ...(options.where || {}),
          userId,
        },
        order: [['startDate', 'DESC']],
        include: options.include || this.getCommonIncludes(),
      });
    } catch (error) {
      logger.error(`Error finding subscriptions for user ID ${userId}:`, error);
      throw new DatabaseError(`Failed to find subscriptions by user ID`, error as Error);
    }
  }
  
  /**
   * Find subscriptions by status with pagination
   */
  async findByStatus(
    status: SubscriptionStatus,
    pagination: PaginationOptions,
    options: FindOptions = {}
  ): Promise<PaginationResult<Subscription>> {
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
      logger.error(`Error finding subscriptions by status ${status}:`, error);
      throw new DatabaseError(`Failed to find subscriptions by status`, error as Error);
    }
  }
  
  /**
   * Find subscriptions by type with pagination
   */
  async findByType(
    type: SubscriptionType,
    pagination: PaginationOptions,
    options: FindOptions = {}
  ): Promise<PaginationResult<Subscription>> {
    try {
      const where = {
        ...(options.where || {}),
        subscriptionType: type,
      };
      
      return await this.findAllPaginated(pagination, {
        ...options,
        where,
        include: options.include || this.getCommonIncludes(),
      });
    } catch (error) {
      logger.error(`Error finding subscriptions by type ${type}:`, error);
      throw new DatabaseError(`Failed to find subscriptions by type`, error as Error);
    }
  }
  
  /**
   * Find subscriptions that are expiring soon
   */
  async findExpiringSoon(daysThreshold: number, options: FindOptions = {}): Promise<Subscription[]> {
    try {
      const now = new Date();
      const threshold = new Date();
      threshold.setDate(threshold.getDate() + daysThreshold);
      
      return await this.model.findAll({
        ...options,
        where: {
          ...(options.where || {}),
          status: SubscriptionStatus.ACTIVE,
          endDate: {
            [Op.gt]: now,
            [Op.lte]: threshold,
          },
          isAutoRenew: false,
        },
        include: options.include || this.getCommonIncludes(),
      });
    } catch (error) {
      logger.error(`Error finding subscriptions expiring within ${daysThreshold} days:`, error);
      throw new DatabaseError(`Failed to find expiring subscriptions`, error as Error);
    }
  }
  
  /**
   * Create a checkout session for a subscription
   * NOTE: In a real implementation, this would store data in a database table
   */
  async createCheckoutSession(sessionData: Record<string, any>): Promise<any> {
    try {
      // For simplicity, store in memory
      // In a real implementation, this would be stored in a database table
      const session = {
        ...sessionData,
        id: sessionData.sessionId,
        createdAt: new Date(),
        expired: false,
        completed: false,
      };
      
      this.checkoutSessions.set(sessionData.sessionId, session);
      
      return session;
    } catch (error) {
      logger.error('Error creating checkout session:', error);
      throw new DatabaseError('Failed to create checkout session', error as Error);
    }
  }
  
  /**
   * Find a checkout session by ID
   * NOTE: In a real implementation, this would query a database table
   */
  async findCheckoutSession(sessionId: string): Promise<any | null> {
    try {
      // For simplicity, retrieve from memory
      // In a real implementation, this would query a database table
      const session = this.checkoutSessions.get(sessionId) || null;
      
      if (session) {
        // Check if session has expired
        const expires = new Date(session.expires);
        const now = new Date();
        
        if (now > expires) {
          session.expired = true;
        }
      }
      
      return session;
    } catch (error) {
      logger.error(`Error finding checkout session ${sessionId}:`, error);
      throw new DatabaseError('Failed to find checkout session', error as Error);
    }
  }
  
  /**
   * Mark a checkout session as completed
   * NOTE: In a real implementation, this would update a record in a database table
   */
  async completeCheckoutSession(sessionId: string): Promise<any> {
    try {
      // For simplicity, update in memory
      // In a real implementation, this would update a record in a database table
      const session = this.checkoutSessions.get(sessionId);
      
      if (!session) {
        throw new Error(`Checkout session not found: ${sessionId}`);
      }
      
      session.completed = true;
      this.checkoutSessions.set(sessionId, session);
      
      return session;
    } catch (error) {
      logger.error(`Error completing checkout session ${sessionId}:`, error);
      throw new DatabaseError('Failed to complete checkout session', error as Error);
    }
  }
  
  /**
   * Get common includes for eager loading relations
   */
  getCommonIncludes(): Includeable[] {
    return [
      {
        model: User,
        attributes: ['id', 'fullName', 'email'],
      },
      {
        model: Transaction,
        attributes: ['id', 'amount', 'status', 'paymentMethod', 'transactionDate'],
        limit: 1,
        order: [['transactionDate', 'DESC']],
        separate: true,
      },
    ];
  }
}

export default SubscriptionRepository;