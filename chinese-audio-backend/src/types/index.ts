// backend/src/types/index.ts
// Export all types from models, requests, responses
export * from './models';
// Explicitly export all from requests except IArtistVerificationRequest to avoid conflict
export * from './requests';
// If you still need IArtistVerificationRequest, export it only once, e.g.:
export { IArtistVerificationRequest } from './models';
// Remove or comment out the export of IArtistVerificationRequest from './requests' if present
// Explicitly export only non-conflicting responses to avoid duplicate exports
export {
  // Export only responses NOT already exported from './models'
  // If you want to use the versions from './models', do not export them here
  // Add other response interfaces here as needed, e.g.:
  // IOtherResponse,
} from './responses';

// Explicitly export the conflicting responses from './models' only
export {
  IArtistVerificationResponse,
  ICancelSubscriptionResponse,
  ICouponResponse,
  IDeleteAccountResponse,
  IProfileResponse,
  ISubscriptionResponse,
  IUserSettingsResponse,
} from './models';
export * from './api';
// Explicitly export PaginationMeta only once to avoid ambiguity
export { PaginationMeta } from './api';
// Export other members from pagination except PaginationMeta
export { 
  // Add other exports from './pagination' here, e.g.:
  // IPaginationRequest, IPaginationResponse
} from './pagination';

// Custom type definitions not covered in other files

/**
 * JWT token payload interface
 */
export interface IJwtPayload {
  userId: number;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

/**
 * File upload information
 */
export interface IFileUpload {
  filename: string;
  originalname: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
  path?: string;
  url?: string;
}

/**
 * Dropbox file information
 */
export interface IDropboxFile {
  path: string;
  name: string;
  id: string;
  size: number;
  url?: string;
  thumbnailUrl?: string;
  contentHash?: string;
}

/**
 * Email message interface
 */
export interface IEmailMessage {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  from?: string;
  attachments?: Array<{
    filename: string;
    content: string | Buffer;
    contentType?: string;
  }>;
}

/**
 * User notification interface
 */
export interface INotification {
  id: number;
  userId: number;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  relatedId?: number;
  relatedType?: 'audio' | 'artist' | 'playlist' | 'course' | 'subscription';
  createdAt: Date;
}

/**
 * Audit log interface
 */
export interface IAuditLog {
  id: number;
  userId?: number;
  action: string;
  entityType: string;
  entityId?: number;
  details?: any;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}

/**
 * API key interface
 */
export interface IApiKey {
  id: number;
  userId: number;
  key: string;
  name: string;
  permissions: string[];
  expiresAt?: Date;
  lastUsedAt?: Date;
  createdAt: Date;
}

/**
 * Dashboard stats interface
 */
export interface IDashboardStats {
  totalAudios: number;
  totalPlays: number;
  totalLikes: number;
  averageRating: number;
  followerCount: number;
  recentUploads: Array<{
    id: number;
    title: string;
    playsCount: number;
    likesCount: number;
    uploadDate: Date;
  }>;
  popularAudios: Array<{
    id: number;
    title: string;
    playsCount: number;
    likesCount: number;
  }>;
  recentActivity: Array<{
    type: 'play' | 'like' | 'comment' | 'follow';
    date: Date;
    details: any;
  }>;
}