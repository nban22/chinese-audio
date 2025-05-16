// backend/src/api/middlewares/auth/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User, UserType } from '../../../db/models/user.model';
import { Artist } from '../../../db/models/artist.model';
import { Admin } from '../../../db/models/admin.model';
import ApiResponse from '../../../utils/response';
import config from '../../../config';
import { logger } from '../../../utils';

/**
 * Extended Request interface with user property
 */
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        role: UserType;
        artistId?: number; // Only for artists
        adminId?: number; // Only for admins
      };
    }
  }
}

/**
 * Token payload interface
 */
interface TokenPayload {
  userId: number;
  email: string;
  role: UserType;
}

/**
 * Authenticate user with JWT
 */
export const authenticate = async (
  req: Request, 
  res: Response, 
  next: NextFunction
): Promise<void | Response> => {
  try {
    // Get token from authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return ApiResponse.unauthorized(res, 'Authentication required');
    }
    
    const token = authHeader.split(' ')[1];
    
    // Verify token
    const decoded = jwt.verify(token, config.auth.jwtSecret) as TokenPayload;
    
    // Find user
    const user = await User.findByPk(decoded.userId);
    
    if (!user || !user.isActive) {
      logger.warn(`Auth attempt with valid token but inactive/deleted user ID: ${decoded.userId}`);
      return ApiResponse.unauthorized(res, 'User not found or inactive');
    }
    
    // Set user info on request object
    req.user = {
      id: user.id,
      email: user.email,
      role: user.userType,
    };
    
    // Add artistId if user is an artist
    if (user.userType === UserType.ARTIST) {
      const artist = await Artist.findOne({ where: { userId: user.id } });
      if (artist) {
        req.user.artistId = artist.id;
      }
    }
    
    // Add adminId if user is an admin
    if (user.userType === UserType.ADMIN) {
      const admin = await Admin.findOne({ where: { userId: user.id } });
      if (admin) {
        req.user.adminId = admin.id;
      }
    }
    
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      if (error.name === 'TokenExpiredError') {
        return ApiResponse.unauthorized(res, 'Token expired');
      }
      return ApiResponse.unauthorized(res, 'Invalid token');
    }
    
    logger.error('Authentication error:', error);
    return ApiResponse.error(res, 'Authentication failed');
  }
};

/**
 * Check if user is an artist
 */
export const requireArtist = (
  req: Request, 
  res: Response, 
  next: NextFunction
): void | Response => {
  if (!req.user) {
    return ApiResponse.unauthorized(res, 'Authentication required');
  }
  
  if (req.user.role !== UserType.ARTIST) {
    return ApiResponse.forbidden(res, 'Artist access required');
  }
  
  if (!req.user.artistId) {
    return ApiResponse.forbidden(res, 'Artist profile not found');
  }
  
  next();
};

/**
 * Check if user is an admin
 */
export const requireAdmin = (
  req: Request, 
  res: Response, 
  next: NextFunction
): void | Response => {
  if (!req.user) {
    return ApiResponse.unauthorized(res, 'Authentication required');
  }
  
  if (req.user.role !== UserType.ADMIN) {
    return ApiResponse.forbidden(res, 'Admin access required');
  }
  
  if (!req.user.adminId) {
    return ApiResponse.forbidden(res, 'Admin profile not found');
  }
  
  next();
};

/**
 * Optional authentication - will set user if token is valid but won't fail if not present
 */
export const optionalAuth = async (
  req: Request, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
  try {
    // Get token from authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      // No token, continue without user
      return next();
    }
    
    const token = authHeader.split(' ')[1];
    
    // Verify token
    const decoded = jwt.verify(token, config.auth.jwtSecret) as TokenPayload;
    
    // Find user
    const user = await User.findByPk(decoded.userId);
    
    if (!user || !user.isActive) {
      // Invalid user, continue without user
      return next();
    }
    
    // Set user info on request object
    req.user = {
      id: user.id,
      email: user.email,
      role: user.userType,
    };
    
    // Add artistId if user is an artist
    if (user.userType === UserType.ARTIST) {
      const artist = await Artist.findOne({ where: { userId: user.id } });
      if (artist) {
        req.user.artistId = artist.id;
      }
    }
    
    // Add adminId if user is an admin
    if (user.userType === UserType.ADMIN) {
      const admin = await Admin.findOne({ where: { userId: user.id } });
      if (admin) {
        req.user.adminId = admin.id;
      }
    }
    
    next();
  } catch (error) {
    // Any error means no authentication, but we continue
    next();
  }
};

export default {
  authenticate,
  requireArtist,
  requireAdmin,
  optionalAuth
};