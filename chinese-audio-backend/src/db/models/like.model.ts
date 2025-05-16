// backend/src/db/models/like.model.ts
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
import { User } from './user.model';
import { Audio } from './audio.model';

@Table({
  tableName: 'likes',
  timestamps: true,
  updatedAt: false,
  indexes: [
      {
        unique: true,
        fields: ['user_id', 'audio_id'],
      },
    ],
})
export class Like extends Model {
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
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  audioId!: number;

  @CreatedAt
  @Column({
    field: 'liked_at',
  })
  likedAt!: Date;

  // Relationships
  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Audio)
  audio!: Audio;
}

export default Like;