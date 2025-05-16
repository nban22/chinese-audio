// backend/src/db/models/courseAudio.model.ts
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
import { Course } from './course.model';
import { Audio } from './audio.model';

@Table({
  tableName: 'course_audios',
  timestamps: true,
  updatedAt: false,
  indexes: [
      {
        unique: true,
        fields: ['course_id', 'audio_id'],
      },
    ],
})
export class CourseAudio extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => Course)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  courseId!: number;

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

  @Column(DataType.STRING)
  sectionTitle?: string;

  @CreatedAt
  @Column({
    field: 'added_at',
  })
  addedAt!: Date;

  // Relationships
  @BelongsTo(() => Course)
  course!: Course;

  @BelongsTo(() => Audio)
  audio!: Audio;
}

export default CourseAudio;