// backend/src/api/controllers/payment/PaymentController.ts
import { Request, Response } from 'express';
import { IPaymentService } from '../../../services/payment/IPaymentService';
import ApiResponse from '../../../utils/response';
import { NotFoundError, ValidationError, ForbiddenError } from '../../../utils/errors';
import logger from '../../../utils/logger';

/**
 * Controller for handling payment-related requests
 */
export class PaymentController {
  constructor(private readonly paymentService: IPaymentService) {}

  /**
   * Get subscription plans
   * GET /api/payments/plans
   */
  public async getSubscriptionPlans(req: Request, res: Response): Promise<Response> {
    try {
      const plans = await this.paymentService.getSubscriptionPlans();
      return ApiResponse.success(res, plans);
    } catch (error) {
      logger.error('Error in getSubscriptionPlans controller:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch subscription plans';
      return ApiResponse.error(res, errorMessage);
    }
  }

  /**
   * Get user's active subscription
   * GET /api/payments/subscriptions/active
   */
  public async getActiveSubscription(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.user?.id;
      
      if (!userId) {
        return ApiResponse.unauthorized(res, 'Authentication required');
      }
      
      const subscription = await this.paymentService.getActiveSubscription(userId);
      
      // If no active subscription, return null with success status
      if (!subscription) {
        return ApiResponse.success(res, null, 'No active subscription found');
      }
      
      return ApiResponse.success(res, subscription);
    } catch (error) {
      logger.error('Error in getActiveSubscription controller:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch active subscription';
      return ApiResponse.error(res, errorMessage);
    }
  }

  /**
   * Get user's subscription history
   * GET /api/payments/subscriptions/history
   */
  public async getSubscriptionHistory(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.user?.id;
      
      if (!userId) {
        return ApiResponse.unauthorized(res, 'Authentication required');
      }
      
      const history = await this.paymentService.getSubscriptionHistory(userId);
      return ApiResponse.success(res, history);
    } catch (error) {
      logger.error('Error in getSubscriptionHistory controller:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch subscription history';
      return ApiResponse.error(res, errorMessage);
    }
  }

  /**
   * Create checkout session for new subscription
   * POST /api/payments/checkout
   */
  public async createCheckoutSession(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.user?.id;
      
      if (!userId) {
        return ApiResponse.unauthorized(res, 'Authentication required');
      }
      
      // Validate required fields
      if (!req.body.planId) {
        return ApiResponse.fail(res, { planId: 'Plan ID is required' }, 'Validation failed');
      }
      
      // Get coupon code if provided
      const couponCode = req.body.couponCode;
      
      // Create checkout session
      const checkoutSession = await this.paymentService.createCheckoutSession(
        userId,
        req.body.planId,
        couponCode
      );
      
      return ApiResponse.success(res, checkoutSession, 'Checkout session created successfully');
    } catch (error) {
      logger.error('Error in createCheckoutSession controller:', error);
      
      if (error instanceof ValidationError) {
        return ApiResponse.fail(res, error.data, error.message);
      }
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to create checkout session';
      return ApiResponse.error(res, errorMessage);
    }
  }

  /**
   * Handle successful checkout completion
   * POST /api/payments/checkout/success
   */
  public async handleCheckoutSuccess(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.user?.id;
      
      if (!userId) {
        return ApiResponse.unauthorized(res, 'Authentication required');
      }
      
      // Validate required fields
      if (!req.body.sessionId) {
        return ApiResponse.fail(res, { sessionId: 'Session ID is required' }, 'Validation failed');
      }
      
      // Process the successful checkout
      const subscription = await this.paymentService.processSuccessfulCheckout(
        userId,
        req.body.sessionId
      );
      
      return ApiResponse.success(res, subscription, 'Subscription created successfully');
    } catch (error) {
      logger.error('Error in handleCheckoutSuccess controller:', error);
      
      if (error instanceof ValidationError) {
        return ApiResponse.fail(res, error.data, error.message);
      }
      
      if (error instanceof NotFoundError) {
        return ApiResponse.notFound(res, error.message);
      }
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to process checkout';
      return ApiResponse.error(res, errorMessage);
    }
  }

  /**
   * Cancel subscription
   * POST /api/payments/subscriptions/cancel
   */
  public async cancelSubscription(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.user?.id;
      
      if (!userId) {
        return ApiResponse.unauthorized(res, 'Authentication required');
      }
      
      // Validate required fields
      if (!req.body.subscriptionId) {
        return ApiResponse.fail(res, { subscriptionId: 'Subscription ID is required' }, 'Validation failed');
      }
      
      // Get subscription to check ownership
      const subscription = await this.paymentService.getSubscriptionById(req.body.subscriptionId);
      
      if (!subscription) {
        return ApiResponse.notFound(res, 'Subscription not found');
      }
      
      // Check if user owns the subscription
      if (subscription.userId !== userId) {
        return ApiResponse.forbidden(res, 'You can only cancel your own subscriptions');
      }
      
      // Cancel the subscription
      const result = await this.paymentService.cancelSubscription(req.body.subscriptionId);
      
      return ApiResponse.success(res, result, 'Subscription cancelled successfully');
    } catch (error) {
      logger.error('Error in cancelSubscription controller:', error);
      
      if (error instanceof ValidationError) {
        return ApiResponse.fail(res, error.data, error.message);
      }
      
      if (error instanceof NotFoundError) {
        return ApiResponse.notFound(res, error.message);
      }
      
      if (error instanceof ForbiddenError) {
        return ApiResponse.forbidden(res, error.message);
      }
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to cancel subscription';
      return ApiResponse.error(res, errorMessage);
    }
  }

  /**
   * Validate coupon code
   * POST /api/payments/validate-coupon
   */
  public async validateCoupon(req: Request, res: Response): Promise<Response> {
    try {
      // Validate required fields
      if (!req.body.code) {
        return ApiResponse.fail(res, { code: 'Coupon code is required' }, 'Validation failed');
      }
      
      const couponInfo = await this.paymentService.validateCoupon(req.body.code);
      
      if (!couponInfo) {
        return ApiResponse.fail(res, { code: 'Invalid or expired coupon code' }, 'Invalid coupon');
      }
      
      return ApiResponse.success(res, couponInfo, 'Valid coupon code');
    } catch (error) {
      logger.error('Error in validateCoupon controller:', error);
      
      if (error instanceof ValidationError) {
        return ApiResponse.fail(res, error.data, error.message);
      }
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to validate coupon';
      return ApiResponse.error(res, errorMessage);
    }
  }

  /**
   * Webhook endpoint for payment provider events
   * POST /api/payments/webhook
   */
  public async handleWebhook(req: Request, res: Response): Promise<Response> {
    try {
      // Get signature from headers
      const signature = req.headers['x-webhook-signature'] as string;
      
      if (!signature) {
        return ApiResponse.unauthorized(res, 'Missing webhook signature');
      }
      
      // Process the webhook event
      await this.paymentService.processWebhookEvent(req.body, signature);
      
      // Always return success to acknowledge receipt
      return ApiResponse.success(res, { received: true });
    } catch (error) {
      logger.error('Error in handleWebhook controller:', error);
      
      // Even if there's an error, we return 200 to acknowledge receipt
      // but log the error for investigation
      return ApiResponse.success(res, { received: true, error: error instanceof Error ? error.message : 'Unknown error' });
    }
  }

  /**
   * Get user's transaction history
   * GET /api/payments/transactions
   */
  public async getUserTransactions(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.user?.id;
      
      if (!userId) {
        return ApiResponse.unauthorized(res, 'Authentication required');
      }
      
      const transactions = await this.paymentService.getUserTransactions(userId);
      return ApiResponse.success(res, transactions);
    } catch (error) {
      logger.error('Error in getUserTransactions controller:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch transaction history';
      return ApiResponse.error(res, errorMessage);
    }
  }

  /**
   * Get transaction receipt
   * GET /api/payments/transactions/:id/receipt
   */
  public async getTransactionReceipt(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.user?.id;
      
      if (!userId) {
        return ApiResponse.unauthorized(res, 'Authentication required');
      }
      
      const transactionId = parseInt(req.params.id);
      
      if (isNaN(transactionId)) {
        return ApiResponse.fail(res, { id: 'Invalid transaction ID' }, 'Validation failed');
      }
      
      // Get transaction to check ownership
      const transaction = await this.paymentService.getTransactionById(transactionId);
      
      if (!transaction) {
        return ApiResponse.notFound(res, 'Transaction not found');
      }
      
      // Check if user owns the transaction (through subscription)
      if (transaction.subscription.userId !== userId) {
        return ApiResponse.forbidden(res, 'You can only access your own transaction receipts');
      }
      
      // Generate receipt
      const receipt = await this.paymentService.generateTransactionReceipt(transactionId);
      
      return ApiResponse.success(res, receipt);
    } catch (error) {
      logger.error(`Error in getTransactionReceipt controller for ID ${req.params.id}:`, error);
      
      if (error instanceof NotFoundError) {
        return ApiResponse.notFound(res, error.message);
      }
      
      if (error instanceof ForbiddenError) {
        return ApiResponse.forbidden(res, error.message);
      }
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate receipt';
      return ApiResponse.error(res, errorMessage);
    }
  }
}

export default PaymentController;