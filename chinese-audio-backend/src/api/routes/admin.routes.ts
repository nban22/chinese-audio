// backend/src/api/routes/admin.routes.ts
import { Router } from 'express';
import { controllers } from '../controllers';
import authMiddleware from '../middlewares/auth/authMiddleware';
import { adminValidation } from '../middlewares/validation';

const router = Router();
const { adminController } = controllers;

// All admin routes require authentication and admin role
router.use(authMiddleware.authenticate);
router.use(authMiddleware.requireAdmin);

/**
 * @route   GET /api/admin/feedback
 * @desc    Get all user feedback/reports
 * @access  Private (Admin only)
 */
router.get(
  '/feedback',
  adminController.getAllFeedback.bind(adminController)
);

/**
 * @route   PUT /api/admin/feedback/:id
 * @desc    Process user feedback/report
 * @access  Private (Admin only)
 */
router.put(
  '/feedback/:id',
  adminValidation.processFeedback,
  adminController.processFeedback.bind(adminController)
);

/**
 * @route   PUT /api/admin/courses/:id/approval
 * @desc    Approve or reject course content
 * @access  Private (Admin only)
 */
router.put(
  '/courses/:id/approval',
  adminValidation.setApprovalStatus,
  adminController.setCourseApprovalStatus.bind(adminController)
);

/**
 * @route   POST /api/admin/coupons
 * @desc    Create coupon
 * @access  Private (Admin only)
 */
router.post(
  '/coupons',
  adminValidation.createCoupon,
  adminController.createCoupon.bind(adminController)
);

/**
 * @route   GET /api/admin/coupons
 * @desc    Get all coupons
 * @access  Private (Admin only)
 */
router.get(
  '/coupons',
  adminController.getAllCoupons.bind(adminController)
);

/**
 * @route   PUT /api/admin/coupons/:id
 * @desc    Update coupon
 * @access  Private (Admin only)
 */
router.put(
  '/coupons/:id',
  adminValidation.updateCoupon,
  adminController.updateCoupon.bind(adminController)
);

/**
 * @route   DELETE /api/admin/coupons/:id
 * @desc    Delete coupon
 * @access  Private (Admin only)
 */
router.delete(
  '/coupons/:id',
  adminController.deleteCoupon.bind(adminController)
);

/**
 * @route   GET /api/admin/transactions
 * @desc    Get payment transactions
 * @access  Private (Admin only)
 */
router.get(
  '/transactions',
  adminController.getTransactions.bind(adminController)
);

/**
 * @route   GET /api/admin/reports/revenue
 * @desc    Get revenue reports
 * @access  Private (Admin only)
 */
router.get(
  '/reports/revenue',
  adminController.getRevenueReport.bind(adminController)
);

/**
 * @route   GET /api/admin/reports/user-activity
 * @desc    Get user activity reports
 * @access  Private (Admin only)
 */
router.get(
  '/reports/user-activity',
  adminController.getUserActivityReport.bind(adminController)
);

/**
 * @route   GET /api/admin/reports/content-stats
 * @desc    Get content statistics reports
 * @access  Private (Admin only)
 */
router.get(
  '/reports/content-stats',
  adminController.getContentStatsReport.bind(adminController)
);

export default router;