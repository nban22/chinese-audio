// backend/src/db/models/playlistAudio.model.ts
import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  ForeignKey,
  BelongsTo,
  Unique,
} from 'sequelize-typescript';
import { Playlist } from './playlist.model';
import { Audio } from './audio.model';

@Table({
  tableName: 'playlist_audios',
  timestamps: true,
  updatedAt: false,
  indexes: [
      {
        unique: true,
        fields: ['playlist_id', 'audio_id'],
      },
    ],
})
export class PlaylistAudio extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => Playlist)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  playlistId!: number;

  @ForeignKey(() => Audio)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  audioId!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  orderPosition!: number;

  @CreatedAt
  @Column({
    field: 'added_at',
  })
  addedAt!: Date;

  // Relationships
  @BelongsTo(() => Playlist)
  playlist!: Playlist;

  @BelongsTo(() => Audio)
  audio!: Audio;
}

export default PlaylistAudio;