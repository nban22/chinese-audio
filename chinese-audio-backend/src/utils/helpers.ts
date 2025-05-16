// backend/src/utils/helpers.ts
import crypto from 'crypto';
import path from 'path';
import config from '../config';

/**
 * Helper functions for common operations
 */
export const helpers = {
  /**
   * Generate a random string of specified length
   * @param length Length of the random string
   * @returns Random string
   */
  generateRandomString: (length: number = 32): string => {
    return crypto.randomBytes(length).toString('hex').slice(0, length);
  },

  /**
   * Generate a unique ID with optional prefix
   * @param prefix Optional prefix for the ID
   * @returns Unique ID string
   */
  generateUniqueId: (prefix: string = ''): string => {
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substring(2, 15);
    return `${prefix}${timestamp}${randomStr}`;
  },

  /**
   * Generate a secure token
   * @param size Size of the token in bytes (default: 32)
   * @returns Secure random token
   */
  generateSecureToken: (size: number = 32): string => {
    return crypto.randomBytes(size).toString('hex');
  },

  /**
   * Hash a string with SHA-256
   * @param data String to hash
   * @returns Hashed string
   */
  hashString: (data: string): string => {
    return crypto.createHash('sha256').update(data).digest('hex');
  },

  /**
   * Format date to ISO string without milliseconds
   * @param date Date to format
   * @returns Formatted date string
   */
  formatDate: (date: Date = new Date()): string => {
    return date.toISOString().split('.')[0] + 'Z';
  },

  /**
   * Format file size to human readable format
   * @param bytes File size in bytes
   * @param decimals Number of decimal places
   * @returns Formatted file size string
   */
  formatFileSize: (bytes: number, decimals: number = 2): string => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  },

  /**
   * Truncate a string to a specified length
   * @param str String to truncate
   * @param maxLength Maximum length
   * @param suffix Suffix to add if truncated (default: '...')
   * @returns Truncated string
   */
  truncateString: (str: string, maxLength: number, suffix: string = '...'): string => {
    if (str.length <= maxLength) return str;
    return str.substring(0, maxLength - suffix.length) + suffix;
  },

  /**
   * Sanitize a filename to be safe for the filesystem
   * @param filename Filename to sanitize
   * @returns Sanitized filename
   */
  sanitizeFilename: (filename: string): string => {
    // Replace unsafe characters
    let sanitized = filename.replace(/[\/\\:*?"<>|]/g, '-');
    
    // Ensure filename is not too long
    const extension = path.extname(sanitized);
    const basename = path.basename(sanitized, extension);
    if (basename.length + extension.length > 240) {
      sanitized = basename.substring(0, 240 - extension.length) + extension;
    }
    
    return sanitized;
  },

  /**
   * Generate a slug from a string
   * @param str String to convert to slug
   * @returns Slug string
   */
  slugify: (str: string): string => {
    return str
      .toLowerCase()
      .replace(/\s+/g, '-')      // Replace spaces with -
      .replace(/[^\w\-]+/g, '')  // Remove all non-word chars
      .replace(/\-\-+/g, '-')    // Replace multiple - with single -
      .replace(/^-+/, '')        // Trim - from start of text
      .replace(/-+$/, '');       // Trim - from end of text
  },

  /**
   * Calculate pagination metadata
   * @param total Total number of items
   * @param page Current page
   * @param limit Items per page
   * @returns Pagination metadata
   */
  getPaginationMeta: (total: number, page: number, limit: number) => {
    const totalPages = Math.ceil(total / limit);
    const currentPage = page > totalPages ? totalPages : page;
    
    return {
      totalItems: total,
      itemsPerPage: limit,
      currentPage: currentPage || 1,
      totalPages: totalPages || 1,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1
    };
  },

  /**
   * Deep clone an object
   * @param obj Object to clone
   * @returns Cloned object
   */
  deepClone: <T>(obj: T): T => {
    return JSON.parse(JSON.stringify(obj));
  },

  /**
   * Generate a random filename with optional prefix and extension
   * @param prefix Prefix for the filename
   * @param extension File extension (without dot)
   * @returns Random filename
   */
  generateRandomFilename: (prefix: string = '', extension: string = ''): string => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000000);
    const ext = extension ? `.${extension}` : '';
    return `${prefix}${timestamp}_${random}${ext}`;
  },

  /**
   * Extract file extension from a filename
   * @param filename Filename
   * @returns File extension (without dot)
   */
  getFileExtension: (filename: string): string => {
    return path.extname(filename).slice(1).toLowerCase();
  },

  /**
   * Create folder path for Dropbox
   * @param type Type of content (audio, image, transcript)
   * @param userId User ID
   * @returns Folder path
   */
  createDropboxFolderPath: (type: 'audio' | 'image' | 'transcript', userId: string | number): string => {
    const baseFolder = config.dropbox.folderPath;
    const typeFolder = type === 'audio' ? '/audios' : type === 'image' ? '/images' : '/transcripts';
    return `${baseFolder}${typeFolder}/${userId}`;
  },
  
  /**
   * Parse boolean from various inputs
   * @param value Value to parse
   * @returns Boolean value
   */
  parseBoolean: (value: any): boolean => {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'number') return value !== 0;
    if (typeof value === 'string') {
      const normalized = value.toLowerCase().trim();
      return normalized === 'true' || normalized === 'yes' || normalized === '1';
    }
    return false;
  },
  
  /**
   * Mask sensitive data for logging
   * @param data Data object
   * @param fieldsToMask Fields to mask
   * @returns Masked data object
   */
  maskSensitiveData: <T extends object>(data: T, fieldsToMask: string[]): T => {
    const maskedData = { ...data };
    
    fieldsToMask.forEach(field => {
      if (field in maskedData) {
        (maskedData as any)[field] = '********';
      }
    });
    
    return maskedData;
  }
};

export default helpers;