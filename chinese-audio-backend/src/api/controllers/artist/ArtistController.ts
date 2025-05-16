// backend/src/api/controllers/artist/ArtistController.ts
import { Request, Response } from 'express';
import { IArtistService, ArtistCreateData, ArtistUpdateData } from '../../../services/artist';
import { IAudioService } from '../../../services/audio';
import ApiResponse from '../../../utils/response';
import { PaginationOptions } from '../../../types/pagination';
import { ValidationError, NotFoundError, ForbiddenError } from '../../../utils/errors';
import logger from '../../../utils/logger';
import config from '../../../config';

/**
 * Controller for handling artist-related requests
 */
export class ArtistController {
  constructor(
    private readonly artistService: IArtistService,
    private readonly audioService: IAudioService
  ) {}

  /**
   * Get all artists with pagination
   * GET /api/artists
   */
  public async getAllArtists(req: Request, res: Response): Promise<Response> {
    try {
      const page = parseInt(req.query.page as string) || config.pagination.defaultPage;
      const limit = parseInt(req.query.limit as string) || config.pagination.defaultLimit;
      const options: PaginationOptions = { page, limit };
      
      const result = await this.artistService.getAllArtists(options);
      
      return ApiResponse.paginatedSuccess(res, result);
    } catch (error) {
      logger.error('Error in getAllArtists controller:', error);
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch artists';
      return ApiResponse.error(res, errorMessage);
    }
  }

  /**
   * Get artist by ID
   * GET /api/artists/:id
   */
  public async getArtistById(req: Request, res: Response): Promise<Response> {
    try {
      const artistId = parseInt(req.params.id);
      
      if (isNaN(artistId)) {
        return ApiResponse.fail(res, { id: 'Invalid artist ID' }, 'Validation failed');
      }
      
      const artist = await this.artistService.getArtistWithUser(artistId);
      
      if (!artist) {
        return ApiResponse.notFound(res, 'Artist not found');
      }
      
      return ApiResponse.success(res, artist);
    } catch (error) {
      logger.error(`Error in getArtistById controller for ID ${req.params.id}:`, error);
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch artist';
      return ApiResponse.error(res, errorMessage);
    }
  }

  /**
   * Get verified artists
   * GET /api/artists/verified
   */
  public async getVerifiedArtists(req: Request, res: Response): Promise<Response> {
    try {
      const page = parseInt(req.query.page as string) || config.pagination.defaultPage;
      const limit = parseInt(req.query.limit as string) || config.pagination.defaultLimit;
      const options: PaginationOptions = { page, limit };
      
      const result = await this.artistService.getVerifiedArtists(options);
      
      return ApiResponse.paginatedSuccess(res, result);
    } catch (error) {
      logger.error('Error in getVerifiedArtists controller:', error);
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch verified artists';
      return ApiResponse.error(res, errorMessage);
    }
  }

  /**
   * Get popular artists
   * GET /api/artists/popular
   */
  public async getPopularArtists(req: Request, res: Response): Promise<Response> {
    try {
      const page = parseInt(req.query.page as string) || config.pagination.defaultPage;
      const limit = parseInt(req.query.limit as string) || config.pagination.defaultLimit;
      const options: PaginationOptions = { page, limit };
      
      const result = await this.artistService.getPopularArtists(options);
      
      return ApiResponse.paginatedSuccess(res, result);
    } catch (error) {
      logger.error('Error in getPopularArtists controller:', error);
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch popular artists';
      return ApiResponse.error(res, errorMessage);
    }
  }

  /**
   * Search artists
   * GET /api/artists/search
   */
  public async searchArtists(req: Request, res: Response): Promise<Response> {
    try {
      const searchTerm = req.query.q as string;
      
      if (!searchTerm || searchTerm.trim().length < 2) {
        return ApiResponse.fail(res, { q: 'Search term must be at least 2 characters' }, 'Validation failed');
      }
      
      const page = parseInt(req.query.page as string) || config.pagination.defaultPage;
      const limit = parseInt(req.query.limit as string) || config.pagination.defaultLimit;
      const options: PaginationOptions = { page, limit };
      
      const result = await this.artistService.searchArtists(searchTerm, options);
      
      return ApiResponse.paginatedSuccess(res, result);
    } catch (error) {
      logger.error(`Error in searchArtists controller for term "${req.query.q}":`, error);
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to search artists';
      return ApiResponse.error(res, errorMessage);
    }
  }

  /**
   * Create artist profile
   * POST /api/artists
   */
  public async createArtist(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.user?.id;
      
      if (!userId) {
        return ApiResponse.unauthorized(res, 'User not authenticated');
      }
      
      // Validation happens in middleware, so we can assume data is valid
      const artistData: ArtistCreateData = {
        userId,
        bio: req.body.bio,
        contactInfo: req.body.contactInfo,
      };
      
      const artist = await this.artistService.createArtist(artistData);
      
      return ApiResponse.success(res, artist, 'Artist profile created successfully', 201);
    } catch (error) {
      logger.error('Error in createArtist controller:', error);
      
      if (error instanceof ValidationError) {
        return ApiResponse.fail(res, error.data, error.message);
      }
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to create artist profile';
      return ApiResponse.error(res, errorMessage);
    }
  }

  /**
   * Update artist profile
   * PUT /api/artists/:id
   */
  public async updateArtist(req: Request, res: Response): Promise<Response> {
    try {
      const artistId = parseInt(req.params.id);
      
      if (isNaN(artistId)) {
        return ApiResponse.fail(res, { id: 'Invalid artist ID' }, 'Validation failed');
      }
      
      // Get existing artist to check ownership
      const existingArtist = await this.artistService.getArtistById(artistId);
      
      if (!existingArtist) {
        return ApiResponse.notFound(res, 'Artist not found');
      }
      
      // Check if user is the owner or an admin
      const isUserOwner = req.user?.id === existingArtist.userId;
      const isAdmin = req.user?.role === 'admin';
      
      if (!isUserOwner && !isAdmin) {
        return ApiResponse.forbidden(res, 'You can only update your own artist profile');
      }
      
      // Validation happens in middleware, so we can assume data is valid
      const artistData: ArtistUpdateData = {
        bio: req.body.bio,
        contactInfo: req.body.contactInfo,
      };
      
      const updatedArtist = await this.artistService.updateArtist(artistId, artistData);
      
      return ApiResponse.success(res, updatedArtist, 'Artist profile updated successfully');
    } catch (error) {
      logger.error(`Error in updateArtist controller for ID ${req.params.id}:`, error);
      
      if (error instanceof ValidationError) {
        return ApiResponse.fail(res, error.data, error.message);
      }
      
      if (error instanceof NotFoundError) {
        return ApiResponse.notFound(res, error.message);
      }
      
      if (error instanceof ForbiddenError) {
        return ApiResponse.forbidden(res, error.message);
      }
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to update artist profile';
      return ApiResponse.error(res, errorMessage);
    }
  }

  /**
   * Verify artist (admin only)
   * PATCH /api/artists/:id/verify
   */
  public async verifyArtist(req: Request, res: Response): Promise<Response> {
    try {
      // Check if user is admin (should be done in middleware)
      if (req.user?.role !== 'admin') {
        return ApiResponse.forbidden(res, 'Admin access required');
      }
      
      const artistId = parseInt(req.params.id);
      const adminId = req.user.adminId;
      const { isApproved, adminNotes } = req.body;
      
      if (isNaN(artistId)) {
        return ApiResponse.fail(res, { id: 'Invalid artist ID' }, 'Validation failed');
      }
      
      if (typeof isApproved !== 'boolean') {
        return ApiResponse.fail(res, { isApproved: 'isApproved must be a boolean' }, 'Validation failed');
      }
      
      if (!adminId) {
        return ApiResponse.forbidden(res, 'Admin profile not found');
      }
      
      const updatedArtist = await this.artistService.verifyArtist({
        artistId,
        adminId,
        isApproved,
        adminNotes,
      });
      
      if (!updatedArtist) {
        return ApiResponse.notFound(res, 'Artist not found');
      }
      
      const statusMessage = isApproved ? 'verified' : 'rejected';
      return ApiResponse.success(res, updatedArtist, `Artist ${statusMessage} successfully`);
    } catch (error) {
      logger.error(`Error in verifyArtist controller for ID ${req.params.id}:`, error);
      
      if (error instanceof NotFoundError) {
        return ApiResponse.notFound(res, error.message);
      }
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to verify artist';
      return ApiResponse.error(res, errorMessage);
    }
  }

  /**
   * Get pending verification artists (admin only)
   * GET /api/artists/pending
   */
  public async getPendingVerificationArtists(req: Request, res: Response): Promise<Response> {
    try {
      // Check if user is admin (should be done in middleware)
      if (req.user?.role !== 'admin') {
        return ApiResponse.forbidden(res, 'Admin access required');
      }
      
      const page = parseInt(req.query.page as string) || config.pagination.defaultPage;
      const limit = parseInt(req.query.limit as string) || config.pagination.defaultLimit;
      const options: PaginationOptions = { page, limit };
      
      const result = await this.artistService.getPendingVerificationArtists(options);
      
      return ApiResponse.paginatedSuccess(res, result);
    } catch (error) {
      logger.error('Error in getPendingVerificationArtists controller:', error);
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch pending verification artists';
      return ApiResponse.error(res, errorMessage);
    }
  }

  /**
   * Get artist's audios
   * GET /api/artists/:id/audios
   */
  public async getArtistAudios(req: Request, res: Response): Promise<Response> {
    try {
      const artistId = parseInt(req.params.id);
      
      if (isNaN(artistId)) {
        return ApiResponse.fail(res, { id: 'Invalid artist ID' }, 'Validation failed');
      }
      
      const page = parseInt(req.query.page as string) || config.pagination.defaultPage;
      const limit = parseInt(req.query.limit as string) || config.pagination.defaultLimit;
      const options: PaginationOptions = { page, limit };
      
      // First check if artist exists
      const artist = await this.artistService.getArtistById(artistId);
      
      if (!artist) {
        return ApiResponse.notFound(res, 'Artist not found');
      }
      
      const result = await this.artistService.getArtistAudios(artistId, options);
      
      return ApiResponse.paginatedSuccess(res, result);
    } catch (error) {
      logger.error(`Error in getArtistAudios controller for artist ID ${req.params.id}:`, error);
      
      if (error instanceof NotFoundError) {
        return ApiResponse.notFound(res, error.message);
      }
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch artist audios';
      return ApiResponse.error(res, errorMessage);
    }
  }
}

export default ArtistController;