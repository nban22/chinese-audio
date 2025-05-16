// backend/src/config/index.ts
import { database } from './database';
import { server } from './server';
import { dropbox } from './dropbox';
import { auth } from './auth';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

/**
 * Centralized configuration object
 */
const config = {
  // Server configuration
  server,
  
  // Database configuration
  database,
  
  // Authentication configuration
  auth,
  
  // Dropbox API configuration
  dropbox,
  
  // Logging configuration
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    enableFile: process.env.LOG_ENABLE_FILE === 'true',
    filePath: process.env.LOG_FILE_PATH || 'logs/app.log',
    maxSize: process.env.LOG_MAX_SIZE || '10m',
    maxFiles: parseInt(process.env.LOG_MAX_FILES || '5', 10),
    format: process.env.LOG_FORMAT || 'json',
  },
  
  // Email configuration
  email: {
    host: process.env.EMAIL_HOST || '',
    port: parseInt(process.env.EMAIL_PORT || '587', 10),
    user: process.env.EMAIL_USER || '',
    password: process.env.EMAIL_PASSWORD || '',
    from: process.env.EMAIL_FROM || 'noreply@chineseaudio.com',
    secure: process.env.EMAIL_SECURE === 'true',
  },
  
  // Pagination configuration
  pagination: {
    defaultPage: parseInt(process.env.DEFAULT_PAGE || '1', 10),
    defaultLimit: parseInt(process.env.DEFAULT_LIMIT || '10', 10),
    maxLimit: parseInt(process.env.MAX_LIMIT || '100', 10),
  },
  
  // Payment configuration
  payment: {
    stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
    stripePublicKey: process.env.STRIPE_PUBLIC_KEY || '',
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
    currency: process.env.PAYMENT_CURRENCY || 'usd',
  },
  
  // Frontend configuration
  frontend: {
    url: process.env.FRONTEND_URL || 'http://localhost:3000',
    resetPasswordPath: process.env.RESET_PASSWORD_PATH || '/reset-password',
    emailVerificationPath: process.env.EMAIL_VERIFICATION_PATH || '/verify-email',
  },
};

export default config;