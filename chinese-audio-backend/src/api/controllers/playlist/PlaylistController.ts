// src/api/controllers/playlist/PlaylistController.ts
import { Request, Response } from 'express';
import { IPlaylistService } from '../../../services/playlist/IPlaylistService';
import ApiResponse from '../../../utils/response';
import { PaginationOptions } from '../../../types/pagination';
import { NotFoundError, ValidationError, ForbiddenError } from '../../../utils/errors';
import logger from '../../../utils/logger';
import config from '../../../config';

/**
 * Controller for handling playlist-related requests
 */
export class PlaylistController {
  constructor(private readonly playlistService: IPlaylistService) {}

  /**
   * Get all playlists with pagination
   * GET /api/playlists
   */
  public async getAllPlaylists(req: Request, res: Response): Promise<Response> {
    try {
      const page = parseInt(req.query.page as string) || config.pagination.defaultPage;
      const limit = parseInt(req.query.limit as string) || config.pagination.defaultLimit;
      const options: PaginationOptions = { page, limit };
      
      // Extract filters from query params
      const filters: Record<string, any> = {};
      
      if (req.query.isPublic !== undefined) {
        filters.isPublic = req.query.isPublic === 'true';
      }
      
      if (req.query.isEditorial !== undefined) {
        filters.isEditorial = req.query.isEditorial === 'true';
      }
      
      // Check if we want user's playlists
      const userId = req.query.userId ? parseInt(req.query.userId as string) : undefined;
      
      // Get playlists
      const result = userId 
        ? await this.playlistService.getPlaylistsByUserId(userId, options, filters)
        : await this.playlistService.getAllPlaylists(options, filters);
      
      return ApiResponse.paginatedSuccess(res, result);
    } catch (error) {
      logger.error('Error in getAllPlaylists controller:', error);
      
      if (error instanceof ValidationError) {
        return ApiResponse.fail(res, error.data, error.message);
      }
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch playlists';
      return ApiResponse.error(res, errorMessage);
    }
  }

  /**
   * Get playlist by ID
   * GET /api/playlists/:id
   */
  public async getPlaylistById(req: Request, res: Response): Promise<Response> {
    try {
      const playlistId = parseInt(req.params.id);
      
      if (isNaN(playlistId)) {
        return ApiResponse.fail(res, { id: 'Invalid playlist ID' }, 'Validation failed');
      }
      
      const playlist = await this.playlistService.getPlaylistById(playlistId);
      
      if (!playlist) {
        return ApiResponse.notFound(res, 'Playlist not found');
      }
      
      // Check if playlist is public or if the user is the owner
      const isUserOwner = req.user?.id === playlist.userId;
      
      if (!playlist.isPublic && !isUserOwner && !playlist.isEditorial) {
        return ApiResponse.forbidden(res, 'You do not have permission to view this playlist');
      }
      
      return ApiResponse.success(res, playlist);
    } catch (error) {
      logger.error(`Error in getPlaylistById controller for ID ${req.params.id}:`, error);
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch playlist';
      return ApiResponse.error(res, errorMessage);
    }
  }

  /**
   * Create new playlist
   * POST /api/playlists
   */
  public async createPlaylist(req: Request, res: Response): Promise<Response> {
    try {
      // Validate required fields
      if (!req.body.title) {
        return ApiResponse.fail(res, { title: 'Title is required' }, 'Validation failed');
      }
      
      // Set user ID from authenticated user
      const userId = req.user?.id;
      
      if (!userId) {
        return ApiResponse.unauthorized(res, 'You must be logged in to create a playlist');
      }
      
      // Set isEditorial to false for regular users
      const isUserAdmin = req.user?.role === 'admin';
      const isEditorial = isUserAdmin ? (req.body.isEditorial || false) : false;
      
      // Prepare playlist data
      const playlistData = {
        ...req.body,
        userId,
        isEditorial,
      };
      
      const createdPlaylist = await this.playlistService.createPlaylist(playlistData);
      
      return ApiResponse.success(res, createdPlaylist, 'Playlist created successfully', 201);
    } catch (error) {
      logger.error('Error in createPlaylist controller:', error);
      
      if (error instanceof ValidationError) {
        return ApiResponse.fail(res, error.data, error.message);
      }
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to create playlist';
      return ApiResponse.error(res, errorMessage);
    }
  }

  /**
   * Update playlist
   * PUT /api/playlists/:id
   */
  public async updatePlaylist(req: Request, res: Response): Promise<Response> {
    try {
      const playlistId = parseInt(req.params.id);
      
      if (isNaN(playlistId)) {
        return ApiResponse.fail(res, { id: 'Invalid playlist ID' }, 'Validation failed');
      }
      
      // Get existing playlist to check ownership
      const existingPlaylist = await this.playlistService.getPlaylistById(playlistId);
      
      if (!existingPlaylist) {
        return ApiResponse.notFound(res, 'Playlist not found');
      }
      
      // Check if user is the owner or an admin
      const isUserOwner = req.user?.id === existingPlaylist.userId;
      const isAdmin = req.user?.role === 'admin';
      
      if (!isUserOwner && !isAdmin) {
        return ApiResponse.forbidden(res, 'You can only update your own playlists');
      }
      
      // Regular users cannot update editorial playlists
      if (existingPlaylist.isEditorial && !isAdmin) {
        return ApiResponse.forbidden(res, 'Only administrators can update editorial playlists');
      }
      
      // Regular users cannot make their playlists editorial
      if (!isAdmin && req.body.isEditorial) {
        return ApiResponse.forbidden(res, 'Only administrators can make playlists editorial');
      }
      
      // Prepare update data
      const updateData = { ...req.body };
      
      // Remove undefined values
      Object.keys(updateData).forEach(key => 
        updateData[key] === undefined && delete updateData[key]
      );
      
      const updatedPlaylist = await this.playlistService.updatePlaylist(playlistId, updateData);
      
      return ApiResponse.success(res, updatedPlaylist, 'Playlist updated successfully');
    } catch (error) {
      logger.error(`Error in updatePlaylist controller for ID ${req.params.id}:`, error);
      
      if (error instanceof NotFoundError) {
        return ApiResponse.notFound(res, error.message);
      }
      
      if (error instanceof ValidationError) {
        return ApiResponse.fail(res, error.data, error.message);
      }
      
      if (error instanceof ForbiddenError) {
        return ApiResponse.forbidden(res, error.message);
      }
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to update playlist';
      return ApiResponse.error(res, errorMessage);
    }
  }

  /**
   * Delete playlist
   * DELETE /api/playlists/:id
   */
  public async deletePlaylist(req: Request, res: Response): Promise<Response> {
    try {
      const playlistId = parseInt(req.params.id);
      
      if (isNaN(playlistId)) {
        return ApiResponse.fail(res, { id: 'Invalid playlist ID' }, 'Validation failed');
      }
      
      // Get existing playlist to check ownership
      const existingPlaylist = await this.playlistService.getPlaylistById(playlistId);
      
      if (!existingPlaylist) {
        return ApiResponse.notFound(res, 'Playlist not found');
      }
      
      // Check if user is the owner or an admin
      const isUserOwner = req.user?.id === existingPlaylist.userId;
      const isAdmin = req.user?.role === 'admin';
      
      if (!isUserOwner && !isAdmin) {
        return ApiResponse.forbidden(res, 'You can only delete your own playlists');
      }
      
      // Regular users cannot delete editorial playlists
      if (existingPlaylist.isEditorial && !isAdmin) {
        return ApiResponse.forbidden(res, 'Only administrators can delete editorial playlists');
      }
      
      await this.playlistService.deletePlaylist(playlistId);
      
      return ApiResponse.success(res, null, 'Playlist deleted successfully');
    } catch (error) {
      logger.error(`Error in deletePlaylist controller for ID ${req.params.id}:`, error);
      
      if (error instanceof NotFoundError) {
        return ApiResponse.notFound(res, error.message);
      }
      
      if (error instanceof ForbiddenError) {
        return ApiResponse.forbidden(res, error.message);
      }
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete playlist';
      return ApiResponse.error(res, errorMessage);
    }
  }

  /**
   * Add audio to playlist
   * POST /api/playlists/:id/audios
   */
  public async addAudioToPlaylist(req: Request, res: Response): Promise<Response> {
    try {
      const playlistId = parseInt(req.params.id);
      
      if (isNaN(playlistId)) {
        return ApiResponse.fail(res, { id: 'Invalid playlist ID' }, 'Validation failed');
      }
      
      // Validate audio ID
      const audioId = parseInt(req.body.audioId);
      
      if (!audioId || isNaN(audioId)) {
        return ApiResponse.fail(res, { audioId: 'Valid audio ID is required' }, 'Validation failed');
      }
      
      // Get existing playlist to check ownership
      const existingPlaylist = await this.playlistService.getPlaylistById(playlistId);
      
      if (!existingPlaylist) {
        return ApiResponse.notFound(res, 'Playlist not found');
      }
      
      // Check if user is the owner or an admin
      const isUserOwner = req.user?.id === existingPlaylist.userId;
      const isAdmin = req.user?.role === 'admin';
      
      if (!isUserOwner && !isAdmin) {
        return ApiResponse.forbidden(res, 'You can only modify your own playlists');
      }
      
      // Regular users cannot modify editorial playlists
      if (existingPlaylist.isEditorial && !isAdmin) {
        return ApiResponse.forbidden(res, 'Only administrators can modify editorial playlists');
      }
      
      // Optional position for the audio in the playlist
      const position = req.body.position ? parseInt(req.body.position) : undefined;
      
      await this.playlistService.addAudioToPlaylist(playlistId, audioId, position);
      
      return ApiResponse.success(res, { playlistId, audioId }, 'Audio added to playlist successfully');
    } catch (error) {
      logger.error(`Error in addAudioToPlaylist controller for playlist ID ${req.params.id}:`, error);
      
      if (error instanceof NotFoundError) {
        return ApiResponse.notFound(res, error.message);
      }
      
      if (error instanceof ValidationError) {
        return ApiResponse.fail(res, error.data, error.message);
      }
      
      if (error instanceof ForbiddenError) {
        return ApiResponse.forbidden(res, error.message);
      }
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to add audio to playlist';
      return ApiResponse.error(res, errorMessage);
    }
  }

  /**
   * Remove audio from playlist
   * DELETE /api/playlists/:id/audios/:audioId
   */
  public async removeAudioFromPlaylist(req: Request, res: Response): Promise<Response> {
    try {
      const playlistId = parseInt(req.params.id);
      const audioId = parseInt(req.params.audioId);
      
      if (isNaN(playlistId)) {
        return ApiResponse.fail(res, { id: 'Invalid playlist ID' }, 'Validation failed');
      }
      
      if (isNaN(audioId)) {
        return ApiResponse.fail(res, { audioId: 'Invalid audio ID' }, 'Validation failed');
      }
      
      // Get existing playlist to check ownership
      const existingPlaylist = await this.playlistService.getPlaylistById(playlistId);
      
      if (!existingPlaylist) {
        return ApiResponse.notFound(res, 'Playlist not found');
      }
      
      // Check if user is the owner or an admin
      const isUserOwner = req.user?.id === existingPlaylist.userId;
      const isAdmin = req.user?.role === 'admin';
      
      if (!isUserOwner && !isAdmin) {
        return ApiResponse.forbidden(res, 'You can only modify your own playlists');
      }
      
      // Regular users cannot modify editorial playlists
      if (existingPlaylist.isEditorial && !isAdmin) {
        return ApiResponse.forbidden(res, 'Only administrators can modify editorial playlists');
      }
      
      await this.playlistService.removeAudioFromPlaylist(playlistId, audioId);
      
      return ApiResponse.success(res, null, 'Audio removed from playlist successfully');
    } catch (error) {
      logger.error(`Error in removeAudioFromPlaylist controller for playlist ID ${req.params.id} and audio ID ${req.params.audioId}:`, error);
      
      if (error instanceof NotFoundError) {
        return ApiResponse.notFound(res, error.message);
      }
      
      if (error instanceof ForbiddenError) {
        return ApiResponse.forbidden(res, error.message);
      }
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to remove audio from playlist';
      return ApiResponse.error(res, errorMessage);
    }
  }

  /**
   * Reorder audio in playlist
   * PUT /api/playlists/:id/audios/:audioId/reorder
   */
  public async reorderPlaylistAudio(req: Request, res: Response): Promise<Response> {
    try {
      const playlistId = parseInt(req.params.id);
      const audioId = parseInt(req.params.audioId);
      
      if (isNaN(playlistId)) {
        return ApiResponse.fail(res, { id: 'Invalid playlist ID' }, 'Validation failed');
      }
      
      if (isNaN(audioId)) {
        return ApiResponse.fail(res, { audioId: 'Invalid audio ID' }, 'Validation failed');
      }
      
      // Validate new position
      const newPosition = parseInt(req.body.position);
      
      if (isNaN(newPosition) || newPosition < 0) {
        return ApiResponse.fail(res, { position: 'Valid position is required' }, 'Validation failed');
      }
      
      // Get existing playlist to check ownership
      const existingPlaylist = await this.playlistService.getPlaylistById(playlistId);
      
      if (!existingPlaylist) {
        return ApiResponse.notFound(res, 'Playlist not found');
      }
      
      // Check if user is the owner or an admin
      const isUserOwner = req.user?.id === existingPlaylist.userId;
      const isAdmin = req.user?.role === 'admin';
      
      if (!isUserOwner && !isAdmin) {
        return ApiResponse.forbidden(res, 'You can only modify your own playlists');
      }
      
      // Regular users cannot modify editorial playlists
      if (existingPlaylist.isEditorial && !isAdmin) {
        return ApiResponse.forbidden(res, 'Only administrators can modify editorial playlists');
      }
      
      await this.playlistService.reorderPlaylistAudio(playlistId, audioId, newPosition);
      
      return ApiResponse.success(res, null, 'Audio reordered successfully');
    } catch (error) {
      logger.error(`Error in reorderPlaylistAudio controller for playlist ID ${req.params.id} and audio ID ${req.params.audioId}:`, error);
      
      if (error instanceof NotFoundError) {
        return ApiResponse.notFound(res, error.message);
      }
      
      if (error instanceof ValidationError) {
        return ApiResponse.fail(res, error.data, error.message);
      }
      
      if (error instanceof ForbiddenError) {
        return ApiResponse.forbidden(res, error.message);
      }
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to reorder audio in playlist';
      return ApiResponse.error(res, errorMessage);
    }
  }
}

export default PlaylistController;