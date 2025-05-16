// backend/src/db/repositories/index.ts
import { BaseRepository } from './base/BaseRepository';
import { IBaseRepository } from './base/IBaseRepository';

import { UserRepository } from './user/UserRepository';
import { IUserRepository } from './user/IUserRepository';

import { ArtistRepository } from './artist/ArtistRepository';
import { IArtistRepository } from './artist/IArtistRepository';

import { AudioRepository } from './audio/AudioRepository';
import { IAudioRepository } from './audio/IAudioRepository';

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
};

// Factory function to create repositories (useful for dependency injection)
export const createRepositories = () => {
  return {
    userRepository: new UserRepository(),
    artistRepository: new ArtistRepository(),
    audioRepository: new AudioRepository(),
  };
};

export default {
  BaseRepository,
  UserRepository,
  ArtistRepository,
  AudioRepository,
  createRepositories,
};