// backend/src/api/middlewares/index.ts
import authMiddleware from './auth';
import { userValidation, audioValidation } from './validation';
import { errorHandler, notFoundHandler } from './error';

export {
  authMiddleware,
  userValidation,
  audioValidation,
  errorHandler,
  notFoundHandler
};

export default {
  auth: authMiddleware,
  validation: {
    userValidation,
    audioValidation
  },
  error: {
    errorHandler,
    notFoundHandler
  }
};