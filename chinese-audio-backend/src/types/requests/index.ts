// backend/src/types/requests/index.ts
export * from './AuthRequest';
export * from './UserRequest';

// Export other request types that would be here

/**
 * Audio upload request interface
 */
export interface IAudioUploadRequest {
  title: string;
  description?: string;
  categoryId?: number;
  coverImage?: string;
  duration: number;
  qualityLevel?: 'standard' | 'high' | 'premium';
  isPremium?: boolean;
  isDownloadable?: boolean;
  tags?: number[] | string;
}

/**
 * Audio update request interface
 */
export interface IAudioUpdateRequest {
  title?: string;
  description?: string;
  categoryId?: number;
  coverImage?: string;
  duration?: number;
  qualityLevel?: 'standard' | 'high' | 'premium';
  isPremium?: boolean;
  isDownloadable?: boolean;
  tags?: number[] | string;
}

/**
 * Audio search request interface
 */
export interface IAudioSearchRequest {
  searchTerm?: string;
  categoryId?: number;
  artistId?: number;
  tags?: number[] | string;
  isPremium?: boolean;
  isDownloadable?: boolean;
  qualityLevel?: 'standard' | 'high' | 'premium';
  sortBy?: 'uploadDate' | 'title' | 'duration' | 'popularity';
  sortDirection?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

/**
 * Create playlist request interface
 */
export interface ICreatePlaylistRequest {
  title: string;
  description?: string;
  coverImage?: string;
  isPublic?: boolean;
  audioIds?: number[];
}

/**
 * Create course request interface
 */
export interface ICreateCourseRequest {
  title: string;
  description?: string;
  categoryId?: number;
  coverImage?: string;
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  isPremium?: boolean;
  audioIds?: number[];
  sections?: Array<{
    title: string;
    audioIds: number[];
  }>;
}

/**
 * Artist verification request interface
 */
export interface IArtistVerificationRequest {
  documents?: string[];
  message?: string;
}

/**
 * Admin verification response interface
 */
export interface IVerificationResponseRequest {
  status: 'approved' | 'rejected' | 'additional_info_required';
  adminNotes?: string;
}

/**
 * Create category request interface
 */
export interface ICreateCategoryRequest {
  name: string;
  description?: string;
  parentCategoryId?: number;
}

/**
 * Create tag request interface
 */
export interface ICreateTagRequest {
  name: string;
}

/**
 * Create coupon request interface
 */
export interface ICreateCouponRequest {
  code: string;
  discountAmount?: number;
  discountPercent?: number;
  validFrom: Date | string;
  validTo: Date | string;
  usageLimit?: number;
}

/**
 * Audio transcript request interface
 */
export interface IAudioTranscriptRequest {
  content: string;
  language: string;
}

/**
 * Rate audio request interface
 */
export interface IRateAudioRequest {
  ratingValue: number;
  comment?: string;
}

/**
 * Feedback request interface
 */
export interface IFeedbackRequest {
  content: string;
  feedbackType: 'bug' | 'suggestion' | 'content_issue' | 'other';
  audioId?: number;
  artistId?: number;
}