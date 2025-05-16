// backend/src/api/routes/payment.routes.ts
import { Router } from 'express';
import { controllers } from '../controllers';
import authMiddleware from '../middlewares/auth/authMiddleware';
import { paymentValidation } from '../middlewares/validation';

const router = Router();
const { paymentController } = controllers;

/**
 * @route   GET /api/payments/plans
 * @desc    Get subscription plans
 * @access  Public
 */
router.get(
  '/plans',
  paymentController.getSubscriptionPlans.bind(paymentController)
);

/**
 * @route   POST /api/payments/validate-coupon
 * @desc    Validate coupon code
 * @access  Public
 */
router.post(
  '/validate-coupon',
  paymentValidation.validateCoupon,
  paymentController.validateCoupon.bind(paymentController)
);

/**
 * @route   GET /api/payments/subscriptions/active
 * @desc    Get user's active subscription
 * @access  Private
 */
router.get(
  '/subscriptions/active',
  authMiddleware.authenticate,
  paymentController.getActiveSubscription.bind(paymentController)
);

/**
 * @route   GET /api/payments/subscriptions/history
 * @desc    Get user's subscription history
 * @access  Private
 */
router.get(
  '/subscriptions/history',
  authMiddleware.authenticate,
  paymentController.getSubscriptionHistory.bind(paymentController)
);

/**
 * @route   POST /api/payments/subscriptions/cancel
 * @desc    Cancel subscription
 * @access  Private
 */
router.post(
  '/subscriptions/cancel',
  authMiddleware.authenticate,
  paymentValidation.cancelSubscription,
  paymentController.cancelSubscription.bind(paymentController)
);

/**
 * @route   POST /api/payments/checkout
 * @desc    Create checkout session for new subscription
 * @access  Private
 */
router.post(
  '/checkout',
  authMiddleware.authenticate,
  paymentValidation.createCheckoutSession,
  paymentController.createCheckoutSession.bind(paymentController)
);

/**
 * @route   POST /api/payments/checkout/success
 * @desc    Handle successful checkout completion
 * @access  Private
 */
router.post(
  '/checkout/success',
  authMiddleware.authenticate,
  paymentValidation.handleCheckoutSuccess,
  paymentController.handleCheckoutSuccess.bind(paymentController)
);

/**
 * @route   GET /api/payments/transactions
 * @desc    Get user's transaction history
 * @access  Private
 */
router.get(
  '/transactions',
  authMiddleware.authenticate,
  paymentController.getUserTransactions.bind(paymentController)
);

/**
 * @route   GET /api/payments/transactions/:id/receipt
 * @desc    Get transaction receipt
 * @access  Private
 */
router.get(
  '/transactions/:id/receipt',
  authMiddleware.authenticate,
  paymentController.getTransactionReceipt.bind(paymentController)
);

/**
 * @route   POST /api/payments/webhook
 * @desc    Webhook endpoint for payment provider events
 * @access  Public (but verified by signature)
 */
router.post(
  '/webhook',
  paymentController.handleWebhook.bind(paymentController)
);

export default router;