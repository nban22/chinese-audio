// src/services/playlist/IPlaylistService.ts
import { PaginationResult, PaginationOptions } from '../../types/pagination';

export interface PlaylistCreateData {
  title: string;
  description?: string;
  isPublic: boolean;
  userId: number;
  isEditorial: boolean;
  coverImage?: string;
}

export interface PlaylistUpdateData {
  title?: string;
  description?: string;
  isPublic?: boolean;
  isEditorial?: boolean;
  coverImage?: string;
}

export interface IPlaylistService {
  getAllPlaylists(options: PaginationOptions, filters?: any): Promise<PaginationResult<any>>;
  getPlaylistById(playlistId: number): Promise<any>;
  getPlaylistsByUserId(userId: number, options: PaginationOptions, filters?: any): Promise<PaginationResult<any>>;
  createPlaylist(playlistData: PlaylistCreateData): Promise<any>;
  updatePlaylist(playlistId: number, updateData: PlaylistUpdateData): Promise<any>;
  deletePlaylist(playlistId: number): Promise<boolean>;
  addAudioToPlaylist(playlistId: number, audioId: number, position?: number): Promise<any>;
  removeAudioFromPlaylist(playlistId: number, audioId: number): Promise<boolean>;
  reorderPlaylistAudio(playlistId: number, audioId: number, newPosition: number): Promise<boolean>;
}
