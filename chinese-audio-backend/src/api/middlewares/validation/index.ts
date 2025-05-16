// backend/src/api/middlewares/validation/index.ts
import userValidation from './userValidation';
import audioValidation from './audioValidation';
import artistValidation from './artistValidation';
import adminValidation from './adminValidation';
import courseValidation from './courseValidation';
import playlistValidation from './playlistValidation';
import paymentValidation from './paymentValidation';

export {
  userValidation,
  audioValidation,
  artistValidation,
  adminValidation,
  courseValidation,
  playlistValidation,
  paymentValidation
};

export default {
  userValidation,
  audioValidation,
  artistValidation,
  adminValidation,
  courseValidation,
  playlistValidation,
  paymentValidation
};