// backend/src/api/routes/audio.routes.ts
import { Router } from 'express';
import { controllers } from '../controllers';
import authMiddleware from '../middlewares/auth/authMiddleware';
import { audioValidation } from '../middlewares/validation';

const router = Router();
const { audioController } = controllers;

/**
 * @route   PUT /api/audios/:id
 * @desc    Update audio
 * @access  Private (Owner or Admin)
 */
router.put(
  '/:id',
  authMiddleware.authenticate,
  audioValidation.updateAudio,
  audioController.updateAudio.bind(audioController)
);

/**
 * @route   DELETE /api/audios/:id
 * @desc    Delete audio
 * @access  Private (Owner or Admin)
 */
router.delete(
  '/:id',
  authMiddleware.authenticate,
  audioController.deleteAudio.bind(audioController)
);

/**
 * @route   POST /api/audios/:id/transcripts
 * @desc    Add transcript to audio
 * @access  Private (Owner or Admin)
 */
router.post(
  '/:id/transcripts',
  authMiddleware.authenticate,
  audioValidation.addTranscript,
  audioController.addTranscript.bind(audioController)
);

/**
 * @route   PUT /api/audios/transcripts/:id
 * @desc    Update transcript
 * @access  Private (Owner or Admin)
 */
router.put(
  '/transcripts/:id',
  authMiddleware.authenticate,
  audioValidation.updateTranscript,
  audioController.updateTranscript.bind(audioController)
);

/**
 * @route   DELETE /api/audios/transcripts/:id
 * @desc    Delete transcript
 * @access  Private (Owner or Admin)
 */
router.delete(
  '/transcripts/:id',
  authMiddleware.authenticate,
  audioController.deleteTranscript.bind(audioController)
);

export default router;