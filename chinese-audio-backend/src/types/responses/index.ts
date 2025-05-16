// backend/src/types/responses/index.ts
export * from './AuthResponse';
export * from './UserResponse';

// Export other response types that would be here

import { PaginationMeta } from '../api';
import { IAudioDetails, IArtistDetails } from '../models';

/**
 * Paginated response interface
 */
export interface IPaginatedResponse<T> {
  items: T[];
  meta: PaginationMeta;
}

/**
 * Audio response interfaces
 */

export interface IAudioResponse extends IAudioDetails {}

export interface IAudioUploadResponse {
  id: number;
  title: string;
  dropboxUrl: string;
  message: string;
  isApproved: boolean;
  needsApproval: boolean;
}

export interface IAudioDeleteResponse {
  message: string;
  success: boolean;
}

export interface IAudioTranscriptResponse {
  id: number;
  audioId: number;
  content: string;
  language: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Playlist response interfaces
 */

export interface IPlaylistResponse {
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
  audioCount: number;
  audios?: IAudioDetails[];
  creator?: {
    id: number;
    fullName: string;
    profileImage?: string;
  };
}

export interface IPlaylistCreateResponse {
  id: number;
  title: string;
  message: string;
}

/**
 * Course response interfaces
 */

export interface ICourseResponse {
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
  audioCount: number;
  audios?: IAudioDetails[];
  artist?: {
    id: number;
    fullName: string;
    profileImage?: string;
    isVerified: boolean;
  };
  category?: {
    id: number;
    name: string;
  };
  sections?: Array<{
    title: string;
    audios: IAudioDetails[];
  }>;
}

export interface ICourseCreateResponse {
  id: number;
  title: string;
  message: string;
  isApproved: boolean;
  needsApproval: boolean;
}

/**
 * Artist response interfaces
 */

export interface IArtistResponse extends IArtistDetails {}

export interface IArtistVerificationResponse {
  message: string;
  status: 'pending' | 'approved' | 'rejected' | 'additional_info_required';
  submittedAt: Date;
  processedAt?: Date;
  adminNotes?: string;
}

/**
 * Admin response interfaces
 */

export interface IAdminStatsResponse {
  userCount: number;
  artistCount: number;
  audioCount: number;
  pendingVerifications: number;
  pendingApprovals: number;
  activeSubscriptions: number;
  revenueStats: {
    daily: number;
    weekly: number;
    monthly: number;
    yearly: number;
  };
  popularAudios: IAudioDetails[];
  popularArtists: IArtistDetails[];
}

export interface ICategoryResponse {
  id: number;
  parentCategoryId?: number;
  name: string;
  description?: string;
  audioCount?: number;
  subcategories?: ICategoryResponse[];
}

export interface ITagResponse {
  id: number;
  name: string;
  audioCount?: number;
}

export interface IFeedbackResponse {
  id: number;
  userId: number;
  audioId?: number;
  artistId?: number;
  content: string;
  feedbackType: 'bug' | 'suggestion' | 'content_issue' | 'other';
  isResolved: boolean;
  createdAt: Date;
  updatedAt: Date;
  user?: {
    fullName: string;
    email: string;
  };
}