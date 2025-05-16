// backend/src/services/dropbox/IDropboxService.ts
/**
 * Interface for Dropbox service
 */
export interface IDropboxService {
  /**
   * Upload file to Dropbox
   * @param filePath Path to store the file in Dropbox
   * @param fileContent File content as buffer or stream
   * @returns Shared link to the file
   */
  uploadFile(filePath: string, fileContent: Buffer | NodeJS.ReadableStream): Promise<string>;
  
  /**
   * Get file from Dropbox
   * @param filePath Path to the file in Dropbox
   * @returns File content as buffer
   */
  getFile(filePath: string): Promise<Buffer>;
  
  /**
   * Delete file from Dropbox
   * @param filePath Path to the file in Dropbox
   * @returns Success status
   */
  deleteFile(filePath: string): Promise<boolean>;
  
  /**
   * Create shared link for a file
   * @param filePath Path to the file in Dropbox
   * @returns Shared link
   */
  createSharedLink(filePath: string): Promise<string>;
  
  /**
   * Check if file exists in Dropbox
   * @param filePath Path to the file in Dropbox
   * @returns Whether the file exists
   */
  fileExists(filePath: string): Promise<boolean>;
}

export default IDropboxService;