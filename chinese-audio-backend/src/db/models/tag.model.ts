// backend/src/db/models/tag.model.ts
import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  Unique,
  BelongsToMany,
} from 'sequelize-typescript';
import { Audio } from './audio.model';
import { AudioTag } from './audioTag.model';

@Table({
  tableName: 'tags',
  timestamps: true,
  updatedAt: false,
})
export class Tag extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Unique
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  name!: string;

  @CreatedAt
  createdAt!: Date;

  // Relationships
  @BelongsToMany(() => Audio, () => AudioTag)
  audios?: Audio[];
}

export default Tag;