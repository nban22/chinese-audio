// backend/src/services/audio/IAudioService.ts
import { Audio } from '../../db/models/audio.model';
import { PaginationOptions, PaginationResult } from '../../types/pagination';

/**
 * Audio service interface
 */
export interface IAudioService {
  /**
   * Get all audios with pagination
   */
  getAllAudio(
    options: PaginationOptions,
    filters?: Record<string, any>
  ): Promise<PaginationResult<Audio>>;
  
  /**
   * Get audio by ID
   */
  getAudioById(id: number): Promise<Audio | null>;
  
  /**
   * Get audio by ID with full details
   */
  getAudioWithDetails(id: number): Promise<Audio | null>;
  
  /**
   * Get audios by artist ID
   */
  getAudiosByArtistId(
    artistId: number,
    options: PaginationOptions
  ): Promise<PaginationResult<Audio>>;
  
  /**
   * Get audios by category ID
   */
  getAudiosByCategoryId(
    categoryId: number,
    options: PaginationOptions
  ): Promise<PaginationResult<Audio>>;
  
  /**
   * Search audios
   */
  searchAudios(
    searchTerm: string,
    options: PaginationOptions
  ): Promise<PaginationResult<Audio>>;
  
  /**
   * Get featured audios
   */
  getFeaturedAudios(
    options: PaginationOptions
  ): Promise<PaginationResult<Audio>>;
  
  /**
   * Get popular audios
   */
  getPopularAudios(
    options: PaginationOptions
  ): Promise<PaginationResult<Audio>>;
  
  /**
   * Get recent audios
   */
  getRecentAudios(
    options: PaginationOptions
  ): Promise<PaginationResult<Audio>>;
  
  /**
   * Get premium audios
   */
  getPremiumAudios(
    options: PaginationOptions
  ): Promise<PaginationResult<Audio>>;
  
  /**
   * Create audio
   */
  createAudio(audioData: Partial<Audio>): Promise<Audio>;
  
  /**
   * Update audio
   */
  updateAudio(id: number, audioData: Partial<Audio>): Promise<Audio | null>;
  
  /**
   * Delete audio
   */
  deleteAudio(id: number): Promise<boolean>;
  
  /**
   * Add tags to audio
   */
  addTagsToAudio(audioId: number, tagIds: number[], transaction?: any): Promise<void>;
  
  /**
   * Remove tags from audio
   */
  removeTagsFromAudio(audioId: number, tagIds: number[]): Promise<void>;
  
  /**
   * Add transcript to audio
   */
  addTranscriptToAudio(
    audioId: number, 
    content: string, 
    language: string
  ): Promise<any>;
  
  /**
   * Update transcript
   */
  updateTranscript(
    transcriptId: number, 
    content: string
  ): Promise<any>;
  
  /**
   * Delete transcript
   */
  deleteTranscript(transcriptId: number): Promise<boolean>;
}

export default IAudioService;