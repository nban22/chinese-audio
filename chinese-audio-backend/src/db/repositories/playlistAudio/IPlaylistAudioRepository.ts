// src/db/repositories/playlistAudio/IPlaylistAudioRepository.ts
import { FindOptions, WhereOptions } from 'sequelize';
import { IBaseRepository } from '../base/IBaseRepository';
import { PlaylistAudio } from '../../models/playlistAudio.model';

/**
 * PlaylistAudio repository interface that extends base repository
 */
export interface IPlaylistAudioRepository extends IBaseRepository<PlaylistAudio> {
  /**
   * Find PlaylistAudio records by playlist ID
   * @param playlistId Playlist ID
   * @param options Additional Sequelize find options
   * @returns Array of playlist audio entries
   */
  findByPlaylistId(playlistId: number, options?: FindOptions): Promise<PlaylistAudio[]>;
  
  /**
   * Find PlaylistAudio record by playlist ID and audio ID
   * @param playlistId Playlist ID
   * @param audioId Audio ID
   * @param options Additional Sequelize find options
   * @returns Found playlist audio entry or null
   */
  findByPlaylistIdAndAudioId(playlistId: number, audioId: number, options?: FindOptions): Promise<PlaylistAudio | null>;
  
  /**
   * Get the maximum order position in a playlist
   * @param playlistId Playlist ID
   * @returns Maximum position value or 0 if playlist is empty
   */
  getMaxPosition(playlistId: number): Promise<number>;
  
  /**
   * Shift positions of playlist audios to make room for a new entry
   * @param playlistId Playlist ID
   * @param position Position from which to shift
   * @returns Number of affected rows
   */
  shiftPositions(playlistId: number, position: number): Promise<number>;
  
  /**
   * Shift positions of playlist audios within a range
   * @param playlistId Playlist ID
   * @param startPosition Start of position range (inclusive)
   * @param endPosition End of position range (inclusive)
   * @param shiftAmount Amount to shift positions by (positive or negative)
   * @returns Number of affected rows
   */
  shiftPositionsRange(
    playlistId: number,
    startPosition: number,
    endPosition: number,
    shiftAmount: number
  ): Promise<number>;
  
  /**
   * Normalize positions after removal (ensuring sequential ordering)
   * @param playlistId Playlist ID
   * @returns Number of affected rows
   */
  normalizePositions(playlistId: number): Promise<number>;
  
  /**
   * Delete all PlaylistAudio entries for a specific playlist
   * @param playlistId Playlist ID
   * @returns Number of deleted rows
   */
  deleteByPlaylistId(playlistId: number): Promise<number>;
}

export default IPlaylistAudioRepository;
