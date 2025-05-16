// backend/src/api/routes/playlist.routes.ts
import { Router } from 'express';
import { controllers } from '../controllers';
import authMiddleware from '../middlewares/auth/authMiddleware';
import { playlistValidation } from '../middlewares/validation';

const router = Router();
const { playlistController } = controllers;

/**
 * @route   GET /api/playlists
 * @desc    Get all playlists with pagination and filtering
 * @access  Public
 */
router.get(
  '/',
  authMiddleware.optionalAuth,
  playlistController.getAllPlaylists.bind(playlistController)
);

/**
 * @route   GET /api/playlists/:id
 * @desc    Get playlist by ID
 * @access  Public/Private (depends on playlist visibility)
 */
router.get(
  '/:id',
  authMiddleware.optionalAuth,
  playlistController.getPlaylistById.bind(playlistController)
);

/**
 * @route   POST /api/playlists
 * @desc    Create new playlist
 * @access  Private
 */
router.post(
  '/',
  authMiddleware.authenticate,
  playlistValidation.createPlaylist,
  playlistController.createPlaylist.bind(playlistController)
);

/**
 * @route   PUT /api/playlists/:id
 * @desc    Update playlist
 * @access  Private (Owner or Admin)
 */
router.put(
  '/:id',
  authMiddleware.authenticate,
  playlistValidation.updatePlaylist,
  playlistController.updatePlaylist.bind(playlistController)
);

/**
 * @route   DELETE /api/playlists/:id
 * @desc    Delete playlist
 * @access  Private (Owner or Admin)
 */
router.delete(
  '/:id',
  authMiddleware.authenticate,
  playlistController.deletePlaylist.bind(playlistController)
);

/**
 * @route   POST /api/playlists/:id/audios
 * @desc    Add audio to playlist
 * @access  Private (Owner or Admin)
 */
router.post(
  '/:id/audios',
  authMiddleware.authenticate,
  playlistValidation.addAudioToPlaylist,
  playlistController.addAudioToPlaylist.bind(playlistController)
);

/**
 * @route   DELETE /api/playlists/:id/audios/:audioId
 * @desc    Remove audio from playlist
 * @access  Private (Owner or Admin)
 */
router.delete(
  '/:id/audios/:audioId',
  authMiddleware.authenticate,
  playlistController.removeAudioFromPlaylist.bind(playlistController)
);

/**
 * @route   PUT /api/playlists/:id/audios/:audioId/reorder
 * @desc    Reorder audio in playlist
 * @access  Private (Owner or Admin)
 */
router.put(
  '/:id/audios/:audioId/reorder',
  authMiddleware.authenticate,
  playlistValidation.reorderPlaylistAudio,
  playlistController.reorderPlaylistAudio.bind(playlistController)
);

export default router;