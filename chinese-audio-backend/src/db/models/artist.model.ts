// backend/src/db/models/artist.model.ts
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
  AllowNull,
  BeforeCreate,
  BeforeUpdate,
} from 'sequelize-typescript';
import { User } from './user.model';
import { Audio } from './audio.model';
import { Course } from './course.model';
import { Follow } from './follow.model';
import { Feedback } from './feedback.model';
import { ArtistVerification } from './artistVerification.model';

@Table({
  tableName: 'artists',
  timestamps: true,
})
export class Artist extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
  })
  userId!: number;

  @Column(DataType.TEXT)
  bio?: string;

  @Column(DataType.STRING)
  contactInfo?: string;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  isVerified!: boolean;

  @AllowNull
  @Column(DataType.DATE)
  verifiedAt?: Date;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  // Relationships
  @BelongsTo(() => User)
  user!: User;

  @HasMany(() => Audio)
  audios?: Audio[];

  @HasMany(() => Course)
  courses?: Course[];

  @HasMany(() => Follow)
  followers?: Follow[];

  @HasMany(() => Feedback)
  feedbacks?: Feedback[];

  @HasMany(() => ArtistVerification)
  verificationRequests?: ArtistVerification[];

  // Hooks
  @BeforeCreate
  @BeforeUpdate
  static updateVerifiedAt(instance: Artist): void {
    if (instance.isVerified && !instance.verifiedAt) {
      instance.verifiedAt = new Date();
    } else if (!instance.isVerified && instance.verifiedAt) {
      instance.verifiedAt = null as any;
    }
  }
}

export default Artist;