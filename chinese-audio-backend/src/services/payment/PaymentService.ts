// // backend/src/services/payment/PaymentService.ts (continued)
// import { 
//   IPaymentService, 
//   SubscriptionCreateData, 
//   CouponCreateData,
//   SubscriptionPlanType,
//   PaymentStatusType,
//   SubscriptionStatusType
// } from './IPaymentService';
// import { IUserRepository } from '../../db/repositories/user/IUserRepository';
// import { ISubscriptionRepository } from '../../db/repositories/subscription/ISubscriptionRepository';
// import { ITransactionRepository } from '../../db/repositories/transaction/ITransactionRepository';
// import { ICouponRepository } from '../../db/repositories/coupon/ICouponRepository';
// import { Subscription } from '../../db/models/subscription.model';
// import { Transaction } from '../../db/models/transaction.model';
// import { Coupon } from '../../db/models/coupon.model';
// import { PaginationOptions, PaginationResult } from '../../types/pagination';
// import { 
//   NotFoundError, 
//   ValidationError, 
//   ForbiddenError,
//   ExternalServiceError
// } from '../../utils/errors';
// import logger from '../../utils/logger';
// import sequelize from '../../db';
// import config from '../../config';

// export class PaymentService implements IPaymentService {
//   constructor(
//     private readonly userRepository: IUserRepository,
//     private readonly subscriptionRepository: ISubscriptionRepository,
//     private readonly transactionRepository: ITransactionRepository,
//     private readonly couponRepository: ICouponRepository
//   ) {}

//   // Previous methods...

//   /**
//    * Get subscription base price based on plan type
//    */
//   private getSubscriptionBasePrice(planType: SubscriptionPlanType): number {
//     switch (planType) {
//       case SubscriptionPlanType.MONTHLY:
//         return 9.99;
//       case SubscriptionPlanType.QUARTERLY:
//         return 24.99;
//       case SubscriptionPlanType.ANNUAL:
//         return 89.99;
//       default:
//         throw new ValidationError({ planType: 'Invalid subscription plan type' });
//     }
//   }

//   /**
//    * Get subscription duration in days based on plan type
//    */
//   private getSubscriptionDurationDays(planType: SubscriptionPlanType): number {
//     switch (planType) {
//       case SubscriptionPlanType.MONTHLY:
//         return 30;
//       case SubscriptionPlanType.QUARTERLY:
//         return 90;
//       case SubscriptionPlanType.ANNUAL:
//         return 365;
//       default:
//         throw new ValidationError({ planType: 'Invalid subscription plan type' });
//     }
//   }

//   /**
//    * Map webhook status to transaction status
//    */
//   private mapWebhookStatusToTransactionStatus(webhookStatus: string): PaymentStatusType {
//     switch (webhookStatus.toLowerCase()) {
//       case 'completed':
//       case 'success':
//       case 'succeeded':
//         return PaymentStatusType.COMPLETED;
//       case 'failed':
//       case 'failure':
//         return PaymentStatusType.FAILED;
//       case 'refunded':
//         return PaymentStatusType.REFUNDED;
//       default:
//         return PaymentStatusType.PENDING;
//     }
//   }
// }

// export default PaymentService;