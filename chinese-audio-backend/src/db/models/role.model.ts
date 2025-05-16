// backend/src/db/models/role.model.ts
import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  Unique,
  BelongsToMany,
} from 'sequelize-typescript';
import { Admin } from './admin.model';
import { AdminRole } from './adminRole.model';

@Table({
  tableName: 'roles',
  timestamps: false,
})
export class Role extends Model {
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

  @Column(DataType.TEXT)
  description?: string;

  // Permissions as JSON array
  @Column(DataType.JSON)
  permissions?: string[];

  // Relationships
  @BelongsToMany(() => Admin, () => AdminRole)
  admins?: Admin[];
}

export default Role;