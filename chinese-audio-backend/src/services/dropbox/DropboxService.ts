// backend/src/services/dropbox/DropboxService.ts
import { Dropbox, DropboxAuth, DropboxResponse, files } from 'dropbox';
import fetch from 'node-fetch';
import { IDropboxService } from './IDropboxService';
import { ExternalServiceError } from '../../utils/errors';
import config from '../../config';
import logger from '../../utils/logger';

/**
 * Service for interacting with Dropbox API
 */
export class DropboxService implements IDropboxService {
  private dropbox: Dropbox;
  private folderPath: string;

  constructor() {
    // Initialize Dropbox client
    const dbxAuth = new DropboxAuth({
      clientId: config.dropbox.appKey,
      clientSecret: config.dropbox.appSecret,
      refreshToken: config.dropbox.refreshToken,
    });

    this.dropbox = new Dropbox({
      auth: dbxAuth,
      fetch,
    });

    this.folderPath = config.dropbox.folderPath;

    // Use access token if available
    if (config.dropbox.accessToken) {
      this.dropbox = new Dropbox({
        accessToken: config.dropbox.accessToken,
        fetch,
      });
    }
  }

  /**
   * Upload file to Dropbox
   */
  async uploadFile(
    filePath: string,
    fileContent: Buffer | NodeJS.ReadableStream
  ): Promise<string> {
    try {
      // Ensure path starts with slash
      const fullPath = this.getFullPath(filePath);

      // Upload file
      const uploadResult = await this.dropbox.filesUpload({
        path: fullPath,
        contents: fileContent as any,
        mode: { '.tag': 'overwrite' },
        autorename: true,
      });

      // Create shared link
      return await this.createSharedLink(uploadResult.result.path_display || fullPath);
    } catch (error) {
      logger.error('Error uploading file to Dropbox:', error);
      throw new ExternalServiceError('Dropbox', 'Failed to upload file to Dropbox', error as Error);
    }
  }

  /**
   * Get file from Dropbox
   */
  async getFile(filePath: string): Promise<Buffer> {
    try {
      // Ensure path starts with slash
      const fullPath = this.getFullPath(filePath);

      // Download file
      const downloadResult = await this.dropbox.filesDownload({ path: fullPath });

      // Return file content
      return (downloadResult.result as any).fileBinary;
    } catch (error) {
      logger.error(`Error getting file from Dropbox at path ${filePath}:`, error);
      throw new ExternalServiceError('Dropbox', 'Failed to get file from Dropbox', error as Error);
    }
  }

  /**
   * Delete file from Dropbox
   */
  async deleteFile(filePath: string): Promise<boolean> {
    try {
      // Ensure path starts with slash
      const fullPath = this.getFullPath(filePath);

      // Delete file
      await this.dropbox.filesDeleteV2({ path: fullPath });

      return true;
    } catch (error) {
      logger.error(`Error deleting file from Dropbox at path ${filePath}:`, error);
      throw new ExternalServiceError('Dropbox', 'Failed to delete file from Dropbox', error as Error);
    }
  }

  /**
   * Create shared link for a file
   */
  async createSharedLink(filePath: string): Promise<string> {
    try {
      // Ensure path starts with slash
      const fullPath = this.getFullPath(filePath);

      // Create shared link with requested visibility
      const shareResult = await this.dropbox.sharingCreateSharedLinkWithSettings({
        path: fullPath,
        settings: {
          requested_visibility: { '.tag': 'public' },
        },
      });

      // Convert to direct download link by replacing 'dl=0' with 'dl=1'
      return shareResult.result.url.replace('dl=0', 'dl=1');
    } catch (error: any) {
      // Check if error is because link already exists
      if (error?.error?.error?.['.tag'] === 'shared_link_already_exists') {
        // Get existing shared links
        const linksResult = await this.dropbox.sharingListSharedLinks({
          path: filePath,
        });

        if (linksResult.result.links.length > 0) {
          // Convert to direct download link
          return linksResult.result.links[0].url.replace('dl=0', 'dl=1');
        }
      }

      logger.error(`Error creating shared link for Dropbox file at path ${filePath}:`, error);
      throw new ExternalServiceError('Dropbox', 'Failed to create shared link', error as Error);
    }
  }

  /**
   * Check if file exists in Dropbox
   */
  async fileExists(filePath: string): Promise<boolean> {
    try {
      // Ensure path starts with slash
      const fullPath = this.getFullPath(filePath);

      // Try to get metadata
      await this.dropbox.filesGetMetadata({ path: fullPath });

      return true;
    } catch (error: any) {
      // If error is 'path_not_found', file does not exist
      if (error?.error?.error?.['.tag'] === 'path_not_found') {
        return false;
      }

      // Propagate other errors
      logger.error(`Error checking if file exists in Dropbox at path ${filePath}:`, error);
      throw new ExternalServiceError('Dropbox', 'Failed to check if file exists', error as Error);
    }
  }

  /**
   * Get full path including base folder
   */
  private getFullPath(filePath: string): string {
    // Ensure path starts with slash
    filePath = filePath.startsWith('/') ? filePath : `/${filePath}`;

    // Combine with base folder if set
    if (this.folderPath) {
      const basePath = this.folderPath.startsWith('/') ? this.folderPath : `/${this.folderPath}`;
      return `${basePath}${filePath}`;
    }

    return filePath;
  }

  /**
   * Generate folder path for different types of content
   * @param contentType Type of content (audio, image, transcript)
   * @param id Optional ID for subfolder
   * @returns Folder path
   */
  generateContentPath(contentType: 'audio' | 'image' | 'transcript', id?: number): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    
    // Base path based on content type
    let basePath = '';
    
    switch (contentType) {
      case 'audio':
        basePath = `${config.dropbox.audioFolder}/${year}/${month}`;
        break;
      case 'image':
        basePath = `${config.dropbox.imageFolder}/${year}/${month}`;
        break;
      case 'transcript':
        basePath = `${config.dropbox.transcriptFolder}/${year}/${month}`;
        break;
      default:
        basePath = `${config.dropbox.tempFolder}/${year}/${month}`;
    }
    
    // Add ID if provided
    if (id) {
      return `${basePath}/${id}`;
    }
    
    return basePath;
  }
}

export default DropboxService;