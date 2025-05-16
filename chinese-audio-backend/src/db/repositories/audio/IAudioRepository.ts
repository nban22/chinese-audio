// backend/src/db/repositories/audio/IAudioRepository.ts
import { FindOptions, WhereOptions, Includeable } from 'sequelize';
import { IBaseRepository } from '../base/IBaseRepository';
import { Audio } from '../../models/audio.model';
import { PaginationOptions, PaginationResult } from '../../../types/pagination';

/**
 * Audio repository interface that extends base repository
 */
export interface IAudioRepository extends IBaseRepository<Audio> {
  /**
   * Find audios by artist ID with pagination
   */
  findByArtistId(
    artistId: number,
    pagination: PaginationOptions,
    options?: FindOptions
  ): Promise<PaginationResult<Audio>>;
  
  /**
   * Find audios by category ID with pagination
   */
  findByCategoryId(
    categoryId: number,
    pagination: PaginationOptions,
    options?: FindOptions
  ): Promise<PaginationResult<Audio>>;
  
  /**
   * Find audios by tags with pagination
   */
  findByTags(
    tagIds: number[],
    pagination: PaginationOptions,
    options?: FindOptions
  ): Promise<PaginationResult<Audio>>;
  
  /**
   * Search audios by title or description with pagination
   */
  search(
    searchTerm: string,
    pagination: PaginationOptions,
    options?: FindOptions
  ): Promise<PaginationResult<Audio>>;
  
  /**
   * Get featured audios with pagination
   */
  getFeaturedAudios(
    pagination: PaginationOptions,
    options?: FindOptions
  ): Promise<PaginationResult<Audio>>;
  
  /**
   * Get popular audios based on likes/ratings with pagination
   */
  getPopularAudios(
    pagination: PaginationOptions,
    options?: FindOptions
  ): Promise<PaginationResult<Audio>>;
  
  /**
   * Get recent audios with pagination
   */
  getRecentAudios(
    pagination: PaginationOptions,
    options?: FindOptions
  ): Promise<PaginationResult<Audio>>;
  
  /**
   * Get premium audios with pagination
   */
  getPremiumAudios(
    pagination: PaginationOptions,
    options?: FindOptions
  ): Promise<PaginationResult<Audio>>;
  
  /**
   * Find audio by ID with full details (including transcripts, ratings, etc.)
   */
  findByIdWithDetails(id: number): Promise<Audio | null>;
  
  /**
   * Get common includes for audio queries
   */
  getCommonIncludes(): Includeable[];
}

export default IAudioRepository;