// backend/src/db/models/rating.model.ts
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
  Validate,
} from 'sequelize-typescript';
import { User } from './user.model';
import { Audio } from './audio.model';

@Table({
  tableName: 'ratings',
  timestamps: true,
  updatedAt: false,
  indexes: [
      {
        unique: true,
        fields: ['user_id', 'audio_id'],
      },
    ],
})
export class Rating extends Model {
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

  @Validate({
    min: 1,
    max: 5,
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  ratingValue!: number;

  @Column(DataType.TEXT)
  comment?: string;

  @CreatedAt
  @Column({
    field: 'rated_at',
  })
  ratedAt!: Date;

  // Relationships
  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Audio)
  audio!: Audio;
}

export default Rating;