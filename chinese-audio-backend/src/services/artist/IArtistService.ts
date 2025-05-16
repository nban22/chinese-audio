// backend/src/services/artist/IArtistService.ts
import { Artist } from '../../db/models/artist.model';
import { User } from '../../db/models/user.model';
import { PaginationOptions, PaginationResult } from '../../types/pagination';
import { Audio } from '../../db/models/audio.model';

/**
 * Artist creation data
 */
export interface ArtistCreateData {
  userId: number;
  bio?: string;
  contactInfo?: string;
}

/**
 * Artist update data
 */
export interface ArtistUpdateData {
  bio?: string;
  contactInfo?: string;
}

/**
 * Artist verification data
 */
export interface ArtistVerificationData {
  artistId: number;
  adminId: number;
  isApproved: boolean;
  adminNotes?: string;
}

/**
 * Artist service interface
 */
export interface IArtistService {
  /**
   * Get artist by ID
   * @param artistId Artist ID
   * @returns Artist object or null if not found
   */
  getArtistById(artistId: number): Promise<Artist | null>;
  
  /**
   * Get artist by user ID
   * @param userId User ID
   * @returns Artist object or null if not found
   */
  getArtistByUserId(userId: number): Promise<Artist | null>;
  
  /**
   * Get artist with user information
   * @param artistId Artist ID
   * @returns Artist with user relation or null if not found
   */
  getArtistWithUser(artistId: number): Promise<Artist | null>;
  
  /**
   * Get all artists with pagination
   * @param options Pagination options
   * @returns Paginated result with artists
   */
  getAllArtists(options: PaginationOptions): Promise<PaginationResult<Artist>>;
  
  /**
   * Get verified artists with pagination
   * @param options Pagination options
   * @returns Paginated result with verified artists
   */
  getVerifiedArtists(options: PaginationOptions): Promise<PaginationResult<Artist>>;
  
  /**
   * Get pending verification artists with pagination
   * @param options Pagination options
   * @returns Paginated result with pending verification artists
   */
  getPendingVerificationArtists(options: PaginationOptions): Promise<PaginationResult<Artist>>;
  
  /**
   * Search artists by name or bio
   * @param searchTerm Search term
   * @param options Pagination options
   * @returns Paginated result with matching artists
   */
  searchArtists(searchTerm: string, options: PaginationOptions): Promise<PaginationResult<Artist>>;
  
  /**
   * Get popular artists based on follows count
   * @param options Pagination options
   * @returns Paginated result with popular artists
   */
  getPopularArtists(options: PaginationOptions): Promise<PaginationResult<Artist>>;
  
  /**
   * Create artist profile for existing user
   * @param artistData Artist creation data
   * @returns Created artist object
   */
  createArtist(artistData: ArtistCreateData): Promise<Artist>;
  
  /**
   * Update artist profile
   * @param artistId Artist ID
   * @param artistData Artist update data
   * @returns Updated artist object
   */
  updateArtist(artistId: number, artistData: ArtistUpdateData): Promise<Artist | null>;
  
  /**
   * Verify or reject artist
   * @param verificationData Artist verification data
   * @returns Updated artist object
   */
  verifyArtist(verificationData: ArtistVerificationData): Promise<Artist | null>;
  
  /**
   * Get artist audios with pagination
   * @param artistId Artist ID
   * @param options Pagination options
   * @returns Paginated result with artist's audios
   */
  getArtistAudios(artistId: number, options: PaginationOptions): Promise<PaginationResult<Audio>>;
  
  /**
   * Count verified artists
   * @returns Number of verified artists
   */
  countVerifiedArtists(): Promise<number>;
}

export default IArtistService;