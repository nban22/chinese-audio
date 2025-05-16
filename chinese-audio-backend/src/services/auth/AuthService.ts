// backend/src/services/auth/AuthService.ts
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { IAuthService, AuthResponse, RegistrationData } from './IAuthService';
import { IUserRepository } from '../../db/repositories/user/IUserRepository';
import { User, UserType } from '../../db/models/user.model';
import { ValidationError, UnauthorizedError, NotFoundError } from '../../utils/errors';
import config from '../../config';
import logger from '../../utils/logger';

/**
 * Authentication service implementation
 */
export class AuthService implements IAuthService {
  constructor(private readonly userRepository: IUserRepository) {}

  /**
   * Register a new user
   */
  async register(userData: RegistrationData): Promise<AuthResponse> {
    // Check if email already exists
    const emailExists = await this.userRepository.emailExists(userData.email);
    if (emailExists) {
      throw new ValidationError({ email: 'Email is already in use' });
    }

    // Validate password strength
    const passwordValidation = this.validatePassword(userData.password);
    if (!passwordValidation.isValid) {
      throw new ValidationError({ password: passwordValidation.message as string });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(
      userData.password,
      config.auth.saltRounds
    );

    // Create user
    const user = await this.userRepository.create({
      email: userData.email,
      passwordHash,
      fullName: userData.fullName,
      phoneNumber: userData.phoneNumber,
      userType: UserType.LISTENER,
      isActive: true,
    });

    // Generate tokens
    const token = this.generateToken(user);
    const refreshToken = this.generateRefreshToken(user);

    // Return auth response
    return {
      user: this.sanitizeUser(user),
      token,
      refreshToken,
      expiresIn: this.getTokenExpiryTime(),
    };
  }

  /**
   * Login user
   */
  async login(email: string, password: string): Promise<AuthResponse> {
    // Find user by email
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedError('Invalid email or password');
    }

    // Check if user is active
    if (!user.isActive) {
      throw new UnauthorizedError('Your account is inactive');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid email or password');
    }

    // Find user with relations
    const userWithRelations = await this.userRepository.findWithRelations(user.id);

    // Generate tokens
    const token = this.generateToken(user);
    const refreshToken = this.generateRefreshToken(user);

    // Return auth response
    return {
      user: this.sanitizeUser(userWithRelations || user),
      token,
      refreshToken,
      expiresIn: this.getTokenExpiryTime(),
    };
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    try {
      // Verify refresh token
      const decoded = jwt.verify(
        refreshToken,
        config.auth.refreshTokenSecret
      ) as { userId: number };

      // Find user
      const user = await this.userRepository.findById(decoded.userId);
      if (!user || !user.isActive) {
        throw new UnauthorizedError('Invalid refresh token');
      }

      // Generate new tokens
      const newToken = this.generateToken(user);
      const newRefreshToken = this.generateRefreshToken(user);

      // Return auth response
      return {
        user: this.sanitizeUser(user),
        token: newToken,
        refreshToken: newRefreshToken,
        expiresIn: this.getTokenExpiryTime(),
      };
    } catch (error) {
      throw new UnauthorizedError('Invalid refresh token');
    }
  }

  /**
   * Verify JWT token
   */
  async verifyToken(token: string): Promise<number> {
    try {
      // Verify token
      const decoded = jwt.verify(token, config.auth.jwtSecret) as {
        userId: number;
      };

      // Return user ID
      return decoded.userId;
    } catch (error) {
      throw new UnauthorizedError('Invalid token');
    }
  }

  /**
   * Change user password
   */
  async changePassword(
    userId: number,
    currentPassword: string,
    newPassword: string
  ): Promise<boolean> {
    // Find user
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.passwordHash
    );
    if (!isPasswordValid) {
      throw new ValidationError({ currentPassword: 'Current password is incorrect' });
    }

    // Validate new password
    const passwordValidation = this.validatePassword(newPassword);
    if (!passwordValidation.isValid) {
      throw new ValidationError({ newPassword: passwordValidation.message as string });
    }

    // Hash new password
    const passwordHash = await bcrypt.hash(
      newPassword,
      config.auth.saltRounds
    );

    // Update user
    await this.userRepository.update(userId, { passwordHash });

    return true;
  }

  /**
   * Reset password with token
   */
  async resetPassword(token: string, newPassword: string): Promise<boolean> {
    try {
      // Verify reset token
      // In a real implementation, the reset token would be stored in the database
      // For simplicity, we're using a JWT for this example
      const decoded = jwt.verify(
        token,
        config.auth.jwtSecret + '-reset'
      ) as { userId: number };

      // Find user
      const user = await this.userRepository.findById(decoded.userId);
      if (!user) {
        throw new NotFoundError('User not found');
      }

      // Validate new password
      const passwordValidation = this.validatePassword(newPassword);
      if (!passwordValidation.isValid) {
        throw new ValidationError({ newPassword: passwordValidation.message as string });
      }

      // Hash new password
      const passwordHash = await bcrypt.hash(
        newPassword,
        config.auth.saltRounds
      );

      // Update user
      await this.userRepository.update(user.id, { passwordHash });

      return true;
    } catch (error) {
      if (error instanceof ValidationError) {
        throw error;
      }
      throw new UnauthorizedError('Invalid or expired reset token');
    }
  }

  /**
   * Generate password reset token
   */
  async generatePasswordResetToken(
    email: string
  ): Promise<{ token: string; email: string } | null> {
    // Find user by email
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      return null;
    }

    // Generate token
    const token = jwt.sign(
      { userId: user.id },
      config.auth.jwtSecret + '-reset',
      { expiresIn: config.auth.passwordResetExpiry + 'h' }
    );

    return { token, email: user.email };
  }

  /**
   * Validate password strength
   */
  validatePassword(password: string): { isValid: boolean; message?: string } {
    // Check minimum length
    if (password.length < config.auth.passwordMinLength) {
      return {
        isValid: false,
        message: `Password must be at least ${config.auth.passwordMinLength} characters long`,
      };
    }

    // Check for uppercase if required
    if (
      config.auth.passwordRequireUppercase &&
      !/[A-Z]/.test(password)
    ) {
      return {
        isValid: false,
        message: 'Password must contain at least one uppercase letter',
      };
    }

    // Check for numbers if required
    if (
      config.auth.passwordRequireNumbers &&
      !/[0-9]/.test(password)
    ) {
      return {
        isValid: false,
        message: 'Password must contain at least one number',
      };
    }

    // Check for symbols if required
    if (
      config.auth.passwordRequireSymbols &&
      !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    ) {
      return {
        isValid: false,
        message: 'Password must contain at least one special character',
      };
    }

    return { isValid: true };
  }

  /**
   * Generate JWT token
   */
  private generateToken(user: User): string {
    return jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.userType,
      },
      config.auth.jwtSecret,
      {
        expiresIn: config.auth.jwtExpiresIn,
      }
    );
  }

  /**
   * Generate refresh token
   */
  private generateRefreshToken(user: User): string {
    return jwt.sign(
      { userId: user.id },
      config.auth.refreshTokenSecret,
      { expiresIn: config.auth.refreshTokenExpiresIn }
    );
  }

  /**
   * Get token expiry time in seconds
   */
  private getTokenExpiryTime(): number {
    // Parse jwt expiry string (e.g., '1d', '1h') and convert to seconds
    const expiresIn = config.auth.jwtExpiresIn;
    const unit = expiresIn.charAt(expiresIn.length - 1);
    const value = parseInt(expiresIn.slice(0, -1));

    if (unit === 'd') return value * 24 * 60 * 60;
    if (unit === 'h') return value * 60 * 60;
    if (unit === 'm') return value * 60;
    return parseInt(expiresIn);
  }

  /**
   * Remove sensitive data from user object
   */
  private sanitizeUser(user: User): Partial<User> {
    const sanitized = { ...user.toJSON() };
    delete sanitized.passwordHash;
    return sanitized;
  }
}

export default AuthService;