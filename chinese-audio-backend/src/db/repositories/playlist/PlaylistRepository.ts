// src/db/repositories/playlist/PlaylistRepository.ts
import { FindOptions, WhereOptions, Op, Includeable } from 'sequelize';
import { IPlaylistRepository } from './IPlaylistRepository';
import { BaseRepository } from '../base/BaseRepository';
import { Playlist } from '../../models/playlist.model';
import { User } from '../../models/user.model';
import { Admin } from '../../models/admin.model';
import { PlaylistAudio } from '../../models/playlistAudio.model';
import { Audio } from '../../models/audio.model';
import { PaginationOptions, PaginationResult } from '../../../types/pagination';
import { DatabaseError } from '../../../utils/errors';
import logger from '../../../utils/logger';

/**
 * Playlist repository implementation
 */
export class PlaylistRepository extends BaseRepository<Playlist> implements IPlaylistRepository {
  constructor() {
    super(Playlist);
  }

  /**
   * Find playlist by user ID with pagination
   */
  async findByUserId(
    userId: number,
    pagination: PaginationOptions,
    options: FindOptions = {}
  ): Promise<PaginationResult<Playlist>> {
    try {
      const where = {
        ...(options.where || {}),
        userId,
      };
      
      return await this.findAllPaginated(pagination, {
        ...options,
        where,
        include: options.include || this.getCommonIncludes(),
      });
    } catch (error) {
      logger.error(`Error finding playlists by user ID ${userId}:`, error);
      throw new DatabaseError(`Failed to find playlists by user ID`, error as Error);
    }
  }
  
  /**
   * Find playlist by admin ID with pagination
   */
  async findByAdminId(
    adminId: number,
    pagination: PaginationOptions,
    options: FindOptions = {}
  ): Promise<PaginationResult<Playlist>> {
    try {
      const where = {
        ...(options.where || {}),
        adminId,
      };
      
      return await this.findAllPaginated(pagination, {
        ...options,
        where,
        include: options.include || this.getCommonIncludes(),
      });
    } catch (error) {
      logger.error(`Error finding playlists by admin ID ${adminId}:`, error);
      throw new DatabaseError(`Failed to find playlists by admin ID`, error as Error);
    }
  }
  
  /**
   * Find public playlists with pagination
   */
  async findPublic(
    pagination: PaginationOptions,
    options: FindOptions = {}
  ): Promise<PaginationResult<Playlist>> {
    try {
      const where = {
        ...(options.where || {}),
        isPublic: true,
      };
      
      return await this.findAllPaginated(pagination, {
        ...options,
        where,
        include: options.include || this.getCommonIncludes(),
      });
    } catch (error) {
      logger.error('Error finding public playlists:', error);
      throw new DatabaseError('Failed to find public playlists', error as Error);
    }
  }
  
  /**
   * Find editorial playlists with pagination
   */
  async findEditorial(
    pagination: PaginationOptions,
    options: FindOptions = {}
  ): Promise<PaginationResult<Playlist>> {
    try {
      const where = {
        ...(options.where || {}),
        isEditorial: true,
        isPublic: true,
      };
      
      return await this.findAllPaginated(pagination, {
        ...options,
        where,
        include: options.include || this.getCommonIncludes(),
      });
    } catch (error) {
      logger.error('Error finding editorial playlists:', error);
      throw new DatabaseError('Failed to find editorial playlists', error as Error);
    }
  }
  
  /**
   * Search playlists by title with pagination
   */
  async search(
    searchTerm: string,
    pagination: PaginationOptions,
    options: FindOptions = {}
  ): Promise<PaginationResult<Playlist>> {
    try {
      const where = {
        ...(options.where || {}),
        title: { [Op.like]: `%${searchTerm}%` },
        // Only show public playlists in search results
        isPublic: true,
      };
      
      return await this.findAllPaginated(pagination, {
        ...options,
        where,
        include: options.include || this.getCommonIncludes(),
      });
    } catch (error) {
      logger.error(`Error searching playlists with term "${searchTerm}":`, error);
      throw new DatabaseError('Failed to search playlists', error as Error);
    }
  }
  
  /**
   * Get common includes for eager loading relations
   */
  getCommonIncludes(): Includeable[] {
    return [
      {
        model: User,
        attributes: ['id', 'fullName', 'profileImage'],
        required: false,
      },
      {
        model: Admin,
        attributes: ['id', 'adminLevel'],
        required: false,
      },
      {
        model: PlaylistAudio,
        attributes: ['id', 'orderPosition', 'addedAt'],
        include: [
          {
            model: Audio,
            attributes: ['id', 'title', 'coverImage', 'duration', 'uploadDate'],
          },
        ],
        separate: true,
      },
    ];
  }
}

export default PlaylistRepository;