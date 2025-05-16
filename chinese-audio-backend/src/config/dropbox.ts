// backend/src/config/dropbox.ts
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Dropbox API configuration
 */
export const dropbox = {
  appKey: process.env.DROPBOX_APP_KEY || '',
  appSecret: process.env.DROPBOX_APP_SECRET || '',
  refreshToken: process.env.DROPBOX_REFRESH_TOKEN || '',
  accessToken: process.env.DROPBOX_ACCESS_TOKEN || '',
  folderPath: process.env.DROPBOX_FOLDER_PATH || '/chinese_audio',
  
  // Optional settings
  uploadChunkSize: parseInt(process.env.DROPBOX_UPLOAD_CHUNK_SIZE || '8388608', 10), // 8MB
  maxUploadRetries: parseInt(process.env.DROPBOX_MAX_UPLOAD_RETRIES || '3', 10),
  linkExpiryDays: parseInt(process.env.DROPBOX_LINK_EXPIRY_DAYS || '7', 10), // 7 days
  downloadTimeout: parseInt(process.env.DROPBOX_DOWNLOAD_TIMEOUT || '120000', 10), // 2 minutes
  
  // Path structure settings
  audioFolder: '/audios',
  imageFolder: '/images',
  transcriptFolder: '/transcripts',
  tempFolder: '/temp',
  
  // URL generation settings
  forceSharedLinks: process.env.DROPBOX_FORCE_SHARED_LINKS === 'true',
  publicLinkAccess: process.env.DROPBOX_PUBLIC_LINK_ACCESS === 'true',
  
  // Optional proxy settings
  proxyUrl: process.env.DROPBOX_PROXY_URL || '',
};

export default dropbox;