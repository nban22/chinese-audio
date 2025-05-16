// backend/src/config/auth.ts
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Authentication configuration
 */
export const auth = {
  // JWT settings
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d', // 1 day
  jwtAlgorithm: process.env.JWT_ALGORITHM || 'HS256',
  jwtIssuer: process.env.JWT_ISSUER || 'chinese-audio-api',
  jwtAudience: process.env.JWT_AUDIENCE || 'chinese-audio-clients',
  
  // Refresh token settings
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || 'your-refresh-secret-key',
  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d', // 7 days
  refreshTokenCookieName: process.env.REFRESH_TOKEN_COOKIE_NAME || 'refresh_token',
  
  // Password hashing settings
  saltRounds: parseInt(process.env.SALT_ROUNDS || '10', 10),
  
  // Two-factor authentication
  enableTwoFactor: process.env.ENABLE_TWO_FACTOR === 'true',
  twoFactorIssuer: process.env.TWO_FACTOR_ISSUER || 'ChineseAudioApp',
  
  // OAuth settings
  googleClientId: process.env.GOOGLE_CLIENT_ID || '',
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  googleCallbackUrl: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3000/api/auth/google/callback',
  
  facebookAppId: process.env.FACEBOOK_APP_ID || '',
  facebookAppSecret: process.env.FACEBOOK_APP_SECRET || '',
  facebookCallbackUrl: process.env.FACEBOOK_CALLBACK_URL || 'http://localhost:3000/api/auth/facebook/callback',
  
  // Security settings
  passwordMinLength: parseInt(process.env.PASSWORD_MIN_LENGTH || '8', 10),
  passwordRequireUppercase: process.env.PASSWORD_REQUIRE_UPPERCASE === 'true',
  passwordRequireNumbers: process.env.PASSWORD_REQUIRE_NUMBERS === 'true',
  passwordRequireSymbols: process.env.PASSWORD_REQUIRE_SYMBOLS === 'true',
  
  maxLoginAttempts: parseInt(process.env.MAX_LOGIN_ATTEMPTS || '5', 10),
  lockoutDuration: parseInt(process.env.LOCKOUT_DURATION || '15', 10), // 15 minutes
  
  // Email verification
  requireEmailVerification: process.env.REQUIRE_EMAIL_VERIFICATION === 'true',
  emailVerificationExpiry: parseInt(process.env.EMAIL_VERIFICATION_EXPIRY || '24', 10), // 24 hours
  
  // Password reset
  passwordResetExpiry: parseInt(process.env.PASSWORD_RESET_EXPIRY || '1', 10), // 1 hour
};

export default auth;