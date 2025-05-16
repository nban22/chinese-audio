// src/db/repositories/subscription/ISubscriptionRepository.ts
import { FindOptions, WhereOptions, Includeable } from 'sequelize';
import { IBaseRepository } from '../base/IBaseRepository';
import { Subscription, SubscriptionStatus, SubscriptionType } from '../../models/subscription.model';
import { PaginationOptions, PaginationResult } from '../../../types/pagination';

/**
 * Subscription repository interface that extends base repository
 */
export interface ISubscriptionRepository extends IBaseRepository<Subscription> {
  /**
   * Find active subscription by user ID
   * @param userId User ID
   * @param options Additional Sequelize find options
   * @returns Active subscription or null
   */
  findActiveByUserId(userId: number, options?: FindOptions): Promise<Subscription | null>;
  
  /**
   * Find all subscriptions by user ID
   * @param userId User ID
   * @param options Additional Sequelize find options
   * @returns Array of subscriptions
   */
  findAllByUserId(userId: number, options?: FindOptions): Promise<Subscription[]>;
  
  /**
   * Find subscriptions by status with pagination
   * @param status Subscription status
   * @param pagination Pagination options
   * @param options Additional Sequelize find options
   * @returns Paginated result
   */
  findByStatus(
    status: SubscriptionStatus,
    pagination: PaginationOptions,
    options?: FindOptions
  ): Promise<PaginationResult<Subscription>>;
  
  /**
   * Find subscriptions by type with pagination
   * @param type Subscription type
   * @param pagination Pagination options
   * @param options Additional Sequelize find options
   * @returns Paginated result
   */
  findByType(
    type: SubscriptionType,
    pagination: PaginationOptions,
    options?: FindOptions
  ): Promise<PaginationResult<Subscription>>;
  
  /**
   * Find subscriptions that are expiring soon
   * @param daysThreshold Number of days until expiration
   * @param options Additional Sequelize find options
   * @returns Array of subscriptions expiring soon
   */
  findExpiringSoon(daysThreshold: number, options?: FindOptions): Promise<Subscription[]>;
  
  /**
   * Create a checkout session for a subscription
   * @param sessionData Session data
   * @returns Created session data
   */
  createCheckoutSession(sessionData: Record<string, any>): Promise<any>;
  
  /**
   * Find a checkout session by ID
   * @param sessionId Session ID
   * @returns Session data or null
   */
  findCheckoutSession(sessionId: string): Promise<any | null>;
  
  /**
   * Mark a checkout session as completed
   * @param sessionId Session ID
   * @returns Updated session data
   */
  completeCheckoutSession(sessionId: string): Promise<any>;
  
  /**
   * Get common includes for eager loading relations
   * @returns Array of Sequelize include options
   */
  getCommonIncludes(): Includeable[];
}

export default ISubscriptionRepository;