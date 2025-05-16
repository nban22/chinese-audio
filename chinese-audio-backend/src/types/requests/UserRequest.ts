// backend/src/types/requests/UserRequest.ts
/**
 * Update user profile request interface
 */
export interface IUpdateProfileRequest {
  fullName?: string;
  phoneNumber?: string;
  profileImage?: string;
  // For artists
  bio?: string;
  contactInfo?: string;
}

/**
 * Change email request interface
 */
export interface IChangeEmailRequest {
  newEmail: string;
  password: string;
}

/**
 * Update user settings request interface
 */
export interface IUpdateSettingsRequest {
  language?: string;
  emailNotifications?: boolean;
  pushNotifications?: boolean;
  theme?: 'light' | 'dark' | 'system';
  audioQualityPreference?: 'standard' | 'high' | 'premium';
  autoplayEnabled?: boolean;
  downloadOverCellular?: boolean;
}

/**
 * Delete account request interface
 */
export interface IDeleteAccountRequest {
  password: string;
  reason?: string;
  feedback?: string;
}

/**
 * Subscribe to premium request interface
 */
export interface ISubscribeRequest {
  subscriptionType: 'monthly' | 'quarterly' | 'annual';
  paymentMethod: 'credit_card' | 'paypal' | 'bank_transfer' | 'crypto' | 'other';
  paymentDetails: any;
  couponCode?: string;
  isAutoRenew?: boolean;
}

/**
 * Cancel subscription request interface
 */
export interface ICancelSubscriptionRequest {
  reason?: string;
  feedback?: string;
}

/**
 * Update subscription request interface
 */
export interface IUpdateSubscriptionRequest {
  subscriptionType?: 'monthly' | 'quarterly' | 'annual';
  isAutoRenew?: boolean;
}

/**
 * Apply coupon request interface
 */
export interface IApplyCouponRequest {
  couponCode: string;
  subscriptionType: 'monthly' | 'quarterly' | 'annual';
}