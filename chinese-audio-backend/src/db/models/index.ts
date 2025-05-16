// backend/src/db/models/index.ts
// Import all models
import { User, UserType } from './user.model';
import { Artist } from './artist.model';
import { Admin, AdminLevel } from './admin.model';
import { Audio, AudioQualityLevel } from './audio.model';
import { AudioTranscript } from './audioTranscript.model';
import { Playlist } from './playlist.model';
import { PlaylistAudio } from './playlistAudio.model';
import { Course, CourseDifficultyLevel } from './course.model';
import { CourseAudio } from './courseAudio.model';
import { Category } from './category.model';
import { Tag } from './tag.model';
import { AudioTag } from './audioTag.model';
import { UserAudio } from './userAudio.model';
import { Like } from './like.model';
import { Follow } from './follow.model';
import { Rating } from './rating.model';
import { Feedback, FeedbackType } from './feedback.model';
import { Subscription, SubscriptionType, SubscriptionStatus } from './subscription.model';
import { Transaction, PaymentMethod, TransactionStatus } from './transaction.model';
import { Coupon } from './coupon.model';
import { ArtistVerification, VerificationStatus } from './artistVerification.model';
import { Role } from './role.model';
import { AdminRole } from './adminRole.model';

// Define associations between models
const setupAssociations = () => {
  // User associations
  User.hasOne(Artist, { foreignKey: 'userId' });
  User.hasOne(Admin, { foreignKey: 'userId' });
  User.hasMany(Playlist, { foreignKey: 'userId' });
  User.hasMany(UserAudio, { foreignKey: 'userId' });
  User.hasMany(Like, { foreignKey: 'userId' });
  User.hasMany(Rating, { foreignKey: 'userId' });
  User.hasMany(Follow, { foreignKey: 'userId' });
  User.hasMany(Feedback, { foreignKey: 'userId' });
  User.hasMany(Subscription, { foreignKey: 'userId' });

  // Artist associations
  Artist.belongsTo(User, { foreignKey: 'userId' });
  Artist.hasMany(Audio, { foreignKey: 'artistId' });
  Artist.hasMany(Course, { foreignKey: 'artistId' });
  Artist.hasMany(Follow, { foreignKey: 'artistId' });
  Artist.hasMany(Feedback, { foreignKey: 'artistId' });
  Artist.hasMany(ArtistVerification, { foreignKey: 'artistId' });

  // Admin associations
  Admin.belongsTo(User, { foreignKey: 'userId' });
  Admin.hasMany(Playlist, { foreignKey: 'adminId' });
  Admin.hasMany(ArtistVerification, { foreignKey: 'adminId' });
  Admin.hasMany(Coupon, { foreignKey: 'adminId' });
  Admin.belongsToMany(Role, { through: AdminRole, foreignKey: 'adminId' });

  // Audio associations
  Audio.belongsTo(Artist, { foreignKey: 'artistId' });
  Audio.belongsTo(Category, { foreignKey: 'categoryId' });
  Audio.hasMany(AudioTranscript, { foreignKey: 'audioId' });
  Audio.hasMany(PlaylistAudio, { foreignKey: 'audioId' });
  Audio.hasMany(CourseAudio, { foreignKey: 'audioId' });
  Audio.hasMany(UserAudio, { foreignKey: 'audioId' });
  Audio.hasMany(Like, { foreignKey: 'audioId' });
  Audio.hasMany(Rating, { foreignKey: 'audioId' });
  Audio.hasMany(Feedback, { foreignKey: 'audioId' });
  Audio.belongsToMany(Tag, { through: AudioTag, foreignKey: 'audioId' });

  // AudioTranscript associations
  AudioTranscript.belongsTo(Audio, { foreignKey: 'audioId' });

  // Playlist associations
  Playlist.belongsTo(User, { foreignKey: 'userId' });
  Playlist.belongsTo(Admin, { foreignKey: 'adminId' });
  Playlist.hasMany(PlaylistAudio, { foreignKey: 'playlistId' });

  // PlaylistAudio associations
  PlaylistAudio.belongsTo(Playlist, { foreignKey: 'playlistId' });
  PlaylistAudio.belongsTo(Audio, { foreignKey: 'audioId' });

  // Course associations
  Course.belongsTo(Artist, { foreignKey: 'artistId' });
  Course.belongsTo(Category, { foreignKey: 'categoryId' });
  Course.hasMany(CourseAudio, { foreignKey: 'courseId' });

  // CourseAudio associations
  CourseAudio.belongsTo(Course, { foreignKey: 'courseId' });
  CourseAudio.belongsTo(Audio, { foreignKey: 'audioId' });

  // Category associations
  Category.belongsTo(Category, { foreignKey: 'parentCategoryId', as: 'parentCategory' });
  Category.hasMany(Category, { foreignKey: 'parentCategoryId', as: 'subcategories' });
  Category.hasMany(Audio, { foreignKey: 'categoryId' });
  Category.hasMany(Course, { foreignKey: 'categoryId' });

  // Tag associations
  Tag.belongsToMany(Audio, { through: AudioTag, foreignKey: 'tagId' });

  // AudioTag associations
  AudioTag.belongsTo(Audio, { foreignKey: 'audioId' });
  AudioTag.belongsTo(Tag, { foreignKey: 'tagId' });

  // UserAudio associations
  UserAudio.belongsTo(User, { foreignKey: 'userId' });
  UserAudio.belongsTo(Audio, { foreignKey: 'audioId' });

  // Like associations
  Like.belongsTo(User, { foreignKey: 'userId' });
  Like.belongsTo(Audio, { foreignKey: 'audioId' });

  // Follow associations
  Follow.belongsTo(User, { foreignKey: 'userId' });
  Follow.belongsTo(Artist, { foreignKey: 'artistId' });

  // Rating associations
  Rating.belongsTo(User, { foreignKey: 'userId' });
  Rating.belongsTo(Audio, { foreignKey: 'audioId' });

  // Feedback associations
  Feedback.belongsTo(User, { foreignKey: 'userId' });
  Feedback.belongsTo(Audio, { foreignKey: 'audioId' });
  Feedback.belongsTo(Artist, { foreignKey: 'artistId' });

  // Subscription associations
  Subscription.belongsTo(User, { foreignKey: 'userId' });
  Subscription.hasMany(Transaction, { foreignKey: 'subscriptionId' });

  // Transaction associations
  Transaction.belongsTo(Subscription, { foreignKey: 'subscriptionId' });
  Transaction.belongsTo(Coupon, { foreignKey: 'couponId' });

  // Coupon associations
  Coupon.belongsTo(Admin, { foreignKey: 'adminId' });
  Coupon.hasMany(Transaction, { foreignKey: 'couponId' });

  // ArtistVerification associations
  ArtistVerification.belongsTo(Artist, { foreignKey: 'artistId' });
  ArtistVerification.belongsTo(Admin, { foreignKey: 'adminId' });

  // Role associations
  Role.belongsToMany(Admin, { through: AdminRole, foreignKey: 'roleId' });

  // AdminRole associations
  AdminRole.belongsTo(Admin, { foreignKey: 'adminId' });
  AdminRole.belongsTo(Role, { foreignKey: 'roleId' });
};

// Call setupAssociations to configure all model relationships
setupAssociations();

// Export all models and enums
export {
  // Models
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
  
  // Enums
  UserType,
  AdminLevel,
  AudioQualityLevel,
  CourseDifficultyLevel,
  FeedbackType,
  SubscriptionType,
  SubscriptionStatus,
  PaymentMethod,
  TransactionStatus,
  VerificationStatus,
  
  // Association setup
  setupAssociations,
};

export default {
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
};