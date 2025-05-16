// src/services/admin/IAdminService.ts
import { PaginationOptions, PaginationResult } from '../../types/pagination';

export interface AdminApprovalData {
  courseId: number;
  isApproved: boolean;
  notes?: string;
}

export interface FeedbackProcessData {
  isResolved: boolean;
  adminNotes?: string;
}

export interface CouponCreateData {
  code: string;
  discountAmount?: number;
  discountPercent?: number;
  validFrom: Date;
  validTo: Date;
  maxUses?: number;
  isActive: boolean;
  description?: string;
  adminId: number;
}

export interface CouponUpdateData {
  code?: string;
  discountAmount?: number;
  discountPercent?: number;
  validFrom?: Date;
  validTo?: Date;
  maxUses?: number;
  isActive?: boolean;
  description?: string;
}

export interface TransactionFilterOptions {
  status?: string;
  userId?: number;
  startDate?: Date;
  endDate?: Date;
}

export interface IAdminService {
  // Course approval
  setCourseApprovalStatus(courseId: number, isApproved: boolean, notes?: string): Promise<any>;
  
  // Feedback management
  getAllFeedback(options: PaginationOptions, filters?: any): Promise<PaginationResult<any>>;
  processFeedback(feedbackId: number, updateData: FeedbackProcessData): Promise<any>;
  
  // Coupon management
  createCoupon(couponData: CouponCreateData): Promise<any>;
  getAllCoupons(options: PaginationOptions, filters?: any): Promise<PaginationResult<any>>;
  updateCoupon(couponId: number, updateData: CouponUpdateData): Promise<any>;
  deleteCoupon(couponId: number): Promise<boolean>;
  
  // Transactions
  getTransactions(options: PaginationOptions, filters?: TransactionFilterOptions): Promise<PaginationResult<any>>;
  
  // Reports
  getRevenueReport(period: string, startDate?: Date, endDate?: Date): Promise<any>;
  getUserActivityReport(period: string, startDate?: Date, endDate?: Date): Promise<any>;
  getContentStatsReport(): Promise<any>;
}
