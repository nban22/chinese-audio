// backend/src/db/models/playlist.model.ts
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
  BeforeCreate,
  BeforeUpdate,
} from 'sequelize-typescript';
import { User } from './user.model';
import { Admin } from './admin.model';
import { PlaylistAudio } from './playlistAudio.model';

@Table({
  tableName: 'playlists',
  timestamps: true,
})
export class Playlist extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId?: number;

  @ForeignKey(() => Admin)
  @Column(DataType.INTEGER)
  adminId?: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string;

  @Column(DataType.TEXT)
  description?: string;

  @Column(DataType.STRING)
  coverImage?: string;

  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  isPublic!: boolean;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  isEditorial!: boolean;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  // Relationships
  @BelongsTo(() => User)
  user?: User;

  @BelongsTo(() => Admin)
  admin?: Admin;

  @HasMany(() => PlaylistAudio)
  playlistAudios?: PlaylistAudio[];

  // Validations for custom check constraint
  @BeforeCreate
  @BeforeUpdate
  static validateOwnership(playlist: Playlist) {
    if ((playlist.userId && playlist.adminId) || (!playlist.userId && !playlist.adminId)) {
      throw new Error('Playlist must have either a user or an admin, but not both');
    }
  }
}

export default Playlist;