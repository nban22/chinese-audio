// backend/src/db/models/audio.model.ts
import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
  HasMany,
  Default,
  BelongsToMany,
} from 'sequelize-typescript';
import { Artist } from './artist.model';
import { Category } from './category.model';
import { AudioTranscript } from './audioTranscript.model';
import { PlaylistAudio } from './playlistAudio.model';
import { CourseAudio } from './courseAudio.model';
import { UserAudio } from './userAudio.model';
import { Like } from './like.model';
import { Rating } from './rating.model';
import { Feedback } from './feedback.model';
import { Tag } from './tag.model';
import { AudioTag } from './audioTag.model';

export enum AudioQualityLevel {
  STANDARD = 'standard',
  HIGH = 'high',
  PREMIUM = 'premium',
}

@Table({
  tableName: 'audios',
  timestamps: true,
})
export class Audio extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => Artist)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  artistId!: number;

  @ForeignKey(() => Category)
  @Column(DataType.INTEGER)
  categoryId?: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string;

  @Column(DataType.TEXT)
  description?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  dropboxUrl!: string;

  @Column(DataType.STRING)
  coverImage?: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    comment: 'Duration in seconds',
  })
  duration!: number;

  @Default(AudioQualityLevel.STANDARD)
  @Column({
    type: DataType.ENUM(...Object.values(AudioQualityLevel)),
    allowNull: false,
  })
  qualityLevel!: AudioQualityLevel;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  isPremium!: boolean;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  isDownloadable!: boolean;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  isApproved!: boolean;

  @CreatedAt
  @Column({
    field: 'upload_date',
  })
  uploadDate!: Date;

  @UpdatedAt
  updatedAt!: Date;

  // Relationships
  @BelongsTo(() => Artist)
  artist!: Artist;

  @BelongsTo(() => Category)
  category?: Category;

  @HasMany(() => AudioTranscript)
  transcripts?: AudioTranscript[];

  @HasMany(() => PlaylistAudio)
  playlistAudios?: PlaylistAudio[];

  @HasMany(() => CourseAudio)
  courseAudios?: CourseAudio[];

  @HasMany(() => UserAudio)
  userAudios?: UserAudio[];

  @HasMany(() => Like)
  likes?: Like[];

  @HasMany(() => Rating)
  ratings?: Rating[];

  @HasMany(() => Feedback)
  feedbacks?: Feedback[];

  @BelongsToMany(() => Tag, () => AudioTag)
  tags?: Tag[];

  // Getter methods for virtual fields
  get averageRating(): number | null {
    if (!this.ratings || this.ratings.length === 0) {
      return null;
    }
    
    const sum = this.ratings.reduce((total, rating) => total + rating.ratingValue, 0);
    return sum / this.ratings.length;
  }

  get likesCount(): number {
    return this.likes?.length || 0;
  }
}

export default Audio;