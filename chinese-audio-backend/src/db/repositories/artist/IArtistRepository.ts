// backend/src/db/repositories/artist/IArtistRepository.ts
import { FindOptions, WhereOptions, Includeable } from 'sequelize';
import { IBaseRepository } from '../base/IBaseRepository';
import { Artist } from '../../models/artist.model';
import { PaginationOptions, PaginationResult } from '../../../types/pagination';

/**
 * Artist repository interface that extends base repository
 */
export interface IArtistRepository extends IBaseRepository<Artist> {
  /**
   * Find artist by user ID
   * @param userId User ID
   * @param options Optional Sequelize find options
   * @returns Found artist or null
   */
  findByUserId(userId: number, options?: FindOptions): Promise<Artist | null>;
  
  /**
   * Find artist with user information
   * @param artistId Artist ID
   * @returns Artist with user relation or null
   */
  findWithUser(artistId: number): Promise<Artist | null>;
  
  /**
   * Find all verified artists with pagination
   * @param pagination Pagination options
   * @param options Additional Sequelize find options
   * @returns Paginated result
   */
  findAllVerified(pagination: PaginationOptions, options?: FindOptions): Promise<PaginationResult<Artist>>;
  
  /**
   * Find all artists pending verification with pagination
   * @param pagination Pagination options
   * @param options Additional Sequelize find options
   * @returns Paginated result
   */
  findAllPendingVerification(pagination: PaginationOptions, options?: FindOptions): Promise<PaginationResult<Artist>>;
  
  /**
   * Search artists by name or bio with pagination
   * @param searchTerm Search term
   * @param pagination Pagination options
   * @param options Additional Sequelize find options
   * @returns Paginated result
   */
  search(searchTerm: string, pagination: PaginationOptions, options?: FindOptions): Promise<PaginationResult<Artist>>;
  
  /**
   * Get popular artists based on followers count with pagination
   * @param pagination Pagination options
   * @param options Additional Sequelize find options
   * @returns Paginated result
   */
  getPopularArtists(pagination: PaginationOptions, options?: FindOptions): Promise<PaginationResult<Artist>>;
  
  /**
   * Get active artists (with recent audio uploads) with pagination
   * @param pagination Pagination options
   * @param options Additional Sequelize find options
   * @returns Paginated result
   */
  getActiveArtists(pagination: PaginationOptions, options?: FindOptions): Promise<PaginationResult<Artist>>;
  
  /**
   * Count total verified artists
   * @returns Number of verified artists
   */
  countVerified(): Promise<number>;
  
  /**
   * Get common includes for eager loading relations
   * @returns Array of Sequelize include options
   */
  getCommonIncludes(): Includeable[];
}

export default IArtistRepository;