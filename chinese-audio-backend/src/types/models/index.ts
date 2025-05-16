// backend/src/types/models/index.ts
export * from './User';
export * from './Artist';
export * from './Audio';

// Export other model types that would be here
export interface ICategory {
  id: number;
  parentCategoryId?: number;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITag {
  id: number;
  name: string;
  createdAt: Date;
}

export interface IPlaylist {
  id: number;
  userId?: number;
  adminId?: number;
  title: string;
  description?: string;
  coverImage?: string;
  isPublic: boolean;
  isEditorial: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICourse {
  id: number;
  artistId: number;
  categoryId?: number;
  title: string;
  description?: string;
  coverImage?: string;
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  isPremium: boolean;
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISubscription {
  id: number;
  userId: number;
  subscriptionType: 'monthly' | 'quarterly' | 'annual';
  startDate: Date;
  endDate: Date;
  isAutoRenew: boolean;
  status: 'active' | 'expired' | 'cancelled' | 'pending';
}

export interface ITransaction {
  id: number;
  subscriptionId: number;
  couponId?: number;
  amount: number;
  paymentMethod: 'credit_card' | 'paypal' | 'bank_transfer' | 'crypto' | 'other';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  transactionDate: Date;
}

export interface ICoupon {
  id: number;
  adminId: number;
  code: string;
  discountAmount: number;
  discountPercent: number;
  validFrom: Date;
  validTo: Date;
  usageLimit?: number;
  usedCount: number;
}