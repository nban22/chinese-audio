// backend/src/db/models/userAudio.model.ts
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
  Default,
  Unique,
} from 'sequelize-typescript';
import { User } from './user.model';
import { Audio } from './audio.model';

@Table({
  tableName: 'user_audios',
  timestamps: true,
  updatedAt: false,
  indexes: [
      {
        unique: true,
        fields: ['user_id', 'audio_id'],
      },
    ],
})
export class UserAudio extends Model {
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
    field: 'listened_at',
  })
  listenedAt!: Date;

  @Default(0)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  progressSeconds!: number;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  isCompleted!: boolean;

  // Relationships
  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Audio)
  audio!: Audio;
}


export default UserAudio;