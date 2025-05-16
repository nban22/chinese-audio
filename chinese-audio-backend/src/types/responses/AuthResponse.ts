// backend/src/types/responses/AuthResponse.ts
import { IUserDetails } from '../models/User';

/**
 * Authentication response interface
 */
export interface IAuthResponse {
  user: IUserDetails;
  tokens: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  };
}

/**
 * Token response interface
 */
export interface ITokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

/**
 * Forgot password response
 */
export interface IForgotPasswordResponse {
  message: string;
  email: string;
  expiresIn: number;
}

/**
 * Reset password response
 */
export interface IResetPasswordResponse {
  message: string;
  success: boolean;
}

/**
 * Change password response
 */
export interface IChangePasswordResponse {
  message: string;
  success: boolean;
}

/**
 * Email verification response
 */
export interface IVerifyEmailResponse {
  message: string;
  verified: boolean;
}

/**
 * Two-factor authentication setup response
 */
export interface ITwoFactorSetupResponse {
  message: string;
  enabled: boolean;
  secretKey?: string;
  qrCodeUrl?: string;
  scratchCodes?: string[];
}

/**
 * Two-factor authentication verify response
 */
export interface ITwoFactorVerifyResponse {
  message: string;
  verified: boolean;
  tokens?: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  };
}

/**
 * Logout response
 */
export interface ILogoutResponse {
  message: string;
  success: boolean;
}