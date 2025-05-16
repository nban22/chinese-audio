
// src/services/playlist/PlaylistService.ts
import { IPlaylistService, PlaylistCreateData, PlaylistUpdateData } from './IPlaylistService';
import { PaginationOptions, PaginationResult } from '../../types/pagination';
import { NotFoundError, ValidationError, ForbiddenError } from '../../utils/errors';
import logger from '../../utils/logger';

export class PlaylistService implements IPlaylistService {
  constructor(
    private readonly playlistRepository: any,
    private readonly playlistAudioRepository: any,
    private readonly audioRepository: any
  ) {}

  /**
   * Get all playlists with pagination and filters
   */
  public async getAllPlaylists(options: PaginationOptions, filters?: any): Promise<PaginationResult<any>> {
    try {
      return await this.playlistRepository.findAll(options, filters);
    } catch (error) {
      logger.error('Error in getAllPlaylists service:', error);
      throw error;
    }
  }

  /**
   * Get playlist by ID
   */
  public async getPlaylistById(playlistId: number): Promise<any> {
    try {
      const playlist = await this.playlistRepository.findById(playlistId);
      
      if (!playlist) {
        return null;
      }
      
      // Get playlist audios
      const playlistAudios = await this.playlistAudioRepository.findByPlaylistId(playlistId);
      
      // Return playlist with audios
      return {
        ...playlist,
        audios: playlistAudios,
      };
    } catch (error) {
      logger.error(`Error in getPlaylistById service for ID ${playlistId}:`, error);
      throw error;
    }
  }

  /**
   * Get playlists by user ID
   */
  public async getPlaylistsByUserId(userId: number, options: PaginationOptions, filters?: any): Promise<PaginationResult<any>> {
    try {
      return await this.playlistRepository.findByUserId(userId, options, filters);
    } catch (error) {
      logger.error(`Error in getPlaylistsByUserId service for user ID ${userId}:`, error);
      throw error;
    }
  }

  /**
   * Create playlist
   */
  public async createPlaylist(playlistData: PlaylistCreateData): Promise<any> {
    try {
      // Create playlist
      const playlist = await this.playlistRepository.create(playlistData);
      
      return playlist;
    } catch (error) {
      logger.error('Error in createPlaylist service:', error);
      throw error;
    }
  }

  /**
   * Update playlist
   */
  public async updatePlaylist(playlistId: number, updateData: PlaylistUpdateData): Promise<any> {
    try {
      // Check if playlist exists
      const playlist = await this.playlistRepository.findById(playlistId);
      
      if (!playlist) {
        throw new NotFoundError('Playlist not found');
      }
      
      // Update playlist
      const updatedPlaylist = await this.playlistRepository.update(playlistId, updateData);
      
      return updatedPlaylist;
    } catch (error) {
      logger.error(`Error in updatePlaylist service for ID ${playlistId}:`, error);
      throw error;
    }
  }

  /**
   * Delete playlist
   */
  public async deletePlaylist(playlistId: number): Promise<boolean> {
    try {
      // Check if playlist exists
      const playlist = await this.playlistRepository.findById(playlistId);
      
      if (!playlist) {
        throw new NotFoundError('Playlist not found');
      }
      
      // Delete playlist audios first
      await this.playlistAudioRepository.deleteByPlaylistId(playlistId);
      
      // Delete playlist
      await this.playlistRepository.delete(playlistId);
      
      return true;
    } catch (error) {
      logger.error(`Error in deletePlaylist service for ID ${playlistId}:`, error);
      throw error;
    }
  }

  /**
   * Add audio to playlist
   */
  public async addAudioToPlaylist(playlistId: number, audioId: number, position?: number): Promise<any> {
    try {
      // Check if playlist exists
      const playlist = await this.playlistRepository.findById(playlistId);
      
      if (!playlist) {
        throw new NotFoundError('Playlist not found');
      }
      
      // Check if audio exists
      const audio = await this.audioRepository.findById(audioId);
      
      if (!audio) {
        throw new NotFoundError('Audio not found');
      }
      
      // Check if audio already exists in playlist
      const existingPlaylistAudio = await this.playlistAudioRepository.findByPlaylistIdAndAudioId(playlistId, audioId);
      
      if (existingPlaylistAudio) {
        throw new ValidationError({ audioId: 'Audio already exists in this playlist' });
      }
      
      // Determine position
      let pos = position;
      
      if (pos === undefined) {
        // Get the highest position in the playlist
        const maxPosition = await this.playlistAudioRepository.getMaxPosition(playlistId);
        pos = maxPosition + 1;
      } else {
        // Validate position
        if (pos < 0) {
          throw new ValidationError({ position: 'Position must be a non-negative number' });
        }
        
        // If inserting at a specific position, shift existing audios
        await this.playlistAudioRepository.shiftPositions(playlistId, pos);
      }
      
      // Create playlist audio
      const playlistAudio = await this.playlistAudioRepository.create({
        playlistId,
        audioId,
        position: pos,
      });
      
      return playlistAudio;
    } catch (error) {
      logger.error(`Error in addAudioToPlaylist service for playlist ID ${playlistId} and audio ID ${audioId}:`, error);
      throw error;
    }
  }

  /**
   * Remove audio from playlist
   */
  public async removeAudioFromPlaylist(playlistId: number, audioId: number): Promise<boolean> {
    try {
      // Check if playlist exists
      const playlist = await this.playlistRepository.findById(playlistId);
      
      if (!playlist) {
        throw new NotFoundError('Playlist not found');
      }
      
      // Check if audio exists in playlist
      const playlistAudio = await this.playlistAudioRepository.findByPlaylistIdAndAudioId(playlistId, audioId);
      
      if (!playlistAudio) {
        throw new NotFoundError('Audio not found in this playlist');
      }
      
      // Delete playlist audio
      await this.playlistAudioRepository.delete(playlistAudio.id);
      
      // Reorder remaining audios
      await this.playlistAudioRepository.normalizePositions(playlistId);
      
      return true;
    } catch (error) {
      logger.error(`Error in removeAudioFromPlaylist service for playlist ID ${playlistId} and audio ID ${audioId}:`, error);
      throw error;
    }
  }

  /**
   * Reorder audio in playlist
   */
  public async reorderPlaylistAudio(playlistId: number, audioId: number, newPosition: number): Promise<boolean> {
    try {
      // Check if playlist exists
      const playlist = await this.playlistRepository.findById(playlistId);
      
      if (!playlist) {
        throw new NotFoundError('Playlist not found');
      }
      
      // Check if audio exists in playlist
      const playlistAudio = await this.playlistAudioRepository.findByPlaylistIdAndAudioId(playlistId, audioId);
      
      if (!playlistAudio) {
        throw new NotFoundError('Audio not found in this playlist');
      }
      
      // Validate position
      if (newPosition < 0) {
        throw new ValidationError({ position: 'Position must be a non-negative number' });
      }
      
      // Get current position
      const currentPosition = playlistAudio.position;
      
      // If position is the same, do nothing
      if (currentPosition === newPosition) {
        return true;
      }
      
      // Shift other audios
      if (currentPosition < newPosition) {
        // Moving down, shift audios between current and new position up
        await this.playlistAudioRepository.shiftPositionsRange(playlistId, currentPosition + 1, newPosition, -1);
      } else {
        // Moving up, shift audios between new and current position down
        await this.playlistAudioRepository.shiftPositionsRange(playlistId, newPosition, currentPosition - 1, 1);
      }
      
      // Update the playlist audio
      await this.playlistAudioRepository.update(playlistAudio.id, { position: newPosition });
      
      return true;
    } catch (error) {
      logger.error(`Error in reorderPlaylistAudio service for playlist ID ${playlistId} and audio ID ${audioId}:`, error);
      throw error;
    }
  }
}

export default PlaylistService;
