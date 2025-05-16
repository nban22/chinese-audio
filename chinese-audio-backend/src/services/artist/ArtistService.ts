// backend/src/services/artist/ArtistService.ts
import { IArtistService, ArtistCreateData, ArtistUpdateData, ArtistVerificationData } from './IArtistService';
import { IArtistRepository } from '../../db/repositories/artist/IArtistRepository';
import { IUserRepository } from '../../db/repositories/user/IUserRepository';
import { IAudioRepository } from '../../db/repositories/audio/IAudioRepository';
import { Artist } from '../../db/models/artist.model';
import { Audio } from '../../db/models/audio.model';
import { UserType } from '../../db/models/user.model';
import { PaginationOptions, PaginationResult } from '../../types/pagination';
import { NotFoundError, ValidationError, ForbiddenError } from '../../utils/errors';
import logger from '../../utils/logger';
import sequelize from '../../db';

/**
 * Artist service implementation
 */
export class ArtistService implements IArtistService {
  constructor(
    private readonly artistRepository: IArtistRepository,
    private readonly userRepository: IUserRepository,
    private readonly audioRepository: IAudioRepository
  ) {}

  /**
   * Get artist by ID
   */
  async getArtistById(artistId: number): Promise<Artist | null> {
    try {
      return await this.artistRepository.findById(artistId);
    } catch (error) {
      logger.error(`Error in getArtistById for ID ${artistId}:`, error);
      throw error;
    }
  }

  /**
   * Get artist by user ID
   */
  async getArtistByUserId(userId: number): Promise<Artist | null> {
    try {
      return await this.artistRepository.findByUserId(userId);
    } catch (error) {
      logger.error(`Error in getArtistByUserId for user ID ${userId}:`, error);
      throw error;
    }
  }

  /**
   * Get artist with user information
   */
  async getArtistWithUser(artistId: number): Promise<Artist | null> {
    try {
      return await this.artistRepository.findWithUser(artistId);
    } catch (error) {
      logger.error(`Error in getArtistWithUser for ID ${artistId}:`, error);
      throw error;
    }
  }

  /**
   * Get all artists with pagination
   */
  async getAllArtists(options: PaginationOptions): Promise<PaginationResult<Artist>> {
    try {
      return await this.artistRepository.findAllPaginated(options, {
        include: this.artistRepository.getCommonIncludes()
      });
    } catch (error) {
      logger.error('Error in getAllArtists:', error);
      throw error;
    }
  }

  /**
   * Get verified artists with pagination
   */
  async getVerifiedArtists(options: PaginationOptions): Promise<PaginationResult<Artist>> {
    try {
      return await this.artistRepository.findAllVerified(options);
    } catch (error) {
      logger.error('Error in getVerifiedArtists:', error);
      throw error;
    }
  }

  /**
   * Get pending verification artists with pagination
   */
  async getPendingVerificationArtists(options: PaginationOptions): Promise<PaginationResult<Artist>> {
    try {
      return await this.artistRepository.findAllPendingVerification(options);
    } catch (error) {
      logger.error('Error in getPendingVerificationArtists:', error);
      throw error;
    }
  }

  /**
   * Search artists by name or bio
   */
  async searchArtists(searchTerm: string, options: PaginationOptions): Promise<PaginationResult<Artist>> {
    try {
      return await this.artistRepository.search(searchTerm, options);
    } catch (error) {
      logger.error(`Error in searchArtists for term "${searchTerm}":`, error);
      throw error;
    }
  }

  /**
   * Get popular artists based on follows count
   */
  async getPopularArtists(options: PaginationOptions): Promise<PaginationResult<Artist>> {
    try {
      return await this.artistRepository.getPopularArtists(options);
    } catch (error) {
      logger.error('Error in getPopularArtists:', error);
      throw error;
    }
  }

  /**
   * Create artist profile for existing user
   */
  async createArtist(artistData: ArtistCreateData): Promise<Artist> {
    const transaction = await sequelize.transaction();
    
    try {
      // Check if user exists
      const user = await this.userRepository.findById(artistData.userId);
      if (!user) {
        throw new NotFoundError(`User with ID ${artistData.userId} not found`);
      }
      
      // Check if user already has an artist profile
      const existingArtist = await this.artistRepository.findByUserId(artistData.userId);
      if (existingArtist) {
        throw new ValidationError({ userId: 'User already has an artist profile' });
      }
      
      // Update user type to artist
      await this.userRepository.update(
        artistData.userId,
        { userType: UserType.ARTIST }
      );
      
      // Create artist profile
      const artist = await this.artistRepository.create(
        {
          userId: artistData.userId,
          bio: artistData.bio || '',
          contactInfo: artistData.contactInfo || '',
          isVerified: false,
        },
        { transaction }
      );
      
      // Commit transaction
      await transaction.commit();
      
      // Return created artist with relations
      return await this.artistRepository.findWithUser(artist.id) as Artist;
    } catch (error) {
      // Rollback transaction on error
      await transaction.rollback();
      logger.error('Error in createArtist:', error);
      throw error;
    }
  }

  /**
   * Update artist profile
   */
  async updateArtist(artistId: number, artistData: ArtistUpdateData): Promise<Artist | null> {
    try {
      // Check if artist exists
      const existingArtist = await this.artistRepository.findById(artistId);
      if (!existingArtist) {
        throw new NotFoundError(`Artist with ID ${artistId} not found`);
      }
      
      // Update artist
      const updatedArtist = await this.artistRepository.update(artistId, artistData);
      return updatedArtist;
    } catch (error) {
      logger.error(`Error in updateArtist for ID ${artistId}:`, error);
      throw error;
    }
  }

  /**
   * Verify or reject artist
   */
  async verifyArtist(verificationData: ArtistVerificationData): Promise<Artist | null> {
    try {
      // Check if artist exists
      const existingArtist = await this.artistRepository.findById(verificationData.artistId);
      if (!existingArtist) {
        throw new NotFoundError(`Artist with ID ${verificationData.artistId} not found`);
      }
      
      // Update verification status
      const updatedArtist = await this.artistRepository.update(
        verificationData.artistId,
        {
          isVerified: verificationData.isApproved,
          verifiedAt: verificationData.isApproved ? new Date() : undefined,
        }
      );
      
      // In a real implementation, you would create a verification record
      // with admin notes and other details
      
      return updatedArtist;
    } catch (error) {
      logger.error(`Error in verifyArtist for artist ID ${verificationData.artistId}:`, error);
      throw error;
    }
  }

  /**
   * Get artist audios with pagination
   */
  async getArtistAudios(artistId: number, options: PaginationOptions): Promise<PaginationResult<Audio>> {
    try {
      // Check if artist exists
      const existingArtist = await this.artistRepository.findById(artistId);
      if (!existingArtist) {
        throw new NotFoundError(`Artist with ID ${artistId} not found`);
      }
      
      // Get artist audios
      return await this.audioRepository.findByArtistId(artistId, options);
    } catch (error) {
      logger.error(`Error in getArtistAudios for artist ID ${artistId}:`, error);
      throw error;
    }
  }

  /**
   * Count verified artists
   */
  async countVerifiedArtists(): Promise<number> {
    try {
      return await this.artistRepository.countVerified();
    } catch (error) {
      logger.error('Error in countVerifiedArtists:', error);
      throw error;
    }
  }
}

export default ArtistService;