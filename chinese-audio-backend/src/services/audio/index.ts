// backend/src/services/audio/index.ts
import { AudioService } from './AudioService';
import { IAudioService } from './IAudioService';

export {
  AudioService,
  IAudioService
};

/**
 * Factory function to create an AudioService instance
 * Note: This is useful for dependency injection
 */
export const createAudioService = (
  audioRepository: any,
  dropboxService: any
): IAudioService => {
  return new AudioService(audioRepository, dropboxService);
};

export default {
  AudioService,
  createAudioService
};