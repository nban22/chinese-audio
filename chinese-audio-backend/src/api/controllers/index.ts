// backend/src/api/controllers/index.ts
import { AuthController } from './auth';
import { UserController } from './user';
import { ArtistController } from './artist';
import { AudioController } from './audio';
import { PlaylistController } from './playlist';
import { CourseController } from './course';
import { AdminController } from './admin';
import { PaymentController } from './payment';

import { services } from '../../services';

// Create controller instances with dependencies
const authController = new AuthController(services.authService);
const userController = new UserController(services.userService);
const artistController = new ArtistController(services.artistService, services.audioService);
const audioController = new AudioController(services.audioService);
const playlistController = new PlaylistController(services.playlistService);
const courseController = new CourseController(services.courseService);
const adminController = new AdminController(services.adminService, services.userService, services.artistService);
const paymentController = new PaymentController(services.paymentService);

// Export controller instances
export const controllers = {
  authController,
  userController,
  artistController,
  audioController,
  playlistController,
  courseController,
  adminController,
  paymentController,
};

// Export controller classes
export {
  AuthController,
  UserController,
  ArtistController,
  AudioController,
  PlaylistController,
  CourseController,
  AdminController,
  PaymentController,
};

export default controllers;