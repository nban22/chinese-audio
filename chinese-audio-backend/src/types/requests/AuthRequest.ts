// backend/src/types/requests/AuthRequest.ts
/**
 * User registration request interface
 */
export interface IRegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  phoneNumber?: string;
  userType?: 'listener' | 'artist';
  bio?: string;
  contactInfo?: string;
  acceptTerms: boolean;
}

/**
 * User login request interface
 */
export interface ILoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

/**
 * Refresh token request interface
 */
export interface IRefreshTokenRequest {
  refreshToken: string;
}

/**
 * Forgot password request interface
 */
export interface IForgotPasswordRequest {
  email: string;
}

/**
 * Reset password request interface
 */
export interface IResetPasswordRequest {
  token: string;
  password: string;
  confirmPassword: string;
}

/**
 * Change password request interface
 */
export interface IChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

/**
 * Email verification request interface
 */
export interface IVerifyEmailRequest {
  token: string;
}

/**
 * Social authentication request interface
 */
export interface ISocialAuthRequest {
  provider: 'google' | 'facebook';
  token: string;
  userData?: {
    email?: string;
    fullName?: string;
    profileImage?: string;
  };
}

/**
 * Logout request interface
 */
export interface ILogoutRequest {
  refreshToken?: string;
  allDevices?: boolean;
}

/**
 * Two-factor authentication setup request
 */
export interface ITwoFactorSetupRequest {
  enable: boolean;
  token?: string;
}

/**
 * Two-factor authentication verify request
 */
export interface ITwoFactorVerifyRequest {
  token: string;
  rememberDevice?: boolean;
}