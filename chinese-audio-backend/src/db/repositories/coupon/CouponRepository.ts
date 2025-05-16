// src/db/repositories/coupon/CouponRepository.ts
import { FindOptions, WhereOptions, Op, Includeable, literal } from 'sequelize';
import { ICouponRepository } from './ICouponRepository';
import { BaseRepository } from '../base/BaseRepository';
import { Coupon } from '../../models/coupon.model';
import { Admin } from '../../models/admin.model';
import { User } from '../../models/user.model';
import { PaginationOptions, PaginationResult } from '../../../types/pagination';
import { DatabaseError } from '../../../utils/errors';
import logger from '../../../utils/logger';

/**
 * Coupon repository implementation
 */
export class CouponRepository extends BaseRepository<Coupon> implements ICouponRepository {
  constructor() {
    super(Coupon);
  }

  /**
   * Find coupon by code
   */
  async findByCode(code: string, options: FindOptions = {}): Promise<Coupon | null> {
    try {
      return await this.model.findOne({
        ...options,
        where: {
          ...(options.where || {}),
          code,
        },
      });
    } catch (error) {
      logger.error(`Error finding coupon by code ${code}:`, error);
      throw new DatabaseError(`Failed to find coupon by code`, error as Error);
    }
  }
  
  /**
   * Find active coupons with pagination
   */
  async findActive(
    pagination: PaginationOptions,
    options: FindOptions = {}
  ): Promise<PaginationResult<Coupon>> {
    try {
      const now = new Date();
      
      const where = {
        ...(options.where || {}),
        validFrom: { [Op.lte]: now },
        validTo: { [Op.gte]: now },
        [Op.or]: [
          { usageLimit: null },
          { usedCount: { [Op.lt]: literal('usage_limit') } },
        ],
      };
      
      return await this.findAllPaginated(pagination, {
        ...options,
        where,
        include: options.include || this.getCommonIncludes(),
      });
    } catch (error) {
      logger.error('Error finding active coupons:', error);
      throw new DatabaseError('Failed to find active coupons', error as Error);
    }
  }
  
  /**
   * Find expired coupons with pagination
   */
  async findExpired(
    pagination: PaginationOptions,
    options: FindOptions = {}
  ): Promise<PaginationResult<Coupon>> {
    try {
      const now = new Date();
      
      const where = {
        ...(options.where || {}),
        [Op.or]: [
          { validTo: { [Op.lt]: now } },
          {
            [Op.and]: [
              { usageLimit: { [Op.ne]: null } },
              { usedCount: { [Op.gte]: literal('usage_limit') } },
            ],
          },
        ],
      };
      
      return await this.findAllPaginated(pagination, {
        ...options,
        where,
        include: options.include || this.getCommonIncludes(),
      });
    } catch (error) {
      logger.error('Error finding expired coupons:', error);
      throw new DatabaseError('Failed to find expired coupons', error as Error);
    }
  }
  
  /**
   * Find coupons by admin ID with pagination
   */
  async findByAdminId(
    adminId: number,
    pagination: PaginationOptions,
    options: FindOptions = {}
  ): Promise<PaginationResult<Coupon>> {
    try {
      const where = {
        ...(options.where || {}),
        adminId,
      };
      
      return await this.findAllPaginated(pagination, {
        ...options,
        where,
        include: options.include || this.getCommonIncludes(),
      });
    } catch (error) {
      logger.error(`Error finding coupons by admin ID ${adminId}:`, error);
      throw new DatabaseError(`Failed to find coupons by admin ID`, error as Error);
    }
  }
  
  /**
   * Validate coupon by code
   */
  async validateCode(code: string): Promise<Coupon | null> {
    try {
      const now = new Date();
      
      const coupon = await this.model.findOne({
        where: {
          code,
          validFrom: { [Op.lte]: now },
          validTo: { [Op.gte]: now },
        },
      });
      
      if (!coupon) {
        return null;
      }
      
      // Check usage limit
      if (coupon.usageLimit !== null && coupon.usageLimit !== undefined && coupon.usedCount >= coupon.usageLimit) {
        return null;
      }
      
      return coupon;
    } catch (error) {
      logger.error(`Error validating coupon code ${code}:`, error);
      throw new DatabaseError(`Failed to validate coupon code`, error as Error);
    }
  }
  
  /**
   * Increment used count of a coupon
   */
  async incrementUsedCount(couponId: number): Promise<Coupon | null> {
    try {
      const coupon = await this.model.findByPk(couponId);
      
      if (!coupon) {
        return null;
      }
      
      // Increment used count
      await coupon.update({ usedCount: coupon.usedCount + 1 });
      
      return coupon;
    } catch (error) {
      logger.error(`Error incrementing used count for coupon ID ${couponId}:`, error);
      throw new DatabaseError(`Failed to increment coupon used count`, error as Error);
    }
  }
  
  /**
   * Get common includes for eager loading relations
   */
  getCommonIncludes(): Includeable[] {
    return [
      {
        model: Admin,
        attributes: ['id', 'adminLevel'],
        include: [
          {
            model: User,
            attributes: ['id', 'fullName', 'email'],
          },
        ],
      },
    ];
  }
}

export default CouponRepository;