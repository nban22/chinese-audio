// backend/src/db/models/feedback.model.ts
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
  Default,
  BeforeCreate,
  BeforeUpdate,
} from 'sequelize-typescript';
import { User } from './user.model';
import { Audio } from './audio.model';
import { Artist } from './artist.model';

export enum FeedbackType {
  BUG = 'bug',
  SUGGESTION = 'suggestion',
  CONTENT_ISSUE = 'content_issue',
  OTHER = 'other',
}

@Table({
  tableName: 'feedbacks',
  timestamps: true,
})
export class Feedback extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId!: number;

  @ForeignKey(() => Audio)
  @Column(DataType.INTEGER)
  audioId?: number;

  @ForeignKey(() => Artist)
  @Column(DataType.INTEGER)
  artistId?: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content!: string;

  @Column({
    type: DataType.ENUM(...Object.values(FeedbackType)),
    allowNull: false,
  })
  feedbackType!: FeedbackType;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  isResolved!: boolean;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  // Relationships
  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Audio)
  audio?: Audio;

  @BelongsTo(() => Artist)
  artist?: Artist;

  // Validations
  @BeforeCreate
  @BeforeUpdate
  static validateTargetExists(feedback: Feedback) {
    if (!feedback.audioId && !feedback.artistId) {
      throw new Error('Feedback must be related to either an audio or an artist');
    }
  }
}

export default Feedback;