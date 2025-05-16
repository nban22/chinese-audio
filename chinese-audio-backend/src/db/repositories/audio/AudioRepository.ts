// backend/src/db/repositories/audio/AudioRepository.ts
import { FindOptions, WhereOptions, Op, Includeable, literal } from 'sequelize';
import { IAudioRepository } from './IAudioRepository';
import { BaseRepository } from '../base/BaseRepository';
import { Audio } from '../../models/audio.model';
import { Artist } from '../../models/artist.model';
import { Category } from '../../models/category.model';
import { AudioTranscript } from '../../models/audioTranscript.model';
import { Tag } from '../../models/tag.model';
import { AudioTag } from '../../models/audioTag.model';
import { Rating } from '../../models/rating.model';
import { Like } from '../../models/like.model';
import { User } from '../../models/user.model';
import { PaginationOptions, PaginationResult } from '../../../types/pagination';
import { DatabaseError } from '../../../utils/errors';
import logger from '../../../utils/logger';

/**
 * AudioRepository implementation
 */
export class AudioRepository extends BaseRepository<Audio> implements IAudioRepository {
  constructor() {
    super(Audio);
  }

  /**
   * Find audios by artist ID with pagination
   */
  async findByArtistId(
    artistId: number,
    pagination: PaginationOptions,
    options: FindOptions = {}
  ): Promise<PaginationResult<Audio>> {
    try {
      const where = { 
        ...options.where,
        artistId
      };
      
      return this.findAllPaginated(pagination, {
        ...options,
        where,
        include: options.include || this.getCommonIncludes()
      });
    } catch (error) {
      logger.error(`Error finding audios by artist ID ${artistId}:`, error);
      throw new DatabaseError(`Failed to find audios by artist ID`, error as Error);
    }
  }
  
  /**
   * Find audios by category ID with pagination
   */
  async findByCategoryId(
    categoryId: number,
    pagination: PaginationOptions,
    options: FindOptions = {}
  ): Promise<PaginationResult<Audio>> {
    try {
      const where = { 
        ...options.where,
        categoryId
      };
      
      return this.findAllPaginated(pagination, {
        ...options,
        where,
        include: options.include || this.getCommonIncludes()
      });
    } catch (error) {
      logger.error(`Error finding audios by category ID ${categoryId}:`, error);
      throw new DatabaseError(`Failed to find audios by category ID`, error as Error);
    }
  }
  
  /**
   * Find audios by tags with pagination
   */
  async findByTags(
    tagIds: number[],
    pagination: PaginationOptions,
    options: FindOptions = {}
  ): Promise<PaginationResult<Audio>> {
    try {
      return this.findAllPaginated(pagination, {
        ...options,
        include: [
          ...(options.include as Includeable[] || []),
          {
            model: Tag,
            through: { attributes: [] },
            where: {
              id: {
                [Op.in]: tagIds,
              },
            },
          },
          ...this.getCommonIncludes().filter(include => 
            typeof include === 'object' &&
            include !== null &&
            'model' in include &&
            (include as { model?: unknown }).model !== Tag
          ),
        ],
      });
    } catch (error) {
      logger.error(`Error finding audios by tags ${tagIds}:`, error);
      throw new DatabaseError(`Failed to find audios by tags`, error as Error);
    }
  }
  
  /**
   * Search audios by title or description with pagination
   */
  async search(
    searchTerm: string,
    pagination: PaginationOptions,
    options: FindOptions = {}
  ): Promise<PaginationResult<Audio>> {
    try {
      const where = {
        ...options.where,
        [Op.or]: [
          { title: { [Op.like]: `%${searchTerm}%` } },
          { description: { [Op.like]: `%${searchTerm}%` } },
        ],
      };
      
      return this.findAllPaginated(pagination, {
        ...options,
        where,
        include: options.include || this.getCommonIncludes()
      });
    } catch (error) {
      logger.error(`Error searching audios with term "${searchTerm}":`, error);
      throw new DatabaseError(`Failed to search audios`, error as Error);
    }
  }
  
  /**
   * Get featured audios with pagination
   */
  async getFeaturedAudios(
    pagination: PaginationOptions,
    options: FindOptions = {}
  ): Promise<PaginationResult<Audio>> {
    try {
      // Implementation depends on how "featured" is determined
      // This is just an example - you might have a "featured" flag or other criteria
      const where = {
        ...options.where,
        isPremium: false,
        isApproved: true,
      };
      
      return this.findAllPaginated(pagination, {
        ...options,
        where,
        include: options.include || this.getCommonIncludes(),
        order: [['uploadDate', 'DESC']]
      });
    } catch (error) {
      logger.error('Error getting featured audios:', error);
      throw new DatabaseError('Failed to get featured audios', error as Error);
    }
  }
  
  /**
   * Get popular audios based on likes/ratings with pagination
   */
  async getPopularAudios(
    pagination: PaginationOptions,
    options: FindOptions = {}
  ): Promise<PaginationResult<Audio>> {
    try {
      // This requires a more complex query to count likes or calculate ratings
      return this.findAllPaginated(pagination, {
        ...options,
        include: [
          ...this.getCommonIncludes(),
          {
            model: Like,
            attributes: []
          },
        ],
        attributes: {
          include: [
            [literal('(SELECT COUNT(*) FROM likes WHERE likes.audio_id = Audio.id)'), 'likesCount']
          ]
        },
        order: [[literal('likesCount'), 'DESC']],
        where: {
          ...options.where,
          isApproved: true
        },
      });
    } catch (error) {
      logger.error('Error getting popular audios:', error);
      throw new DatabaseError('Failed to get popular audios', error as Error);
    }
  }
  
  /**
   * Get recent audios with pagination
   */
  async getRecentAudios(
    pagination: PaginationOptions,
    options: FindOptions = {}
  ): Promise<PaginationResult<Audio>> {
    try {
      const where = {
        ...options.where,
        isApproved: true,
      };
      
      return this.findAllPaginated(pagination, {
        ...options,
        where,
        include: options.include || this.getCommonIncludes(),
        order: [['uploadDate', 'DESC']]
      });
    } catch (error) {
      logger.error('Error getting recent audios:', error);
      throw new DatabaseError('Failed to get recent audios', error as Error);
    }
  }
  
  /**
   * Get premium audios with pagination
   */
  async getPremiumAudios(
    pagination: PaginationOptions,
    options: FindOptions = {}
  ): Promise<PaginationResult<Audio>> {
    try {
      const where = {
        ...options.where,
        isPremium: true,
        isApproved: true,
      };
      
      return this.findAllPaginated(pagination, {
        ...options,
        where,
        include: options.include || this.getCommonIncludes()
      });
    } catch (error) {
      logger.error('Error getting premium audios:', error);
      throw new DatabaseError('Failed to get premium audios', error as Error);
    }
  }
  
  /**
   * Find audio by ID with full details (including transcripts, ratings, etc.)
   */
  async findByIdWithDetails(id: number): Promise<Audio | null> {
    try {
      return await this.model.findByPk(id, {
        include: [
          {
            model: Artist,
            attributes: ['id', 'bio', 'isVerified'],
            include: [
              {
                model: User,
                attributes: ['id', 'fullName', 'profileImage'],
              }
            ]
          },
          {
            model: Category,
            attributes: ['id', 'name', 'description']
          },
          {
            model: AudioTranscript,
            attributes: ['id', 'content', 'language']
          },
          {
            model: Tag,
            attributes: ['id', 'name'],
            through: { attributes: [] }
          },
          {
            model: Rating,
            attributes: ['id', 'ratingValue', 'comment', 'ratedAt'],
            include: [
              {
                model: User,
                attributes: ['id', 'fullName', 'profileImage']
              }
            ],
            limit: 10,
            order: [['ratedAt', 'DESC']]
          },
          {
            model: Like,
            attributes: ['id', 'userId', 'likedAt']
          }
        ]
      });
    } catch (error) {
      logger.error('Error finding audio with details:', error);
      throw new DatabaseError('Failed to find audio with details', error as Error);
    }
  }
  
  /**
   * Get common includes for audio queries
   */
  getCommonIncludes(): Includeable[] {
    return [
      {
        model: Artist,
        attributes: ['id', 'bio', 'isVerified'],
        include: [
          {
            model: User,
            attributes: ['id', 'fullName', 'profileImage']
          }
        ]
      },
      {
        model: Category,
        attributes: ['id', 'name']
      },
      {
        model: Tag,
        attributes: ['id', 'name'],
        through: { attributes: [] }
      }
    ];
  }
}

export default AudioRepository;