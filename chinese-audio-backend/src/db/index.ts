// backend/src/db/index.ts
import { Sequelize } from 'sequelize-typescript';
import config from '../config';
import logger from '../utils/logger';

// Import models
import { User } from './models/user.model';
import { Artist } from './models/artist.model';
import { Admin } from './models/admin.model';
import { Audio } from './models/audio.model';
import { AudioTranscript } from './models/audioTranscript.model';
import { Playlist } from './models/playlist.model';
import { PlaylistAudio } from './models/playlistAudio.model';
import { Course } from './models/course.model';
import { CourseAudio } from './models/courseAudio.model';
import { Category } from './models/category.model';
import { Tag } from './models/tag.model';
import { AudioTag } from './models/audioTag.model';
import { UserAudio } from './models/userAudio.model';
import { Like } from './models/like.model';
import { Follow } from './models/follow.model';
import { Rating } from './models/rating.model';
import { Feedback } from './models/feedback.model';
import { Subscription } from './models/subscription.model';
import { Transaction } from './models/transaction.model';
import { Coupon } from './models/coupon.model';
import { ArtistVerification } from './models/artistVerification.model';
import { Role } from './models/role.model';
import { AdminRole } from './models/adminRole.model';

console.log("Database models registered");

// Register models
const models = [
  User,
  Artist,
  Admin,
  Audio,
  AudioTranscript,
  Playlist,
  PlaylistAudio,
  Course,
  CourseAudio,
  Category,
  Tag,
  AudioTag,
  UserAudio,
  Like,
  Follow,
  Rating,
  Feedback,
  Subscription,
  Transaction,
  Coupon,
  ArtistVerification,
  Role,
  AdminRole,
];

// Create Sequelize instance
const sequelize = new Sequelize({
  dialect: config.database.dialect as any,
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.database,
  logging: config.database.logging ? (msg: string) => logger.debug(msg) : false,
  define: config.database.define,
  pool: config.database.pool,
  models: models, // Register models here
});

// Initialize repositories
import { createRepositories } from './repositories';
export const repositories = createRepositories();

// Export sequelize instance
export const getSequelize = () => sequelize;

// Initialize database
export const initDatabase = async (): Promise<void> => {
  try {
    // Test connection
    await sequelize.authenticate();

    await sequelize.sync({ force: false });
    logger.info('Database connection established successfully');

    // Sync database (in development only)
    if (process.env.NODE_ENV === 'development' && config.database.sync) {
      await sequelize.sync({ alter: config.database.syncAlter });
      logger.info('Database synchronized');
    }
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
    throw error;
  }
};  

// Close database connection
export const closeDatabase = async (): Promise<void> => {
  try {
    await sequelize.close();
    logger.info('Database connection closed');
  } catch (error) {
    logger.error('Error closing database connection:', error);
    throw error;
  }
};

export default sequelize;