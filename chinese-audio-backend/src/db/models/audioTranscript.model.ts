// backend/src/db/models/audioTranscript.model.ts
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
  Default,
} from 'sequelize-typescript';
import { Audio } from './audio.model';

@Table({
  tableName: 'audio_transcripts',
  timestamps: true,
})
export class AudioTranscript extends Model {
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

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content!: string;

  @Default('zh-CN')
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  language!: string;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  // Relationships
  @BelongsTo(() => Audio)
  audio!: Audio;
}

export default AudioTranscript;