// backend/src/db/repositories/artist/ArtistRepository.ts
import { FindOptions, WhereOptions, Op, Includeable, literal } from 'sequelize';
import { IArtistRepository } from './IArtistRepository';
import { BaseRepository } from '../base/BaseRepository';
import { Artist } from '../../models/artist.model';
import { User } from '../../models/user.model';
import { Audio } from '../../models/audio.model';
import { Follow } from '../../models/follow.model';
import { PaginationOptions, PaginationResult } from '../../../types/pagination';
import { DatabaseError } from '../../../utils/errors';
import logger from '../../../utils/logger';

/**
 * Artist repository implementation
 */
export class ArtistRepository extends BaseRepository<Artist> implements IArtistRepository {
  constructor() {
    super(Artist);
  }

  /**
   * Find artist by user ID
   */
  async findByUserId(userId: number, options: FindOptions = {}): Promise<Artist | null> {
    try {
      return await this.model.findOne({
        ...options,
        where: {
          ...(options.where || {}),
          userId,
        },
      });
    } catch (error) {
      logger.error(`Error finding artist by user ID ${userId}:`, error);
      throw new DatabaseError(`Failed to find artist by user ID`, error as Error);
    }
  }

  /**
   * Find artist with user information
   */
  async findWithUser(artistId: number): Promise<Artist | null> {
    try {
      return await this.model.findByPk(artistId, {
        include: [
          {
            model: User,
            attributes: ['id', 'email', 'fullName', 'profileImage', 'userType', 'isActive', 'createdAt'],
          },
        ],
      });
    } catch (error) {
      logger.error(`Error finding artist with user for ID ${artistId}:`, error);
      throw new DatabaseError(`Failed to find artist with user`, error as Error);
    }
  }

  /**
   * Find all verified artists with pagination
   */
  async findAllVerified(
    pagination: PaginationOptions,
    options: FindOptions = {}
  ): Promise<PaginationResult<Artist>> {
    try {
      const where = {
        ...(options.where || {}),
        isVerified: true,
      };
      
      return await this.findAllPaginated(pagination, {
        ...options,
        where,
        include: options.include || this.getCommonIncludes(),
      });
    } catch (error) {
      logger.error('Error finding all verified artists:', error);
      throw new DatabaseError('Failed to find all verified artists', error as Error);
    }
  }

  /**
   * Find all artists pending verification with pagination
   */
  async findAllPendingVerification(
    pagination: PaginationOptions,
    options: FindOptions = {}
  ): Promise<PaginationResult<Artist>> {
    try {
      const where = {
        ...(options.where || {}),
        isVerified: false,
      };
      
      return await this.findAllPaginated(pagination, {
        ...options,
        where,
        include: options.include || this.getCommonIncludes(),
      });
    } catch (error) {
      logger.error('Error finding all pending verification artists:', error);
      throw new DatabaseError('Failed to find all pending verification artists', error as Error);
    }
  }

  /**
   * Search artists by name or bio with pagination
   */
  async search(
    searchTerm: string,
    pagination: PaginationOptions,
    options: FindOptions = {}
  ): Promise<PaginationResult<Artist>> {
    try {
      return await this.findAllPaginated(pagination, {
        ...options,
        include: [
          {
            model: User,
            attributes: ['id', 'email', 'fullName', 'profileImage'],
            where: {
              fullName: { [Op.like]: `%${searchTerm}%` },
            },
          },
          ...this.getCommonIncludes().filter(
            (include) =>
              typeof include === 'object' &&
              include !== null &&
              'model' in include &&
              (include as { model?: unknown }).model !== User
          ),
        ],
      });
    } catch (error) {
      logger.error(`Error searching artists with term "${searchTerm}":`, error);
      throw new DatabaseError('Failed to search artists', error as Error);
    }
  }

  /**
   * Get popular artists based on followers count with pagination
   */
  async getPopularArtists(
    pagination: PaginationOptions,
    options: FindOptions = {}
  ): Promise<PaginationResult<Artist>> {
    try {
      // This requires a more complex query to count followers
      return await this.findAllPaginated(pagination, {
        ...options,
        include: [
          ...this.getCommonIncludes(),
          {
            model: Follow,
            as: 'followers',
            attributes: [],
          },
        ],
        attributes: {
          include: [
            [literal('(SELECT COUNT(*) FROM follows WHERE follows.artist_id = Artist.id)'), 'followersCount']
          ]
        },
        order: [[literal('followersCount'), 'DESC']],
        where: {
          ...(options.where || {}),
          isVerified: true,
        },
      });
    } catch (error) {
      logger.error('Error getting popular artists:', error);
      throw new DatabaseError('Failed to get popular artists', error as Error);
    }
  }

  /**
   * Get active artists (with recent audio uploads) with pagination
   */
  async getActiveArtists(
    pagination: PaginationOptions,
    options: FindOptions = {}
  ): Promise<PaginationResult<Artist>> {
    try {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      
      return await this.findAllPaginated(pagination, {
        ...options,
        include: [
          ...this.getCommonIncludes(),
          {
            model: Audio,
            attributes: [],
            where: {
              uploadDate: { [Op.gte]: oneMonthAgo },
            },
            required: true,
          },
        ],
        where: {
          ...(options.where || {}),
          isVerified: true,
        },
        group: ['Artist.id'],
      });
    } catch (error) {
      logger.error('Error getting active artists:', error);
      throw new DatabaseError('Failed to get active artists', error as Error);
    }
  }

  /**
   * Count total verified artists
   */
  async countVerified(): Promise<number> {
    try {
      return await this.model.count({
        where: { isVerified: true },
      });
    } catch (error) {
      logger.error('Error counting verified artists:', error);
      throw new DatabaseError('Failed to count verified artists', error as Error);
    }
  }

  /**
   * Get common includes for eager loading relations
   */
  getCommonIncludes(): Includeable[] {
    return [
      {
        model: User,
        attributes: ['id', 'email', 'fullName', 'profileImage', 'userType', 'isActive', 'createdAt'],
      },
      {
        model: Audio,
        attributes: ['id', 'title', 'coverImage', 'duration', 'uploadDate'],
        limit: 5,
        separate: true,
      },
    ];
  }
}

export default ArtistRepository;