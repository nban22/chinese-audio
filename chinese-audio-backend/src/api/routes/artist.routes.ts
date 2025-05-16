// backend/src/api/routes/artist.routes.ts
import { Router } from 'express';
import { controllers } from '../controllers';
import { artistValidation } from '../middlewares/validation';
import authMiddleware from '../middlewares/auth/authMiddleware';

const router = Router();
const { artistController } = controllers;

/**
 * @route   GET /api/artists
 * @desc    Get all artists with pagination
 * @access  Public
 */
router.get(
  '/',
  artistController.getAllArtists.bind(artistController)
);

/**
 * @route   GET /api/artists/:id
 * @desc    Get artist by ID
 * @access  Public
 */
router.get(
  '/:id',
  artistController.getArtistById.bind(artistController)
);

/**
 * @route   GET /api/artists/verified
 * @desc    Get verified artists
 * @access  Public
 */
router.get(
  '/verified',
  artistController.getVerifiedArtists.bind(artistController)
);

/**
 * @route   GET /api/artists/popular
 * @desc    Get popular artists
 * @access  Public
 */
router.get(
  '/popular',
  artistController.getPopularArtists.bind(artistController)
);

/**
 * @route   GET /api/artists/search
 * @desc    Search artists
 * @access  Public
 */
router.get(
  '/search',
  artistController.searchArtists.bind(artistController)
);

/**
 * @route   POST /api/artists
 * @desc    Create artist profile
 * @access  Private
 */
router.post(
  '/',
  authMiddleware.authenticate,
  artistController.createArtist.bind(artistController)
);

/**
 * @route   PUT /api/artists/:id
 * @desc    Update artist profile
 * @access  Private (Owner or Admin)
 */
router.put(
  '/:id',
  authMiddleware.authenticate,
  artistController.updateArtist.bind(artistController)
);

/**
 * @route   PATCH /api/artists/:id/verify
 * @desc    Verify artist (admin only)
 * @access  Private (Admin only)
 */
router.patch(
  '/:id/verify',
  authMiddleware.authenticate,
  authMiddleware.requireAdmin,
  artistController.verifyArtist.bind(artistController)
);

/**
 * @route   GET /api/artists/pending
 * @desc    Get pending verification artists (admin only)
 * @access  Private (Admin only)
 */
router.get(
  '/pending',
  authMiddleware.authenticate,
  authMiddleware.requireAdmin,
  artistController.getPendingVerificationArtists.bind(artistController)
);

/**
 * @route   GET /api/artists/:id/audios
 * @desc    Get artist's audio files
 * @access  Public
 */
router.get(
  '/:id/audios',
  artistController.getArtistAudios.bind(artistController)
);

export default router;