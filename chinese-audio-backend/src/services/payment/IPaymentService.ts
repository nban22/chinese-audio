// src/services/payment/IPaymentService.ts
// import { PaginatedResult, PaginationOptions } from '../../types/pagination';

export interface CheckoutSessionData {
  sessionId: string;
  url: string;
  expires: Date;
}

export interface TransactionReceiptData {
  transactionId: number;
  userId: number;
  subscriptionId: number;
  amount: number;
  status: string;
  paymentMethod: string;
  createdAt: Date;
  receiptUrl?: string;
  invoiceId?: string;
}

export interface CouponInfo {
  id: number;
  code: string;
  discountAmount?: number;
  discountPercent?: number;
  validFrom: Date;
  validTo: Date;
  isActive: boolean;
  description?: string;
}

export interface IPaymentService {
  getSubscriptionPlans(): Promise<any[]>;
  getActiveSubscription(userId: number): Promise<any | null>;
  getSubscriptionHistory(userId: number): Promise<any[]>;
  getSubscriptionById(subscriptionId: number): Promise<any | null>;
  createCheckoutSession(userId: number, planId: number, couponCode?: string): Promise<CheckoutSessionData>;
  processSuccessfulCheckout(userId: number, sessionId: string): Promise<any>;
  cancelSubscription(subscriptionId: number): Promise<any>;
  validateCoupon(code: string): Promise<CouponInfo | null>;
  processWebhookEvent(eventData: any, signature: string): Promise<void>;
  getUserTransactions(userId: number): Promise<any[]>;
  getTransactionById(transactionId: number): Promise<any | null>;
  generateTransactionReceipt(transactionId: number): Promise<TransactionReceiptData>;
}