// backend/src/api/controllers/audio/AudioController.ts (continued)
import { Request, Response } from 'express';
import { IAudioService } from '../../../services/audio';
import ApiResponse from '../../../utils/response';
import { PaginationOptions } from '../../../types/pagination';
import { NotFoundError, ValidationError, ForbiddenError } from '../../../utils/errors';
import logger from '../../../utils/logger';
import config from '../../../config';

export class AudioController {
  constructor(private readonly audioService: IAudioService) {}

  // Previous methods are already defined...

  /**
   * Update audio
   * PUT /api/audios/:id
   */
  public async updateAudio(req: Request, res: Response): Promise<Response> {
    try {
      const audioId = parseInt(req.params.id);
      
      if (isNaN(audioId)) {
        return ApiResponse.fail(res, { id: 'Invalid audio ID' }, 'Validation failed');
      }
      
      // Get existing audio to check ownership
      const existingAudio = await this.audioService.getAudioById(audioId);
      
      if (!existingAudio) {
        return ApiResponse.notFound(res, 'Audio not found');
      }
      
      // Check if user is the owner or an admin
      const isUserOwner = req.user?.artistId === existingAudio.artistId;
      const isAdmin = req.user?.role === 'admin';
      
      if (!isUserOwner && !isAdmin) {
        return ApiResponse.forbidden(res, 'You can only update your own audio files');
      }
      
      // Parse tags if provided
      let tags: number[] | undefined;
      if (req.body.tags) {
        if (Array.isArray(req.body.tags)) {
          tags = req.body.tags.map((tag: any) => parseInt(tag));
        } else if (typeof req.body.tags === 'string') {
          tags = req.body.tags.split(',').map((tag: string) => parseInt(tag.trim()));
        }
      }
      
      // Prepare update data
      const updateData = {
        ...req.body,
        tags,
        // Parse numeric values if provided
        duration: req.body.duration ? parseInt(req.body.duration) : undefined,
        categoryId: req.body.categoryId ? parseInt(req.body.categoryId) : undefined,
      };
      
      // Remove undefined values
      Object.keys(updateData).forEach(key => 
        updateData[key] === undefined && delete updateData[key]
      );
      
      const updatedAudio = await this.audioService.updateAudio(audioId, updateData);
      
      return ApiResponse.success(res, updatedAudio, 'Audio updated successfully');
    } catch (error) {
      logger.error(`Error in updateAudio controller for ID ${req.params.id}:`, error);
      
      if (error instanceof NotFoundError) {
        return ApiResponse.notFound(res, error.message);
      }
      
      if (error instanceof ValidationError) {
        return ApiResponse.fail(res, error.data, error.message);
      }
      
      if (error instanceof ForbiddenError) {
        return ApiResponse.forbidden(res, error.message);
      }
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to update audio';
      return ApiResponse.error(res, errorMessage);
    }
  }

  /**
   * Delete audio
   * DELETE /api/audios/:id
   */
  public async deleteAudio(req: Request, res: Response): Promise<Response> {
    try {
      const audioId = parseInt(req.params.id);
      
      if (isNaN(audioId)) {
        return ApiResponse.fail(res, { id: 'Invalid audio ID' }, 'Validation failed');
      }
      
      // Get existing audio to check ownership
      const existingAudio = await this.audioService.getAudioById(audioId);
      
      if (!existingAudio) {
        return ApiResponse.notFound(res, 'Audio not found');
      }
      
      // Check if user is the owner or an admin
      const isUserOwner = req.user?.artistId === existingAudio.artistId;
      const isAdmin = req.user?.role === 'admin';
      
      if (!isUserOwner && !isAdmin) {
        return ApiResponse.forbidden(res, 'You can only delete your own audio files');
      }
      
      await this.audioService.deleteAudio(audioId);
      
      return ApiResponse.success(res, null, 'Audio deleted successfully');
    } catch (error) {
      logger.error(`Error in deleteAudio controller for ID ${req.params.id}:`, error);
      
      if (error instanceof NotFoundError) {
        return ApiResponse.notFound(res, error.message);
      }
      
      if (error instanceof ForbiddenError) {
        return ApiResponse.forbidden(res, error.message);
      }
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete audio';
      return ApiResponse.error(res, errorMessage);
    }
  }

  /**
   * Add or update transcript
   * POST /api/audios/:id/transcripts
   */
  public async addTranscript(req: Request, res: Response): Promise<Response> {
    try {
      const audioId = parseInt(req.params.id);
      
      if (isNaN(audioId)) {
        return ApiResponse.fail(res, { id: 'Invalid audio ID' }, 'Validation failed');
      }
      
      // Validate required fields
      if (!req.body.content) {
        return ApiResponse.fail(res, { content: 'Content is required' }, 'Validation failed');
      }
      
      if (!req.body.language) {
        return ApiResponse.fail(res, { language: 'Language is required' }, 'Validation failed');
      }
      
      // Get existing audio to check ownership
      const existingAudio = await this.audioService.getAudioById(audioId);
      
      if (!existingAudio) {
        return ApiResponse.notFound(res, 'Audio not found');
      }
      
      // Check if user is the owner or an admin
      const isUserOwner = req.user?.artistId === existingAudio.artistId;
      const isAdmin = req.user?.role === 'admin';
      
      if (!isUserOwner && !isAdmin) {
        return ApiResponse.forbidden(res, 'You can only add transcripts to your own audio files');
      }
      
      const transcript = await this.audioService.addTranscriptToAudio(
        audioId,
        req.body.content,
        req.body.language
      );
      
      return ApiResponse.success(res, transcript, 'Transcript added successfully');
    } catch (error) {
      logger.error(`Error in addTranscript controller for audio ID ${req.params.id}:`, error);
      
      if (error instanceof NotFoundError) {
        return ApiResponse.notFound(res, error.message);
      }
      
      if (error instanceof ValidationError) {
        return ApiResponse.fail(res, error.data, error.message);
      }
      
      if (error instanceof ForbiddenError) {
        return ApiResponse.forbidden(res, error.message);
      }
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to add transcript';
      return ApiResponse.error(res, errorMessage);
    }
  }

  /**
   * Update transcript
   * PUT /api/transcripts/:id
   */
  public async updateTranscript(req: Request, res: Response): Promise<Response> {
    try {
      const transcriptId = parseInt(req.params.id);
      
      if (isNaN(transcriptId)) {
        return ApiResponse.fail(res, { id: 'Invalid transcript ID' }, 'Validation failed');
      }
      
      // Validate required fields
      if (!req.body.content) {
        return ApiResponse.fail(res, { content: 'Content is required' }, 'Validation failed');
      }
      
      // Authorization check would be here
      // In a real implementation, you would fetch the transcript,
      // get its associated audio, and check if the user is the owner or admin
      
      const transcript = await this.audioService.updateTranscript(
        transcriptId,
        req.body.content
      );
      
      return ApiResponse.success(res, transcript, 'Transcript updated successfully');
    } catch (error) {
      logger.error(`Error in updateTranscript controller for ID ${req.params.id}:`, error);
      
      if (error instanceof NotFoundError) {
        return ApiResponse.notFound(res, error.message);
      }
      
      if (error instanceof ValidationError) {
        return ApiResponse.fail(res, error.data, error.message);
      }
      
      if (error instanceof ForbiddenError) {
        return ApiResponse.forbidden(res, error.message);
      }
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to update transcript';
      return ApiResponse.error(res, errorMessage);
    }
  }

  /**
   * Delete transcript
   * DELETE /api/transcripts/:id
   */
  public async deleteTranscript(req: Request, res: Response): Promise<Response> {
    try {
      const transcriptId = parseInt(req.params.id);
      
      if (isNaN(transcriptId)) {
        return ApiResponse.fail(res, { id: 'Invalid transcript ID' }, 'Validation failed');
      }
      
      // Authorization check would be here
      // In a real implementation, you would fetch the transcript,
      // get its associated audio, and check if the user is the owner or admin
      
      await this.audioService.deleteTranscript(transcriptId);
      
      return ApiResponse.success(res, null, 'Transcript deleted successfully');
    } catch (error) {
      logger.error(`Error in deleteTranscript controller for ID ${req.params.id}:`, error);
      
      if (error instanceof NotFoundError) {
        return ApiResponse.notFound(res, error.message);
      }
      
      if (error instanceof ForbiddenError) {
        return ApiResponse.forbidden(res, error.message);
      }
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete transcript';
      return ApiResponse.error(res, errorMessage);
    }
  }
}

export default AudioController;