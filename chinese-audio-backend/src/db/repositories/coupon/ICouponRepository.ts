// src/db/repositories/coupon/ICouponRepository.ts
import { FindOptions, WhereOptions, Includeable } from 'sequelize';
import { IBaseRepository } from '../base/IBaseRepository';
import { Coupon } from '../../models/coupon.model';
import { PaginationOptions, PaginationResult } from '../../../types/pagination';

/**
 * Coupon repository interface that extends base repository
 */
export interface ICouponRepository extends IBaseRepository<Coupon> {
  /**
   * Find coupon by code
   * @param code Coupon code
   * @param options Additional Sequelize find options
   * @returns Found coupon or null
   */
  findByCode(code: string, options?: FindOptions): Promise<Coupon | null>;
  
  /**
   * Find active coupons with pagination
   * @param pagination Pagination options
   * @param options Additional Sequelize find options
   * @returns Paginated result
   */
  findActive(pagination: PaginationOptions, options?: FindOptions): Promise<PaginationResult<Coupon>>;
  
  /**
   * Find expired coupons with pagination
   * @param pagination Pagination options
   * @param options Additional Sequelize find options
   * @returns Paginated result
   */
  findExpired(pagination: PaginationOptions, options?: FindOptions): Promise<PaginationResult<Coupon>>;
  
  /**
   * Find coupons by admin ID with pagination
   * @param adminId Admin ID
   * @param pagination Pagination options
   * @param options Additional Sequelize find options
   * @returns Paginated result
   */
  findByAdminId(adminId: number, pagination: PaginationOptions, options?: FindOptions): Promise<PaginationResult<Coupon>>;
  
  /**
   * Validate coupon by code
   * @param code Coupon code
   * @returns Valid coupon or null if invalid/expired
   */
  validateCode(code: string): Promise<Coupon | null>;
  
  /**
   * Increment used count of a coupon
   * @param couponId Coupon ID
   * @returns Updated coupon or null if not found
   */
  incrementUsedCount(couponId: number): Promise<Coupon | null>;
  
  /**
   * Get common includes for eager loading relations
   * @returns Array of Sequelize include options
   */
  getCommonIncludes(): Includeable[];
}

export default ICouponRepository;