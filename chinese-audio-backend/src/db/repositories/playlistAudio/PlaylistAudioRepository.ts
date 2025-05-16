// src/db/repositories/playlistAudio/PlaylistAudioRepository.ts
import { FindOptions, WhereOptions, Op, literal } from 'sequelize';
import { IPlaylistAudioRepository } from './IPlaylistAudioRepository';
import { BaseRepository } from '../base/BaseRepository';
import { PlaylistAudio } from '../../models/playlistAudio.model';
import { Audio } from '../../models/audio.model';
import { DatabaseError } from '../../../utils/errors';
import logger from '../../../utils/logger';

/**
 * PlaylistAudio repository implementation
 */
export class PlaylistAudioRepository extends BaseRepository<PlaylistAudio> implements IPlaylistAudioRepository {
  constructor() {
    super(PlaylistAudio);
  }

  /**
   * Find PlaylistAudio records by playlist ID
   */
  async findByPlaylistId(playlistId: number, options: FindOptions = {}): Promise<PlaylistAudio[]> {
    try {
      return await this.model.findAll({
        ...options,
        where: {
          ...(options.where || {}),
          playlistId,
        },
        order: [['orderPosition', 'ASC']],
        include: options.include || [
          {
            model: Audio,
            attributes: ['id', 'title', 'coverImage', 'duration', 'uploadDate', 'artistId', 'isPremium'],
          },
        ],
      });
    } catch (error) {
      logger.error(`Error finding PlaylistAudio by playlist ID ${playlistId}:`, error);
      throw new DatabaseError(`Failed to find playlist audios`, error as Error);
    }
  }
  
  /**
   * Find PlaylistAudio record by playlist ID and audio ID
   */
  async findByPlaylistIdAndAudioId(
    playlistId: number,
    audioId: number,
    options: FindOptions = {}
  ): Promise<PlaylistAudio | null> {
    try {
      return await this.model.findOne({
        ...options,
        where: {
          ...(options.where || {}),
          playlistId,
          audioId,
        },
      });
    } catch (error) {
      logger.error(`Error finding PlaylistAudio by playlist ID ${playlistId} and audio ID ${audioId}:`, error);
      throw new DatabaseError(`Failed to find playlist audio`, error as Error);
    }
  }
  
  /**
   * Get the maximum order position in a playlist
   */
  async getMaxPosition(playlistId: number): Promise<number> {
    try {
      const result = await this.model.findOne({
        where: { playlistId },
        attributes: [[literal('MAX(order_position)'), 'maxPosition']],
        raw: true,
      }) as any;
      
      return result?.maxPosition || 0;
    } catch (error) {
      logger.error(`Error getting max position for playlist ID ${playlistId}:`, error);
      throw new DatabaseError(`Failed to get max position`, error as Error);
    }
  }
  
  /**
   * Shift positions of playlist audios to make room for a new entry
   */
  async shiftPositions(playlistId: number, position: number): Promise<number> {
    try {
      const [affectedRows] = await this.model.update(
        { orderPosition: literal('order_position + 1') },
        {
          where: {
            playlistId,
            orderPosition: { [Op.gte]: position },
          },
        }
      );
      
      return affectedRows;
    } catch (error) {
      logger.error(`Error shifting positions for playlist ID ${playlistId} at position ${position}:`, error);
      throw new DatabaseError(`Failed to shift positions`, error as Error);
    }
  }
  
  /**
   * Shift positions of playlist audios within a range
   */
  async shiftPositionsRange(
    playlistId: number,
    startPosition: number,
    endPosition: number,
    shiftAmount: number
  ): Promise<number> {
    try {
      const [affectedRows] = await this.model.update(
        { orderPosition: literal(`order_position + ${shiftAmount}`) },
        {
          where: {
            playlistId,
            orderPosition: { [Op.between]: [startPosition, endPosition] },
          },
        }
      );
      
      return affectedRows;
    } catch (error) {
      logger.error(`Error shifting positions range for playlist ID ${playlistId}:`, error);
      throw new DatabaseError(`Failed to shift positions range`, error as Error);
    }
  }
  
  /**
   * Normalize positions after removal (ensuring sequential ordering)
   */
  async normalizePositions(playlistId: number): Promise<number> {
    try {
      // This is a more complex operation that requires raw SQL
      // For a proper implementation, a stored procedure or multiple steps would be better
      // This is a simplified version that assumes MySQL
      const sequelize = this.model.sequelize;
      
      if (!sequelize) {
        throw new Error('Sequelize instance not available');
      }
      
      // Get all playlist audios ordered by position
      const playlistAudios = await this.model.findAll({
        where: { playlistId },
        order: [['orderPosition', 'ASC']],
        attributes: ['id', 'orderPosition'],
      });
      
      // Update positions to ensure sequential ordering
      let updateCount = 0;
      
      for (let i = 0; i < playlistAudios.length; i++) {
        const playlistAudio = playlistAudios[i];
        
        if (playlistAudio.orderPosition !== i + 1) {
          await playlistAudio.update({ orderPosition: i + 1 });
          updateCount++;
        }
      }
      
      return updateCount;
    } catch (error) {
      logger.error(`Error normalizing positions for playlist ID ${playlistId}:`, error);
      throw new DatabaseError(`Failed to normalize positions`, error as Error);
    }
  }
  
  /**
   * Delete all PlaylistAudio entries for a specific playlist
   */
  async deleteByPlaylistId(playlistId: number): Promise<number> {
    try {
      return await this.model.destroy({
        where: { playlistId },
      });
    } catch (error) {
      logger.error(`Error deleting playlist audios for playlist ID ${playlistId}:`, error);
      throw new DatabaseError(`Failed to delete playlist audios`, error as Error);
    }
  }
}

export default PlaylistAudioRepository;