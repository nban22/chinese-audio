// // backend/src/services/payment/IPaymentService.ts
// import { Subscription } from '../../db/models/subscription.model';
// import { Transaction } from '../../db/models/transaction.model';
// import { Coupon } from '../../db/models/coupon.model';
// import { PaginationOptions, PaginationResult } from '../../types/pagination';

// /**
//  * Subscription plan type
//  */
// export enum SubscriptionPlanType {
//   MONTHLY = 'monthly',
//   QUARTERLY = 'quarterly',
//   ANNUAL = 'annual',
// }

// /**
//  * Payment method type
//  */
// export enum PaymentMethodType {
//   CREDIT_CARD = 'credit_card',
//   PAYPAL = 'paypal',
//   BANK_TRANSFER = 'bank_transfer',
//   CRYPTO = 'crypto',
//   OTHER = 'other',
// }

// /**
//  * Payment status type
//  */
// export enum PaymentStatusType {
//   PENDING = 'pending',
//   COMPLETED = 'completed',
//   FAILED = 'failed',
//   REFUNDED = 'refunded',
// }

// /**
//  * Subscription status type
//  */
// export enum SubscriptionStatusType {
//   ACTIVE = 'active',
//   EXPIRED = 'expired',
//   CANCELLED = 'cancelled',
//   PENDING = 'pending',
// }

// /**
//  * Subscription creation data
//  */
// export interface SubscriptionCreateData {
//   userId: number;
//   planType: SubscriptionPlanType;
//   paymentMethod: PaymentMethodType;
//   couponCode?: string;
//   autoRenew?: boolean;
// }

// /**
//  * Coupon creation data
//  */
// export interface CouponCreateData {
//   adminId: number;
//   code: string;
//   discountAmount?: number;
//   discountPercent?: number;
//   validFrom: Date;
//   validTo: Date;
//   usageLimit?: number;
// }

// /**
//  * Payment service interface
//  */
// export interface IPaymentService {
//   /**
//    * Create subscription
//    * @param data Subscription creation data
//    * @returns Created subscription with transaction
//    */
//   createSubscription(data: SubscriptionCreateData): Promise<{ subscription: Subscription; transaction: Transaction }>;
  
//   /**
//    * Cancel subscription
//    * @param subscriptionId Subscription ID
//    * @param userId User ID (for authorization)
//    * @returns Updated subscription
//    */
//   cancelSubscription(subscriptionId: number, userId: number): Promise<Subscription | null>;
  
//   /**
//    * Get user subscriptions
//    * @param userId User ID
//    * @param options Pagination options
//    * @returns Paginated result with user's subscriptions
//    */
//   getUserSubscriptions(userId: number, options: PaginationOptions): Promise<PaginationResult<Subscription>>;
  
//   /**
//    * Get subscription by ID
//    * @param subscriptionId Subscription ID
//    * @returns Subscription or null if not found
//    */
//   getSubscriptionById(subscriptionId: number): Promise<Subscription | null>;
  
//   /**
//    * Get subscription transactions
//    * @param subscriptionId Subscription ID
//    * @param options Pagination options
//    * @returns Paginated result with subscription's transactions
//    */
//   getSubscriptionTransactions(subscriptionId: number, options: PaginationOptions): Promise<PaginationResult<Transaction>>;
  
//   /**
//    * Create coupon
//    * @param data Coupon creation data
//    * @returns Created coupon
//    */
//   createCoupon(data: CouponCreateData): Promise<Coupon>;
  
//   /**
//    * Get coupon by code
//    * @param code Coupon code
//    * @returns Coupon or null if not found
//    */
//   getCouponByCode(code: string): Promise<Coupon | null>;
  
//   /**
//    * Validate coupon
//    * @param code Coupon code
//    * @returns Validation result with coupon if valid
//    */
//   validateCoupon(code: string): Promise<{ isValid: boolean; message?: string; coupon?: Coupon }>;
  
//   /**
//    * Calculate price with coupon
//    * @param basePrice Base price
//    * @param couponCode Coupon code
//    * @returns Calculated price, discount, and coupon
//    */
//   calculatePriceWithCoupon(
//     basePrice: number,
//     couponCode?: string
//   ): Promise<{ 
//     finalPrice: number; 
//     discount: number; 
//     coupon?: Coupon 
//   }>;
  
//   /**
//    * Calculate subscription price
//    * @param planType Subscription plan type
//    * @param couponCode Coupon code
//    * @returns Calculated price, discount, and coupon
//    */
//   calculateSubscriptionPrice(
//     planType: SubscriptionPlanType,
//     couponCode?: string
//   ): Promise<{ 
//     basePrice: number; 
//     finalPrice: number; 
//     discount: number; 
//     coupon?: Coupon 
//   }>;
  
//   /**
//    * Process payment webhook
//    * @param payload Webhook payload
//    * @returns Processed transaction
//    */
//   processPaymentWebhook(payload: any): Promise<Transaction>;
// }

// export default IPaymentService;