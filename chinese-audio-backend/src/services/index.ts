import { AuthService, IAuthService } from './auth';
import { UserService, IUserService } from './user';
import { ArtistService, IArtistService } from './artist';
import { AudioService, IAudioService } from './audio';
import { DropboxService, IDropboxService } from './dropbox';
// import { PaymentService, IPaymentService } from './payment';

import { repositories } from '../db';
import config from '../config';
import PlaylistService from './playlist';
import CourseService from './course';
import AdminService from './admin';
import PaymentService from './payment';

// Create service instances with dependencies
const dropboxService = new DropboxService();
const authService = new AuthService(repositories.userRepository);
const userService = new UserService(repositories.userRepository);
const artistService = new ArtistService(
  repositories.artistRepository,
  repositories.userRepository,
  repositories.audioRepository
);
const audioService = new AudioService(
  repositories.audioRepository,
  dropboxService
);

const playlistService = new PlaylistService(
  repositories.playlistRepository,
  repositories.playlistAudioRepository,
  repositories.audioRepository
);

const courseService = new CourseService(
  repositories.courseRepository,
  repositories.courseAudioRepository,
  repositories.audioRepository
);

const adminService = new AdminService(
  repositories.courseRepository,
  repositories.feedbackRepository,
  repositories.couponRepository,
  repositories.transactionRepository,
  repositories.userRepository,
  repositories.audioRepository
);


const paymentService = new PaymentService(
  repositories.subscriptionRepository,
  repositories.transactionRepository,
  repositories.couponRepository
);

// Export service instances
export const services = {
  authService,
  userService,
  artistService,
  audioService,
  dropboxService,
  // paymentService,
};

// Export service types
export {
  IAuthService,
  IUserService,
  IArtistService,
  IAudioService,
  IDropboxService,
  // IPaymentService,
};

// Export service classes
export {
  AuthService,
  UserService,
  ArtistService,
  AudioService,
  DropboxService,
  // PaymentService,
};

export default services;