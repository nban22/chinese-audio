// backend/src/types/models/User.ts
import { UserType } from '../../db/models/user.model';

/**
 * User model interface
 */
export interface IUser {
  id: number;
  email: string;
  passwordHash: string;
  phoneNumber?: string;
  fullName: string;
  profileImage?: string;
  userType: UserType;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * User creation input interface
 */
export interface IUserCreateInput {
  email: string;
  password: string;
  phoneNumber?: string;
  fullName: string;
  profileImage?: string;
  userType?: UserType;
  isActive?: boolean;
}

/**
 * User update input interface
 */
export interface IUserUpdateInput {
  email?: string;
  phoneNumber?: string;
  fullName?: string;
  profileImage?: string;
  isActive?: boolean;
}

/**
 * User password change interface
 */
export interface IUserPasswordChange {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

/**
 * User details with sensitive data removed
 * For returned data to the client
 */
export interface IUserDetails {
  id: number;
  email: string;
  phoneNumber?: string;
  fullName: string;
  profileImage?: string;
  userType: UserType;
  isActive: boolean;
  createdAt: Date;
  artistId?: number;
  adminId?: number;
}