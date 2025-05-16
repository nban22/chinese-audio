// backend/src/services/auth/IAuthService.ts
import { User } from '../../db/models/user.model';

/**
 * Authentication response object
 */
export interface AuthResponse {
  user: Partial<User>;
  token: string;
  refreshToken?: string;
  expiresIn: number;
}

/**
 * Registration data
 */
export interface RegistrationData {
  email: string;
  password: string;
  fullName: string;
  phoneNumber?: string;
}

/**
 * Authentication service interface
 */
export interface IAuthService {
  /**
   * Register a new user
   * @param userData Registration data
   * @returns Authentication response with user info and tokens
   */
  register(userData: RegistrationData): Promise<AuthResponse>;
  
  /**
   * Login user
   * @param email User email
   * @param password User password
   * @returns Authentication response with user info and tokens
   */
  login(email: string, password: string): Promise<AuthResponse>;
  
  /**
   * Refresh access token using refresh token
   * @param refreshToken Refresh token
   * @returns New authentication response with new tokens
   */
  refreshToken(refreshToken: string): Promise<AuthResponse>;
  
  /**
   * Verify JWT token
   * @param token JWT token
   * @returns User ID from token if valid
   */
  verifyToken(token: string): Promise<number>;
  
  /**
   * Change user password
   * @param userId User ID
   * @param currentPassword Current password
   * @param newPassword New password
   * @returns Success status
   */
  changePassword(userId: number, currentPassword: string, newPassword: string): Promise<boolean>;
  
  /**
   * Reset password with token
   * @param token Reset password token
   * @param newPassword New password
   * @returns Success status
   */
  resetPassword(token: string, newPassword: string): Promise<boolean>;
  
  /**
   * Generate password reset token
   * @param email User email
   * @returns Token and user email if user exists
   */
  generatePasswordResetToken(email: string): Promise<{ token: string; email: string } | null>;
  
  /**
   * Validate password strength
   * @param password Password to validate
   * @returns Validation result with success status and message
   */
  validatePassword(password: string): { isValid: boolean; message?: string };
}

export default IAuthService;