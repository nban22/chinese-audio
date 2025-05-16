// backend/src/db/models/follow.model.ts
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
import { Artist } from './artist.model';

@Table({
  tableName: 'follows',
  timestamps: true,
  updatedAt: false,
  indexes: [
      {
        unique: true,
        fields: ['user_id', 'artist_id'],
      },
    ],
})
export class Follow extends Model {
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

  @ForeignKey(() => Artist)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  artistId!: number;

  @CreatedAt
  @Column({
    field: 'followed_at',
  })
  followedAt!: Date;

  // Relationships
  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Artist)
  artist!: Artist;
}

export default Follow;