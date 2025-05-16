// src/api/controllers/admin/AdminController.ts
import { Request, Response } from 'express';
import { IAdminService } from '../../../services/admin/IAdminService';
import { IUserService } from '../../../services/user/IUserService';
import { IArtistService } from '../../../services/artist/IArtistService';
import ApiResponse from '../../../utils/response';
import { PaginationOptions } from '../../../types/pagination';
import { NotFoundError, ValidationError, ForbiddenError } from '../../../utils/errors';
import logger from '../../../utils/logger';
import config from '../../../config';

export class AdminController {
  constructor(
    private readonly adminService: IAdminService,
    private readonly userService: IUserService,
    private readonly artistService: IArtistService
  ) {}

  /**
   * Set course approval status
   * PUT /api/admin/courses/:id/approval
   */
  public async setCourseApprovalStatus(req: Request, res: Response): Promise<Response> {
    try {
      const courseId = parseInt(req.params.id);
      
      if (isNaN(courseId)) {
        return ApiResponse.fail(res, { id: 'Invalid course ID' }, 'Validation failed');
      }
      
      // Validate required fields
      if (req.body.isApproved === undefined) {
        return ApiResponse.fail(res, { isApproved: 'Approval status is required' }, 'Validation failed');
      }
      
      const isApproved = req.body.isApproved === true;
      const notes = req.body.notes;
      
      const result = await this.adminService.setCourseApprovalStatus(courseId, isApproved, notes);
      
      const message = isApproved ? 'Course approved successfully' : 'Course rejected successfully';
      return ApiResponse.success(res, result, message);
    } catch (error) {
      logger.error(`Error in setCourseApprovalStatus controller for ID ${req.params.id}:`, error);
      
      if (error instanceof NotFoundError) {
        return ApiResponse.notFound(res, error.message);
      }
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to update course approval status';
      return ApiResponse.error(res, errorMessage);
    }
  }

  /**
   * Get all user feedback/reports
   * GET /api/admin/feedback
   */
  public async getAllFeedback(req: Request, res: Response): Promise<Response> {
    try {
      const page = parseInt(req.query.page as string) || config.pagination.defaultPage;
      const limit = parseInt(req.query.limit as string) || config.pagination.defaultLimit;
      const options: PaginationOptions = { page, limit };
      
      // Extract filters from query params
      const filters: Record<string, any> = {};
      
      if (req.query.isResolved !== undefined) {
        filters.isResolved = req.query.isResolved === 'true';
      }
      
      if (req.query.feedbackType) {
        filters.feedbackType = req.query.feedbackType;
      }
      
      const result = await this.adminService.getAllFeedback(options, filters);
      
      return ApiResponse.paginatedSuccess(res, result);
    } catch (error) {
      logger.error('Error in getAllFeedback controller:', error);
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch feedback';
      return ApiResponse.error(res, errorMessage);
    }
  }

  /**
   * Process user feedback/report
   * PUT /api/admin/feedback/:id
   */
  public async processFeedback(req: Request, res: Response): Promise<Response> {
    try {
      const feedbackId = parseInt(req.params.id);
      
      if (isNaN(feedbackId)) {
        return ApiResponse.fail(res, { id: 'Invalid feedback ID' }, 'Validation failed');
      }
      
      // Validate required fields
      if (req.body.isResolved === undefined) {
        return ApiResponse.fail(res, { isResolved: 'Resolution status is required' }, 'Validation failed');
      }
      
      const updateData = {
        isResolved: req.body.isResolved === true,
        adminNotes: req.body.adminNotes
      };
      
      const result = await this.adminService.processFeedback(feedbackId, updateData);
      
      return ApiResponse.success(res, result, 'Feedback processed successfully');
    } catch (error) {
      logger.error(`Error in processFeedback controller for ID ${req.params.id}:`, error);
      
      if (error instanceof NotFoundError) {
        return ApiResponse.notFound(res, error.message);
      }
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to process feedback';
      return ApiResponse.error(res, errorMessage);
    }
  }

  /**
   * Create coupon
   * POST /api/admin/coupons
   */
  public async createCoupon(req: Request, res: Response): Promise<Response> {
    try {
      // Validate required fields
      const validationErrors: Record<string, string> = {};
      
      if (!req.body.code) {
        validationErrors.code = 'Coupon code is required';
      }
      
      if (req.body.discountAmount === undefined && req.body.discountPercent === undefined) {
        validationErrors.discount = 'Either discount amount or discount percent is required';
      }
      
      if (!req.body.validFrom) {
        validationErrors.validFrom = 'Valid from date is required';
      }
      
      if (!req.body.validTo) {
        validationErrors.validTo = 'Valid to date is required';
      }
      
      if (Object.keys(validationErrors).length > 0) {
        return ApiResponse.fail(res, validationErrors, 'Validation failed');
      }
      
      // Prepare coupon data
      const couponData = {
        ...req.body,
        adminId: req.user?.adminId
      };
      
      const coupon = await this.adminService.createCoupon(couponData);
      
      return ApiResponse.success(res, coupon, 'Coupon created successfully', 201);
    } catch (error) {
      logger.error('Error in createCoupon controller:', error);
      
      if (error instanceof ValidationError) {
        return ApiResponse.fail(res, error.data, error.message);
      }
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to create coupon';
      return ApiResponse.error(res, errorMessage);
    }
  }

  /**
   * Get all coupons
   * GET /api/admin/coupons
   */
  public async getAllCoupons(req: Request, res: Response): Promise<Response> {
    try {
      const page = parseInt(req.query.page as string) || config.pagination.defaultPage;
      const limit = parseInt(req.query.limit as string) || config.pagination.defaultLimit;
      const options: PaginationOptions = { page, limit };
      
      // Extract filters from query params
      const filters: Record<string, any> = {};
      
      if (req.query.isActive !== undefined) {
        filters.isActive = req.query.isActive === 'true';
      }
      
      const result = await this.adminService.getAllCoupons(options, filters);
      
      return ApiResponse.paginatedSuccess(res, result);
    } catch (error) {
      logger.error('Error in getAllCoupons controller:', error);
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch coupons';
      return ApiResponse.error(res, errorMessage);
    }
  }

  /**
   * Update coupon
   * PUT /api/admin/coupons/:id
   */
  public async updateCoupon(req: Request, res: Response): Promise<Response> {
    try {
      const couponId = parseInt(req.params.id);
      
      if (isNaN(couponId)) {
        return ApiResponse.fail(res, { id: 'Invalid coupon ID' }, 'Validation failed');
      }
      
      // Prepare update data
      const updateData = { ...req.body };
      
      // Remove undefined values
      Object.keys(updateData).forEach(key => 
        updateData[key] === undefined && delete updateData[key]
      );
      
      const coupon = await this.adminService.updateCoupon(couponId, updateData);
      
      return ApiResponse.success(res, coupon, 'Coupon updated successfully');
    } catch (error) {
      logger.error(`Error in updateCoupon controller for ID ${req.params.id}:`, error);
      
      if (error instanceof NotFoundError) {
        return ApiResponse.notFound(res, error.message);
      }
      
      if (error instanceof ValidationError) {
        return ApiResponse.fail(res, error.data, error.message);
      }
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to update coupon';
      return ApiResponse.error(res, errorMessage);
    }
  }

  /**
   * Delete coupon
   * DELETE /api/admin/coupons/:id
   */
  public async deleteCoupon(req: Request, res: Response): Promise<Response> {
    try {
      const couponId = parseInt(req.params.id);
      
      if (isNaN(couponId)) {
        return ApiResponse.fail(res, { id: 'Invalid coupon ID' }, 'Validation failed');
      }
      
      await this.adminService.deleteCoupon(couponId);
      
      return ApiResponse.success(res, null, 'Coupon deleted successfully');
    } catch (error) {
      logger.error(`Error in deleteCoupon controller for ID ${req.params.id}:`, error);
      
      if (error instanceof NotFoundError) {
        return ApiResponse.notFound(res, error.message);
      }
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete coupon';
      return ApiResponse.error(res, errorMessage);
    }
  }

  /**
   * Get payment transactions
   * GET /api/admin/transactions
   */
  public async getTransactions(req: Request, res: Response): Promise<Response> {
    try {
      const page = parseInt(req.query.page as string) || config.pagination.defaultPage;
      const limit = parseInt(req.query.limit as string) || config.pagination.defaultLimit;
      const options: PaginationOptions = { page, limit };
      
      // Extract filters from query params
      const filters: Record<string, any> = {};
      
      if (req.query.status) {
        filters.status = req.query.status;
      }
      
      if (req.query.userId) {
        filters.userId = parseInt(req.query.userId as string);
      }
      
      if (req.query.startDate) {
        filters.startDate = new Date(req.query.startDate as string);
      }
      
      if (req.query.endDate) {
        filters.endDate = new Date(req.query.endDate as string);
      }
      
      const result = await this.adminService.getTransactions(options, filters);
      
      return ApiResponse.paginatedSuccess(res, result);
    } catch (error) {
      logger.error('Error in getTransactions controller:', error);
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch transactions';
      return ApiResponse.error(res, errorMessage);
    }
  }

  /**
   * Get revenue reports
   * GET /api/admin/reports/revenue
   */
  public async getRevenueReport(req: Request, res: Response): Promise<Response> {
    try {
      // Extract report parameters
      const period = req.query.period as string || 'month'; // day, week, month, year
      const startDate = req.query.startDate ? new Date(req.query.startDate as string) : undefined;
      const endDate = req.query.endDate ? new Date(req.query.endDate as string) : undefined;
      
      const report = await this.adminService.getRevenueReport(period, startDate, endDate);
      
      return ApiResponse.success(res, report);
    } catch (error) {
      logger.error('Error in getRevenueReport controller:', error);
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate revenue report';
      return ApiResponse.error(res, errorMessage);
    }
  }

  /**
   * Get user activity reports
   * GET /api/admin/reports/user-activity
   */
  public async getUserActivityReport(req: Request, res: Response): Promise<Response> {
    try {
      // Extract report parameters
      const period = req.query.period as string || 'month'; // day, week, month, year
      const startDate = req.query.startDate ? new Date(req.query.startDate as string) : undefined;
      const endDate = req.query.endDate ? new Date(req.query.endDate as string) : undefined;
      
      const report = await this.adminService.getUserActivityReport(period, startDate, endDate);
      
      return ApiResponse.success(res, report);
    } catch (error) {
      logger.error('Error in getUserActivityReport controller:', error);
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate user activity report';
      return ApiResponse.error(res, errorMessage);
    }
  }

  /**
   * Get content statistics reports
   * GET /api/admin/reports/content-stats
   */
  public async getContentStatsReport(req: Request, res: Response): Promise<Response> {
    try {
      const report = await this.adminService.getContentStatsReport();
      
      return ApiResponse.success(res, report);
    } catch (error) {
      logger.error('Error in getContentStatsReport controller:', error);
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate content statistics report';
      return ApiResponse.error(res, errorMessage);
    }
  }
}

export default AdminController;