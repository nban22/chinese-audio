// backend/src/db/models/course.model.ts
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
} from 'sequelize-typescript';
import { Artist } from './artist.model';
import { Category } from './category.model';
import { CourseAudio } from './courseAudio.model';

export enum CourseDifficultyLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert',
}

@Table({
  tableName: 'courses',
  timestamps: true,
})
export class Course extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => Artist)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  artistId!: number;

  @ForeignKey(() => Category)
  @Column(DataType.INTEGER)
  categoryId?: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string;

  @Column(DataType.TEXT)
  description?: string;

  @Column(DataType.STRING)
  coverImage?: string;

  @Column({
    type: DataType.ENUM(...Object.values(CourseDifficultyLevel)),
    allowNull: false,
  })
  difficultyLevel!: CourseDifficultyLevel;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  isPremium!: boolean;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  isApproved!: boolean;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  // Relationships
  @BelongsTo(() => Artist)
  artist!: Artist;

  @BelongsTo(() => Category)
  category?: Category;

  @HasMany(() => CourseAudio)
  courseAudios?: CourseAudio[];
}

export default Course;