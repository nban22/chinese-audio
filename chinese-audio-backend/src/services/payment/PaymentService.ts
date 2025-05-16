// src/services/payment/PaymentService.ts
import { IPaymentService, CheckoutSessionData, TransactionReceiptData, CouponInfo } from './IPaymentService';
import { ValidationError, NotFoundError, ForbiddenError } from '../../utils/errors';
import logger from '../../utils/logger';

export class PaymentService implements IPaymentService {
  constructor(
    private readonly transactionRepository: any,
    private readonly subscriptionRepository: any,
    private readonly couponRepository: any
  ) {}

  /**
   * Get available subscription plans
   */
  public async getSubscriptionPlans(): Promise<any[]> {
    try {
      // This could be fetched from a database or from a payment provider API
      // For simplicity, we'll just return hardcoded plans
      return [
        {
          id: 1,
          name: 'Basic',
          description: 'Access to all basic content',
          price: 9.99,
          intervalUnit: 'month',
          features: ['Access to all basic audio content', 'Limited courses', 'No ads'],
        },
        {
          id: 2,
          name: 'Premium',
          description: 'Full access to all content including premium',
          price: 19.99,
          intervalUnit: 'month',
          features: ['Access to all content including premium', 'All courses', 'No ads', 'Offline listening'],
        },
        {
          id: 3,
          name: 'Annual Premium',
          description: 'Full access with annual billing (save 16%)',
          price: 199.99,
          intervalUnit: 'year',
          features: ['Access to all content including premium', 'All courses', 'No ads', 'Offline listening'],
        },
      ];
    } catch (error) {
      logger.error('Error in getSubscriptionPlans service:', error);
      throw error;
    }
  }

  /**
   * Get user's active subscription
   */
  public async getActiveSubscription(userId: number): Promise<any | null> {
    try {
      return await this.subscriptionRepository.findActiveByUserId(userId);
    } catch (error) {
      logger.error(`Error in getActiveSubscription service for user ID ${userId}:`, error);
      throw error;
    }
  }

  /**
   * Get user's subscription history
   */
  public async getSubscriptionHistory(userId: number): Promise<any[]> {
    try {
      return await this.subscriptionRepository.findAllByUserId(userId);
    } catch (error) {
      logger.error(`Error in getSubscriptionHistory service for user ID ${userId}:`, error);
      throw error;
    }
  }

  /**
   * Get subscription by ID
   */
  public async getSubscriptionById(subscriptionId: number): Promise<any | null> {
    try {
      return await this.subscriptionRepository.findById(subscriptionId);
    } catch (error) {
      logger.error(`Error in getSubscriptionById service for ID ${subscriptionId}:`, error);
      throw error;
    }
  }

  /**
   * Create checkout session for new subscription
   */
  public async createCheckoutSession(userId: number, planId: number, couponCode?: string): Promise<CheckoutSessionData> {
    try {
      // Validate plan
      const plans = await this.getSubscriptionPlans();
      const plan = plans.find(p => p.id === planId);
      
      if (!plan) {
        throw new ValidationError({ planId: 'Invalid plan ID' });
      }
      
      // Check if user already has an active subscription
      const activeSubscription = await this.getActiveSubscription(userId);
      
      if (activeSubscription) {
        throw new ValidationError({ subscription: 'User already has an active subscription' });
      }
      
      // Apply coupon if provided
      let discount = 0;
      let couponId: number | null = null;
      
      if (couponCode) {
        const coupon = await this.validateCoupon(couponCode);
        
        if (coupon) {
          couponId = coupon.id;
          
          if (coupon.discountAmount) {
            discount = coupon.discountAmount;
          } else if (coupon.discountPercent) {
            discount = (plan.price * coupon.discountPercent) / 100;
          }
        }
      }
      
      // In a real implementation, you would integrate with a payment provider like Stripe
      // For simplicity, we'll just create a fake checkout session
      const sessionId = `cs_${Date.now()}_${userId}_${planId}`;
      const expires = new Date();
      expires.setHours(expires.getHours() + 1); // Session expires in 1 hour
      
      const checkoutSession = {
        sessionId,
        url: `https://example.com/checkout/${sessionId}`,
        expires,
      };
      
      // Save checkout session in database for later verification
      await this.subscriptionRepository.createCheckoutSession({
        userId,
        planId,
        sessionId,
        couponId,
        amount: plan.price,
        discount,
        expires,
      });
      
      return checkoutSession;
    } catch (error) {
      logger.error(`Error in createCheckoutSession service for user ID ${userId} and plan ID ${planId}:`, error);
      throw error;
    }
  }

  /**
   * Process successful checkout completion
   */
  public async processSuccessfulCheckout(userId: number, sessionId: string): Promise<any> {
    try {
      // Retrieve checkout session
      const session = await this.subscriptionRepository.findCheckoutSession(sessionId);
      
      if (!session) {
        throw new NotFoundError('Checkout session not found');
      }
      
      if (session.userId !== userId) {
        throw new ForbiddenError('Session does not belong to this user');
      }
      
      if (session.expired) {
        throw new ValidationError({ session: 'Checkout session has expired' });
      }
      
      if (session.completed) {
        throw new ValidationError({ session: 'Checkout session already processed' });
      }
      
      // Get plan details
      const plans = await this.getSubscriptionPlans();
      const plan = plans.find(p => p.id === session.planId);
      
      if (!plan) {
        throw new Error('Plan not found');
      }
      
      // Calculate end date based on plan interval
      const startDate = new Date();
      const endDate = new Date(startDate);
      
      if (plan.intervalUnit === 'month') {
        endDate.setMonth(endDate.getMonth() + 1);
      } else if (plan.intervalUnit === 'year') {
        endDate.setFullYear(endDate.getFullYear() + 1);
      }
      
      // Create subscription
      const subscription = await this.subscriptionRepository.create({
        userId,
        planId: plan.id,
        planName: plan.name,
        amount: session.amount - session.discount,
        startDate,
        endDate,
        status: 'active',
        couponId: session.couponId,
      });
      
      // Create transaction record
      await this.transactionRepository.create({
        userId,
        subscriptionId: subscription.id,
        amount: session.amount - session.discount,
        status: 'completed',
        paymentMethod: 'credit_card', // This would come from the payment provider
      });
      
      // Mark checkout session as completed
      await this.subscriptionRepository.completeCheckoutSession(sessionId);
      
      return subscription;
    } catch (error) {
      logger.error(`Error in processSuccessfulCheckout service for user ID ${userId} and session ID ${sessionId}:`, error);
      throw error;
    }
  }

  /**
   * Cancel subscription
   */
  public async cancelSubscription(subscriptionId: number): Promise<any> {
    try {
      // Check if subscription exists
      const subscription = await this.subscriptionRepository.findById(subscriptionId);
      
      if (!subscription) {
        throw new NotFoundError('Subscription not found');
      }
      
      if (subscription.status !== 'active') {
        throw new ValidationError({ status: 'Only active subscriptions can be cancelled' });
      }
      
      // In a real implementation, you would cancel the subscription with the payment provider
      
      // Update subscription in database
      const updatedSubscription = await this.subscriptionRepository.update(subscriptionId, {
        status: 'cancelled',
        cancelledAt: new Date(),
      });
      
      return updatedSubscription;
    } catch (error) {
      logger.error(`Error in cancelSubscription service for ID ${subscriptionId}:`, error);
      throw error;
    }
  }

  /**
   * Validate coupon code
   */
  public async validateCoupon(code: string): Promise<CouponInfo | null> {
    try {
      const coupon = await this.couponRepository.findByCode(code);
      
      if (!coupon) {
        return null;
      }
      
      const now = new Date();
      
      // Check if coupon is active and valid
      if (!coupon.isActive || 
          now < new Date(coupon.validFrom) || 
          now > new Date(coupon.validTo) ||
          (coupon.maxUses && coupon.usedCount >= coupon.maxUses)) {
        return null;
      }
      
      return coupon;
    } catch (error) {
      logger.error(`Error in validateCoupon service for code ${code}:`, error);
      throw error;
    }
  }

  /**
   * Process webhook event from payment provider
   */
  public async processWebhookEvent(eventData: any, signature: string): Promise<void> {
    try {
      // In a real implementation, you would verify the signature against a webhook secret
      // and process different types of events (payment succeeded, subscription created, etc.)
      
      // For simplicity, we'll just log the event data
      logger.info('Received webhook event:', eventData);
      
      // Handle different event types
      switch (eventData.type) {
        case 'payment_succeeded':
          // Update transaction status
          if (eventData.transactionId) {
            await this.transactionRepository.update(eventData.transactionId, {
              status: 'completed',
              paymentProvider: eventData.provider,
              providerTransactionId: eventData.providerTransactionId,
            });
          }
          break;
          
        case 'payment_failed':
          // Update transaction status
          if (eventData.transactionId) {
            await this.transactionRepository.update(eventData.transactionId, {
              status: 'failed',
              failureReason: eventData.failureReason,
            });
          }
          break;
          
        case 'subscription_canceled':
          // Update subscription status
          if (eventData.subscriptionId) {
            await this.subscriptionRepository.update(eventData.subscriptionId, {
              status: 'cancelled',
              cancelledAt: new Date(),
            });
          }
          break;
          
        default:
          logger.info(`Unhandled webhook event type: ${eventData.type}`);
      }
    } catch (error) {
      logger.error('Error in processWebhookEvent service:', error);
      throw error;
    }
  }

  /**
   * Get user's transaction history
   */
  public async getUserTransactions(userId: number): Promise<any[]> {
    try {
      return await this.transactionRepository.findAllByUserId(userId);
    } catch (error) {
      logger.error(`Error in getUserTransactions service for user ID ${userId}:`, error);
      throw error;
    }
  }

  /**
   * Get transaction by ID
   */
  public async getTransactionById(transactionId: number): Promise<any | null> {
    try {
      return await this.transactionRepository.findById(transactionId);
    } catch (error) {
      logger.error(`Error in getTransactionById service for ID ${transactionId}:`, error);
      throw error;
    }
  }

  /**
   * Generate transaction receipt
   */
  public async generateTransactionReceipt(transactionId: number): Promise<TransactionReceiptData> {
    try {
      // Get transaction with subscription details
      const transaction = await this.transactionRepository.findByIdWithDetails(transactionId);
      
      if (!transaction) {
        throw new NotFoundError('Transaction not found');
      }
      
      // Format receipt data
      const receiptData: TransactionReceiptData = {
        transactionId: transaction.id,
        userId: transaction.userId,
        subscriptionId: transaction.subscriptionId,
        amount: transaction.amount,
        status: transaction.status,
        paymentMethod: transaction.paymentMethod,
        createdAt: transaction.createdAt,
        receiptUrl: transaction.receiptUrl,
        invoiceId: transaction.invoiceId,
      };
      
      return receiptData;
    } catch (error) {
      logger.error(`Error in generateTransactionReceipt service for ID ${transactionId}:`, error);
      throw error;
    }
  }
}

export default PaymentService;