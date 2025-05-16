// backend/src/db/models/audioTag.model.ts
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
} from 'sequelize-typescript';
import { Audio } from './audio.model';
import { Tag } from './tag.model';

@Table({
  tableName: 'audio_tags',
  timestamps: true,
  updatedAt: false,
  indexes: [
    {
      unique: true,
      fields: ['audio_id', 'tag_id'],
    },
  ],
})
export class AudioTag extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => Audio)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  audioId!: number;

  @ForeignKey(() => Tag)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  tagId!: number;

  @CreatedAt
  createdAt!: Date;

  // Relationships
  @BelongsTo(() => Audio)
  audio!: Audio;

  @BelongsTo(() => Tag)
  tag!: Tag;
}

export default AudioTag;