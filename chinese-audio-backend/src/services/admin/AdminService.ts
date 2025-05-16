// src/services/admin/AdminService.ts
import { IAdminService, CouponCreateData, CouponUpdateData, FeedbackProcessData } from './IAdminService';
import { PaginationOptions, PaginationResult } from '../../types/pagination';
import { NotFoundError, ValidationError } from '../../utils/errors';
import logger from '../../utils/logger';

export class AdminService implements IAdminService {
  constructor(
    private readonly courseRepository: any,
    private readonly feedbackRepository: any,
    private readonly couponRepository: any,
    private readonly transactionRepository: any,
    private readonly userRepository: any,
    private readonly audioRepository: any
  ) {}

  /**
   * Set course approval status
   */
  public async setCourseApprovalStatus(courseId: number, isApproved: boolean, notes?: string): Promise<any> {
    try {
      // Check if course exists
      const course = await this.courseRepository.findById(courseId);
      
      if (!course) {
        throw new NotFoundError('Course not found');
      }
      
      // Update course approval status
      const updatedCourse = await this.courseRepository.update(courseId, {
        isApproved,
        adminNotes: notes,
        reviewedAt: new Date()
      });
      
      return updatedCourse;
    } catch (error) {
      logger.error(`Error in setCourseApprovalStatus service for ID ${courseId}:`, error);
      throw error;
    }
  }

  /**
   * Get all feedback with pagination and filters
   */
  public async getAllFeedback(options: PaginationOptions, filters?: any): Promise<PaginationResult<any>> {
    try {
      return await this.feedbackRepository.findAll(options, filters);
    } catch (error) {
      logger.error('Error in getAllFeedback service:', error);
      throw error;
    }
  }

  /**
   * Process feedback
   */
  public async processFeedback(feedbackId: number, updateData: FeedbackProcessData): Promise<any> {
    try {
      // Check if feedback exists
      const feedback = await this.feedbackRepository.findById(feedbackId);
      
      if (!feedback) {
        throw new NotFoundError('Feedback not found');
      }
      
      // Update feedback
      const updatedFeedback = await this.feedbackRepository.update(feedbackId, {
        ...updateData,
        processedAt: new Date()
      });
      
      return updatedFeedback;
    } catch (error) {
      logger.error(`Error in processFeedback service for ID ${feedbackId}:`, error);
      throw error;
    }
  }

  /**
   * Create coupon
   */
  public async createCoupon(couponData: CouponCreateData): Promise<any> {
    try {
      // Check if coupon code already exists
      const existingCoupon = await this.couponRepository.findByCode(couponData.code);
      
      if (existingCoupon) {
        throw new ValidationError({ code: 'Coupon code already exists' });
      }
      
      // Validate discount - must have either discountAmount or discountPercent, not both
      if (couponData.discountAmount !== undefined && couponData.discountPercent !== undefined) {
        throw new ValidationError({ discount: 'Cannot have both discount amount and discount percent' });
      }
      
      if (couponData.discountAmount === undefined && couponData.discountPercent === undefined) {
        throw new ValidationError({ discount: 'Either discount amount or discount percent is required' });
      }
      
      // Validate dates
      const validFrom = new Date(couponData.validFrom);
      const validTo = new Date(couponData.validTo);
      
      if (isNaN(validFrom.getTime())) {
        throw new ValidationError({ validFrom: 'Invalid date' });
      }
      
      if (isNaN(validTo.getTime())) {
        throw new ValidationError({ validTo: 'Invalid date' });
      }
      
      if (validTo <= validFrom) {
        throw new ValidationError({ validTo: 'End date must be after start date' });
      }
      
      // Create coupon
      const coupon = await this.couponRepository.create(couponData);
      
      return coupon;
    } catch (error) {
      logger.error('Error in createCoupon service:', error);
      throw error;
    }
  }

  /**
   * Get all coupons with pagination and filters
   */
  public async getAllCoupons(options: PaginationOptions, filters?: any): Promise<PaginationResult<any>> {
    try {
      return await this.couponRepository.findAll(options, filters);
    } catch (error) {
      logger.error('Error in getAllCoupons service:', error);
      throw error;
    }
  }

  /**
   * Update coupon
   */
  public async updateCoupon(couponId: number, updateData: CouponUpdateData): Promise<any> {
    try {
      // Check if coupon exists
      const coupon = await this.couponRepository.findById(couponId);
      
      if (!coupon) {
        throw new NotFoundError('Coupon not found');
      }
      
      // If code is being updated, check if it's unique
      if (updateData.code && updateData.code !== coupon.code) {
        const existingCoupon = await this.couponRepository.findByCode(updateData.code);
        
        if (existingCoupon) {
          throw new ValidationError({ code: 'Coupon code already exists' });
        }
      }
      
      // Validate discount - if both are provided, it's an error
      if (updateData.discountAmount !== undefined && updateData.discountPercent !== undefined) {
        throw new ValidationError({ discount: 'Cannot have both discount amount and discount percent' });
      }
      
      // If one is provided and the other is null, check that we don't end up with no discount
      if (updateData.discountAmount === null && (coupon.discountPercent === null || updateData.discountPercent === null)) {
        throw new ValidationError({ discount: 'Either discount amount or discount percent is required' });
      }
      
      if (updateData.discountPercent === null && (coupon.discountAmount === null || updateData.discountAmount === null)) {
        throw new ValidationError({ discount: 'Either discount amount or discount percent is required' });
      }
      
      // Validate dates if provided
      if (updateData.validFrom && updateData.validTo) {
        const validFrom = new Date(updateData.validFrom);
        const validTo = new Date(updateData.validTo);
        
        if (validTo <= validFrom) {
          throw new ValidationError({ validTo: 'End date must be after start date' });
        }
      } else if (updateData.validFrom) {
        const validFrom = new Date(updateData.validFrom);
        const validTo = coupon.validTo;
        
        if (validTo <= validFrom) {
          throw new ValidationError({ validFrom: 'Start date must be before current end date' });
        }
      } else if (updateData.validTo) {
        const validFrom = coupon.validFrom;
        const validTo = new Date(updateData.validTo);
        
        if (validTo <= validFrom) {
          throw new ValidationError({ validTo: 'End date must be after current start date' });
        }
      }
      
      // Update coupon
      const updatedCoupon = await this.couponRepository.update(couponId, updateData);
      
      return updatedCoupon;
    } catch (error) {
      logger.error(`Error in updateCoupon service for ID ${couponId}:`, error);
      throw error;
    }
  }

  /**
   * Delete coupon
   */
  public async deleteCoupon(couponId: number): Promise<boolean> {
    try {
      // Check if coupon exists
      const coupon = await this.couponRepository.findById(couponId);
      
      if (!coupon) {
        throw new NotFoundError('Coupon not found');
      }
      
      // Delete coupon
      await this.couponRepository.delete(couponId);
      
      return true;
    } catch (error) {
      logger.error(`Error in deleteCoupon service for ID ${couponId}:`, error);
      throw error;
    }
  }

  /**
   * Get transactions with pagination and filters
   */
  public async getTransactions(options: PaginationOptions, filters?: any): Promise<PaginationResult<any>> {
    try {
      return await this.transactionRepository.findAll(options, filters);
    } catch (error) {
      logger.error('Error in getTransactions service:', error);
      throw error;
    }
  }

  /**
   * Get revenue report
   */
  public async getRevenueReport(period: string, startDate?: Date, endDate?: Date): Promise<any> {
    try {
      // Default dates if not provided
      const end = endDate || new Date();
      let start;
      
      if (startDate) {
        start = startDate;
      } else {
        start = new Date();
        
        // Set default start date based on period
        switch (period) {
          case 'day':
            start.setDate(start.getDate() - 7); // Last 7 days
            break;
          case 'week':
            start.setDate(start.getDate() - 28); // Last 4 weeks
            break;
          case 'month':
            start.setMonth(start.getMonth() - 6); // Last 6 months
            break;
          case 'year':
            start.setFullYear(start.getFullYear() - 2); // Last 2 years
            break;
          default:
            start.setMonth(start.getMonth() - 1); // Default to last month
        }
      }
      
      // Get revenue data
      const revenueData = await this.transactionRepository.getRevenueReport(period, start, end);
      
      // Calculate totals and process data
      let totalRevenue = 0;
      let totalTransactions = 0;
      
      revenueData.data.forEach((item: any) => {
        totalRevenue += item.revenue;
        totalTransactions += item.count;
      });
      
      return {
        period,
        startDate: start,
        endDate: end,
        totalRevenue,
        totalTransactions,
        averageTransactionValue: totalTransactions > 0 ? totalRevenue / totalTransactions : 0,
        data: revenueData.data,
      };
    } catch (error) {
      logger.error('Error in getRevenueReport service:', error);
      throw error;
    }
  }

  /**
   * Get user activity report
   */
  public async getUserActivityReport(period: string, startDate?: Date, endDate?: Date): Promise<any> {
    try {
      // Default dates if not provided
      const end = endDate || new Date();
      let start;
      
      if (startDate) {
        start = startDate;
      } else {
        start = new Date();
        
        // Set default start date based on period
        switch (period) {
          case 'day':
            start.setDate(start.getDate() - 7); // Last 7 days
            break;
          case 'week':
            start.setDate(start.getDate() - 28); // Last 4 weeks
            break;
          case 'month':
            start.setMonth(start.getMonth() - 6); // Last 6 months
            break;
          case 'year':
            start.setFullYear(start.getFullYear() - 2); // Last 2 years
            break;
          default:
            start.setMonth(start.getMonth() - 1); // Default to last month
        }
      }
      
      // Get user activity data
      const signups = await this.userRepository.getSignupReport(period, start, end);
      const activeSessions = await this.userRepository.getActiveSessionsReport(period, start, end);
      
      return {
        period,
        startDate: start,
        endDate: end,
        totalNewUsers: signups.total,
        totalActiveSessions: activeSessions.total,
        data: {
          signups: signups.data,
          activeSessions: activeSessions.data,
        },
      };
    } catch (error) {
      logger.error('Error in getUserActivityReport service:', error);
      throw error;
    }
  }

  /**
   * Get content statistics report
   */
  public async getContentStatsReport(): Promise<any> {
    try {
      // Get counts for different content types
      const audioCount = await this.audioRepository.getCount();
      const premiumAudioCount = await this.audioRepository.getCount({ isPremium: true });
      const courseCount = await this.courseRepository.getCount();
      const artistCount = await this.userRepository.getArtistCount();
      const verifiedArtistCount = await this.userRepository.getVerifiedArtistCount();
      
      // Get top content
      const topAudios = await this.audioRepository.getTopAudios(5);
      const topArtists = await this.userRepository.getTopArtists(5);
      
      return {
        counts: {
          totalAudios: audioCount,
          premiumAudios: premiumAudioCount,
          totalCourses: courseCount,
          totalArtists: artistCount,
          verifiedArtists: verifiedArtistCount,
        },
        topContent: {
          audios: topAudios,
          artists: topArtists,
        },
      };
    } catch (error) {
      logger.error('Error in getContentStatsReport service:', error);
      throw error;
    }
  }
}

export default AdminService;

