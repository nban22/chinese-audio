// src/db/repositories/index.ts
import { BaseRepository } from './base/BaseRepository';
import { IBaseRepository } from './base/IBaseRepository';

import { UserRepository } from './user/UserRepository';
import { IUserRepository } from './user/IUserRepository';

import { ArtistRepository } from './artist/ArtistRepository';
import { IArtistRepository } from './artist/IArtistRepository';

import { AudioRepository } from './audio/AudioRepository';
import { IAudioRepository } from './audio/IAudioRepository';

import { PlaylistRepository } from './playlist/PlaylistRepository';
import { IPlaylistRepository } from './playlist/IPlaylistRepository';

import { PlaylistAudioRepository } from './playlistAudio/PlaylistAudioRepository';
import { IPlaylistAudioRepository } from './playlistAudio/IPlaylistAudioRepository';

import { CourseRepository } from './course/CourseRepository';
import { ICourseRepository } from './course/ICourseRepository';

import { CourseAudioRepository } from './courseAudio/CourseAudioRepository';
import { ICourseAudioRepository } from './courseAudio/ICourseAudioRepository';

import { FeedbackRepository } from './feedback/FeedbackRepository';
import { IFeedbackRepository } from './feedback/IFeedbackRepository';

import { CouponRepository } from './coupon/CouponRepository';
import { ICouponRepository } from './coupon/ICouponRepository';

import { TransactionRepository } from './transaction/TransactionRepository';
import { ITransactionRepository } from './transaction/ITransactionRepository';

import { SubscriptionRepository } from './subscription/SubscriptionRepository';
import { ISubscriptionRepository } from './subscription/ISubscriptionRepository';

// Export all repositories and interfaces
export {
  // Base
  BaseRepository,
  IBaseRepository,
  
  // User
  UserRepository,
  IUserRepository,
  
  // Artist
  ArtistRepository,
  IArtistRepository,
  
  // Audio
  AudioRepository,
  IAudioRepository,
  
  // Playlist
  PlaylistRepository,
  IPlaylistRepository,
  
  // PlaylistAudio
  PlaylistAudioRepository,
  IPlaylistAudioRepository,
  
  // Course
  CourseRepository,
  ICourseRepository,
  
  // CourseAudio
  CourseAudioRepository,
  ICourseAudioRepository,
  
  // Feedback
  FeedbackRepository,
  IFeedbackRepository,
  
  // Coupon
  CouponRepository,
  ICouponRepository,
  
  // Transaction
  TransactionRepository,
  ITransactionRepository,
  
  // Subscription
  SubscriptionRepository,
  ISubscriptionRepository,
};

// Create all repository instances
const userRepository = new UserRepository();
const artistRepository = new ArtistRepository();
const audioRepository = new AudioRepository();
const playlistRepository = new PlaylistRepository();
const playlistAudioRepository = new PlaylistAudioRepository();
const courseRepository = new CourseRepository();
const courseAudioRepository = new CourseAudioRepository();
const feedbackRepository = new FeedbackRepository();
const couponRepository = new CouponRepository();
const transactionRepository = new TransactionRepository();
const subscriptionRepository = new SubscriptionRepository();

// Export repositories as a single object (for dependency injection)
export const repositories = {
  userRepository,
  artistRepository,
  audioRepository,
  playlistRepository,
  playlistAudioRepository,
  courseRepository,
  courseAudioRepository,
  feedbackRepository,
  couponRepository,
  transactionRepository,
  subscriptionRepository,
};

export default repositories;