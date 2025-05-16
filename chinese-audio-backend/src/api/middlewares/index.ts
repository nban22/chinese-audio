// backend/src/api/middlewares/index.ts
import authMiddleware from './auth';
import { userValidation, audioValidation, adminValidation, courseValidation, paymentValidation, playlistValidation, artistValidation } from './validation';
import { errorHandler, notFoundHandler } from './error';

export {
  authMiddleware,
  userValidation,
  audioValidation,
  adminValidation,
  courseValidation,
  paymentValidation,
  playlistValidation,
  artistValidation,
  errorHandler,
  notFoundHandler,
  
};

export default {
  auth: authMiddleware,
  validation: {
    userValidation,
    audioValidation,
    adminValidation,
    courseValidation,
    paymentValidation,
    playlistValidation,
    artistValidation
  },
  error: {
    errorHandler,
    notFoundHandler
  }
};