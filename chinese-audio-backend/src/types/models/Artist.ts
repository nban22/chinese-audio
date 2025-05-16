// backend/src/types/models/Artist.ts
/**
 * Artist model interface
 */
export interface IArtist {
  id: number;
  userId: number;
  bio?: string;
  contactInfo?: string;
  isVerified: boolean;
  verifiedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Artist creation input interface
 */
export interface IArtistCreateInput {
  userId: number;
  bio?: string;
  contactInfo?: string;
  isVerified?: boolean;
  verifiedAt?: Date;
}

/**
 * Artist update input interface
 */
export interface IArtistUpdateInput {
  bio?: string;
  contactInfo?: string;
  isVerified?: boolean;
  verifiedAt?: Date;
}

/**
 * Artist details for returned data
 * Includes User information
 */
export interface IArtistDetails extends IArtist {
  user?: {
    email: string;
    fullName: string;
    profileImage?: string;
    userType: string;
  };
  followersCount?: number;
  contentCount?: number;
}

/**
 * Artist verification request
 */
export interface IArtistVerificationRequest {
  artistId: number;
  documents?: string[];
  message?: string;
}

/**
 * Artist verification response
 */
export interface IArtistVerificationResponse {
  id: number;
  artistId: number;
  status: 'pending' | 'approved' | 'rejected' | 'additional_info_required';
  adminNotes?: string;
  submittedAt: Date;
  processedAt?: Date;
}