// backend/src/types/responses/UserResponse.ts
import { IUserDetails } from '../models/User';

/**
 * User profile response
 */
export interface IProfileResponse extends IUserDetails {
  // Additional fields for profile
  subscriptionStatus?: 'free' | 'premium';
  subscriptionExpiry?: Date | null;
  verificationStatus?: 'pending' | 'verified' | 'rejected';
  followingCount?: number;
  playlistCount?: number;
}

/**
 * User settings response
 */
export interface IUserSettingsResponse {
  language: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  theme: 'light' | 'dark' | 'system';
  audioQualityPreference: 'standard' | 'high' | 'premium';
  autoplayEnabled: boolean;
  downloadOverCellular: boolean;
}

/**
 * User subscription response
 */
export interface ISubscriptionResponse {
  id: number;
  subscriptionType: 'monthly' | 'quarterly' | 'annual';
  startDate: Date;
  endDate: Date;
  isAutoRenew: boolean;
  status: 'active' | 'expired' | 'cancelled' | 'pending';
  price: number;
  features: string[];
  transactions: Array<{
    id: number;
    amount: number;
    paymentMethod: string;
    status: string;
    transactionDate: Date;
  }>;
}

/**
 * Cancel subscription response
 */
export interface ICancelSubscriptionResponse {
  message: string;
  success: boolean;
  endDate: Date;
}

/**
 * Coupon response
 */
export interface ICouponResponse {
  code: string;
  discountAmount: number;
  discountPercent: number;
  validFrom: Date;
  validTo: Date;
  isValid: boolean;
  message?: string;
}

/**
 * Delete account response
 */
export interface IDeleteAccountResponse {
  message: string;
  success: boolean;
}