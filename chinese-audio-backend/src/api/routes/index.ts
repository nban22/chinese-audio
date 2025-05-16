// backend/src/api/routes/index.ts
import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import artistRoutes from './artist.routes';
import audioRoutes from './audio.routes';
import playlistRoutes from './playlist.routes';
import courseRoutes from './course.routes';
import adminRoutes from './admin.routes';
import paymentRoutes from './payment.routes';

// Create router
const router = Router();

// Register all routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/artists', artistRoutes);
router.use('/audios', audioRoutes);
router.use('/playlists', playlistRoutes);
router.use('/courses', courseRoutes);
router.use('/admin', adminRoutes);
router.use('/payments', paymentRoutes);

export default router;