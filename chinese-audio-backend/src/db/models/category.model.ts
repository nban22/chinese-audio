// backend/src/db/models/category.model.ts
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
} from 'sequelize-typescript';
import { Audio } from './audio.model';
import { Course } from './course.model';

@Table({
  tableName: 'categories',
  timestamps: true,
})
export class Category extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => Category)
  @Column(DataType.INTEGER)
  parentCategoryId?: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column(DataType.TEXT)
  description?: string;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  // Relationships
  @BelongsTo(() => Category, 'parentCategoryId')
  parentCategory?: Category;

  @HasMany(() => Category, 'parentCategoryId')
  subcategories?: Category[];

  @HasMany(() => Audio)
  audios?: Audio[];

  @HasMany(() => Course)
  courses?: Course[];
}

export default Category;