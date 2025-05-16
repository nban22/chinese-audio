// src/db/repositories/playlist/IPlaylistRepository.ts
import { FindOptions, WhereOptions, Includeable } from 'sequelize';
import { IBaseRepository } from '../base/IBaseRepository';
import { Playlist } from '../../models/playlist.model';
import { PaginationOptions, PaginationResult } from '../../../types/pagination';

/**
 * Playlist repository interface that extends base repository
 */
export interface IPlaylistRepository extends IBaseRepository<Playlist> {
  /**
   * Find playlist by user ID with pagination
   * @param userId User ID
   * @param pagination Pagination options
   * @param options Additional Sequelize find options
   * @returns Paginated result
   */
  findByUserId(userId: number, pagination: PaginationOptions, options?: FindOptions): Promise<PaginationResult<Playlist>>;
  
  /**
   * Find playlist by admin ID with pagination
   * @param adminId Admin ID
   * @param pagination Pagination options
   * @param options Additional Sequelize find options
   * @returns Paginated result
   */
  findByAdminId(adminId: number, pagination: PaginationOptions, options?: FindOptions): Promise<PaginationResult<Playlist>>;
  
  /**
   * Find public playlists with pagination
   * @param pagination Pagination options
   * @param options Additional Sequelize find options
   * @returns Paginated result
   */
  findPublic(pagination: PaginationOptions, options?: FindOptions): Promise<PaginationResult<Playlist>>;
  
  /**
   * Find editorial playlists with pagination
   * @param pagination Pagination options
   * @param options Additional Sequelize find options
   * @returns Paginated result
   */
  findEditorial(pagination: PaginationOptions, options?: FindOptions): Promise<PaginationResult<Playlist>>;
  
  /**
   * Search playlists by title with pagination
   * @param searchTerm Search term
   * @param pagination Pagination options
   * @param options Additional Sequelize find options
   * @returns Paginated result
   */
  search(searchTerm: string, pagination: PaginationOptions, options?: FindOptions): Promise<PaginationResult<Playlist>>;
  
  /**
   * Get common includes for eager loading relations
   * @returns Array of Sequelize include options
   */
  getCommonIncludes(): Includeable[];
}

export default IPlaylistRepository;