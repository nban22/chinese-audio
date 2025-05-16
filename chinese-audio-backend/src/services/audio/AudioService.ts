// backend/src/services/audio/AudioService.ts
import { IAudioService } from './IAudioService';
import { IAudioRepository } from '../../db/repositories/audio/IAudioRepository';
import { IDropboxService } from '../dropbox/IDropboxService';
import { Audio } from '../../db/models/audio.model';
import { AudioTranscript } from '../../db/models/audioTranscript.model';
import { AudioTag } from '../../db/models/audioTag.model';
import { PaginationOptions, PaginationResult } from '../../types/pagination';
import { NotFoundError, ValidationError } from '../../utils/errors';
import logger from '../../utils/logger';
import sequelize from '../../db';

/**
 * Audio service implementation
 */
export class AudioService implements IAudioService {
  constructor(
    private readonly audioRepository: IAudioRepository,
    private readonly dropboxService: IDropboxService
  ) {}

  /**
   * Get all audios with pagination
   */
  async getAllAudio(
    paginationOptions: PaginationOptions,
    filters?: Record<string, any>
  ): Promise<PaginationResult<Audio>> {
    try {
      // Apply filters if provided
      const where: any = { isApproved: true };
      
      if (filters) {
        if (filters.isPremium !== undefined) {
          where.isPremium = filters.isPremium === 'true';
        }
        
        if (filters.qualityLevel) {
          where.qualityLevel = filters.qualityLevel;
        }
        
        if (filters.isDownloadable !== undefined) {
          where.isDownloadable = filters.isDownloadable === 'true';
        }
      }
      
      return await this.audioRepository.findAllPaginated(paginationOptions, {
        where,
        include: this.audioRepository.getCommonIncludes()
      });
    } catch (error) {
      logger.error('Error in getAllAudio service:', error);
      throw error;
    }
  }
  
  /**
   * Get audio by ID
   */
  async getAudioById(id: number): Promise<Audio | null> {
    try {
      const audio = await this.audioRepository.findById(id, {
        include: this.audioRepository.getCommonIncludes()
      });
      
      if (!audio) {
        return null;
      }
      
      // If audio is not approved, only allow the owner or admin to see it
      // This would typically be handled at the controller level with authorization
      if (!audio.isApproved) {
        // For demonstration purposes - this check should be in controller
        logger.warn(`Attempted to access unapproved audio ID ${id}`);
      }
      
      return audio;
    } catch (error) {
      logger.error(`Error in getAudioById service for ID ${id}:`, error);
      throw error;
    }
  }
  
  /**
   * Get audio by ID with full details
   */
  async getAudioWithDetails(id: number): Promise<Audio | null> {
    try {
      const audio = await this.audioRepository.findByIdWithDetails(id);
      
      if (!audio) {
        return null;
      }
      
      // Check if audio is approved (authorization should be in controller)
      if (!audio.isApproved) {
        logger.warn(`Attempted to access unapproved audio details ID ${id}`);
      }
      
      return audio;
    } catch (error) {
      logger.error(`Error in getAudioWithDetails service for ID ${id}:`, error);
      throw error;
    }
  }
  
  /**
   * Get audios by artist ID
   */
  async getAudiosByArtistId(
    artistId: number,
    paginationOptions: PaginationOptions
  ): Promise<PaginationResult<Audio>> {
    try {
      return await this.audioRepository.findByArtistId(
        artistId,
        paginationOptions,
        { where: { isApproved: true } }
      );
    } catch (error) {
      logger.error(`Error in getAudiosByArtistId service for artist ID ${artistId}:`, error);
      throw error;
    }
  }
  
  /**
   * Get audios by category ID
   */
  async getAudiosByCategoryId(
    categoryId: number,
    paginationOptions: PaginationOptions
  ): Promise<PaginationResult<Audio>> {
    try {
      return await this.audioRepository.findByCategoryId(
        categoryId,
        paginationOptions,
        { where: { isApproved: true } }
      );
    } catch (error) {
      logger.error(`Error in getAudiosByCategoryId service for category ID ${categoryId}:`, error);
      throw error;
    }
  }
  
  /**
   * Search audios
   */
  async searchAudios(
    searchTerm: string,
    paginationOptions: PaginationOptions
  ): Promise<PaginationResult<Audio>> {
    try {
      return await this.audioRepository.search(
        searchTerm,
        paginationOptions,
        { where: { isApproved: true } }
      );
    } catch (error) {
      logger.error(`Error in searchAudios service for term "${searchTerm}":`, error);
      throw error;
    }
  }
  
  /**
   * Get featured audios
   */
  async getFeaturedAudios(
    paginationOptions: PaginationOptions
  ): Promise<PaginationResult<Audio>> {
    try {
      return await this.audioRepository.getFeaturedAudios(paginationOptions);
    } catch (error) {
      logger.error('Error in getFeaturedAudios service:', error);
      throw error;
    }
  }
  
  /**
   * Get popular audios
   */
  async getPopularAudios(
    paginationOptions: PaginationOptions
  ): Promise<PaginationResult<Audio>> {
    try {
      return await this.audioRepository.getPopularAudios(paginationOptions);
    } catch (error) {
      logger.error('Error in getPopularAudios service:', error);
      throw error;
    }
  }
  
  /**
   * Get recent audios
   */
  async getRecentAudios(
    paginationOptions: PaginationOptions
  ): Promise<PaginationResult<Audio>> {
    try {
      return await this.audioRepository.getRecentAudios(paginationOptions);
    } catch (error) {
      logger.error('Error in getRecentAudios service:', error);
      throw error;
    }
  }
  
  /**
   * Get premium audios
   */
  async getPremiumAudios(
    paginationOptions: PaginationOptions
  ): Promise<PaginationResult<Audio>> {
    try {
      return await this.audioRepository.getPremiumAudios(paginationOptions);
    } catch (error) {
      logger.error('Error in getPremiumAudios service:', error);
      throw error;
    }
  }
  
  /**
   * Create audio
   */
  async createAudio(audioData: Partial<Audio>): Promise<Audio> {
    const transaction = await sequelize.transaction();
    
    try {
      // Validate required fields
      if (!audioData.title) {
        throw new ValidationError({ title: 'Title is required' });
      }
      
      if (!audioData.artistId) {
        throw new ValidationError({ artistId: 'Artist ID is required' });
      }
      
      if (!audioData.dropboxUrl) {
        throw new ValidationError({ dropboxUrl: 'Dropbox URL is required' });
      }
      
      if (!audioData.duration) {
        throw new ValidationError({ duration: 'Duration is required' });
      }
      
      // Create audio record
      const audio = await this.audioRepository.create(audioData, { transaction });
      
      // Process tags if provided
      if (audioData.tags && Array.isArray(audioData.tags)) {
        await this.addTagsToAudio(audio.id, audioData.tags as any, transaction);
      }
      
      await transaction.commit();
      
      // Return created audio with relations
      return await this.getAudioById(audio.id) as Audio;
    } catch (error) {
      await transaction.rollback();
      logger.error('Error in createAudio service:', error);
      throw error;
    }
  }
  
  /**
   * Update audio
   */
  async updateAudio(id: number, audioData: Partial<Audio>): Promise<Audio | null> {
    const transaction = await sequelize.transaction();
    
    try {
      // Check if audio exists
      const existingAudio = await this.audioRepository.findById(id);
      
      if (!existingAudio) {
        throw new NotFoundError(`Audio with ID ${id} not found`);
      }
      
      // Update audio
      await this.audioRepository.update(id, audioData);
      
      // Process tags if provided
      if (audioData.tags && Array.isArray(audioData.tags)) {
        // Clear existing tags and add new ones
        await AudioTag.destroy({
          where: { audioId: id },
          transaction
        });
        
        await this.addTagsToAudio(id, audioData.tags as any, transaction);
      }
      
      await transaction.commit();
      
      // Return updated audio with relations
      return await this.getAudioById(id);
    } catch (error) {
      await transaction.rollback();
      logger.error(`Error in updateAudio service for ID ${id}:`, error);
      throw error;
    }
  }
  
  /**
   * Delete audio
   */
  async deleteAudio(id: number): Promise<boolean> {
    const transaction = await sequelize.transaction();
    
    try {
      // Check if audio exists
      const existingAudio = await this.audioRepository.findById(id);
      
      if (!existingAudio) {
        throw new NotFoundError(`Audio with ID ${id} not found`);
      }
      
      // Delete from Dropbox if needed
      try {
        // Extract file path from URL
        const filePath = this.extractDropboxPath(existingAudio.dropboxUrl);
        await this.dropboxService.deleteFile(filePath);
        logger.info(`Deleted audio file from Dropbox: ${filePath}`);
      } catch (dropboxError: any) {
        // Log but continue with database deletion
        logger.warn(`Could not delete audio file from Dropbox: ${dropboxError.message}`);
      }
      
      // Delete audio from database
      const deleted = await this.audioRepository.delete(id, { transaction });
      
      await transaction.commit();
      return deleted;
    } catch (error) {
      await transaction.rollback();
      logger.error(`Error in deleteAudio service for ID ${id}:`, error);
      throw error;
    }
  }
  
  /**
   * Add tags to audio
   */
  async addTagsToAudio(audioId: number, tagIds: number[], transaction?: any): Promise<void> {
    try {
      // Create array of objects for bulk create
      const audioTags = tagIds.map(tagId => ({
        audioId,
        tagId
      }));
      
      await AudioTag.bulkCreate(audioTags, { 
        transaction,
        ignoreDuplicates: true // Prevent errors on duplicate entries
      });
    } catch (error) {
      logger.error(`Error in addTagsToAudio service for audio ID ${audioId}:`, error);
      throw error;
    }
  }
  
  /**
   * Remove tags from audio
   */
  async removeTagsFromAudio(audioId: number, tagIds: number[]): Promise<void> {
    try {
      await AudioTag.destroy({
        where: {
          audioId,
          tagId: tagIds
        }
      });
    } catch (error) {
      logger.error(`Error in removeTagsFromAudio service for audio ID ${audioId}:`, error);
      throw error;
    }
  }
  
  /**
   * Add transcript to audio
   */
  async addTranscriptToAudio(
    audioId: number, 
    content: string, 
    language: string
  ): Promise<any> {
    try {
      // Check if audio exists
      const audio = await this.audioRepository.findById(audioId);
      
      if (!audio) {
        throw new NotFoundError(`Audio with ID ${audioId} not found`);
      }
      
      // Check if transcript for this language already exists
      const existingTranscript = await AudioTranscript.findOne({
        where: {
          audioId,
          language
        }
      });
      
      if (existingTranscript) {
        // Update existing transcript
        await existingTranscript.update({ content });
        return existingTranscript;
      } else {
        // Create new transcript
        return await AudioTranscript.create({
          audioId,
          content,
          language
        });
      }
    } catch (error) {
      logger.error(`Error in addTranscriptToAudio service for audio ID ${audioId}:`, error);
      throw error;
    }
  }
  
  /**
   * Update transcript
   */
  async updateTranscript(
    transcriptId: number, 
    content: string
  ): Promise<any> {
    try {
      const transcript = await AudioTranscript.findByPk(transcriptId);
      
      if (!transcript) {
        throw new NotFoundError(`Transcript with ID ${transcriptId} not found`);
      }
      
      await transcript.update({ content });
      return transcript;
    } catch (error) {
      logger.error(`Error in updateTranscript service for ID ${transcriptId}:`, error);
      throw error;
    }
  }
  
  /**
   * Delete transcript
   */
  async deleteTranscript(transcriptId: number): Promise<boolean> {
    try {
      const transcript = await AudioTranscript.findByPk(transcriptId);
      
      if (!transcript) {
        throw new NotFoundError(`Transcript with ID ${transcriptId} not found`);
      }
      
      await transcript.destroy();
      return true;
    } catch (error) {
      logger.error(`Error in deleteTranscript service for ID ${transcriptId}:`, error);
      throw error;
    }
  }
  
  /**
   * Helper: Extract file path from Dropbox URL
   */
  private extractDropboxPath(dropboxUrl: string): string {
    // This is a simplified example - actual implementation depends on your Dropbox URL format
    const urlParts = dropboxUrl.split('/');
    return '/' + urlParts.slice(4).join('/');
  }
}

export default AudioService;