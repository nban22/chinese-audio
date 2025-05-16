// backend/src/db/models/user.model.ts
import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
  Unique,
  Default,
  HasMany,
  HasOne,
} from 'sequelize-typescript';
import { Artist } from './artist.model';
import { Admin } from './admin.model';
import { Playlist } from './playlist.model';
import { UserAudio } from './userAudio.model';
import { Like } from './like.model';
import { Rating } from './rating.model';
import { Follow } from './follow.model';
import { Feedback } from './feedback.model';
import { Subscription } from './subscription.model';

export enum UserType {
  LISTENER = 'listener',
  ARTIST = 'artist',
  ADMIN = 'admin',
}

@Table({
  tableName: 'users',
  timestamps: true,
})
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Unique
  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  passwordHash!: string;

  @Column(DataType.STRING)
  phoneNumber?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  fullName!: string;

  @Column(DataType.STRING)
  profileImage?: string;

  @Default(UserType.LISTENER)
  @Column({
    type: DataType.ENUM(...Object.values(UserType)),
    allowNull: false,
  })
  userType!: UserType;

  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  isActive!: boolean;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  // Relationships
  @HasOne(() => Artist)
  artist?: Artist;

  @HasOne(() => Admin)
  admin?: Admin;

  @HasMany(() => Playlist)
  playlists?: Playlist[];

  @HasMany(() => UserAudio)
  userAudios?: UserAudio[];

  @HasMany(() => Like)
  likes?: Like[];

  @HasMany(() => Rating)
  ratings?: Rating[];

  @HasMany(() => Follow)
  follows?: Follow[];

  @HasMany(() => Feedback)
  feedbacks?: Feedback[];

  @HasMany(() => Subscription)
  subscriptions?: Subscription[];
}

export default User;