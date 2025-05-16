// backend/src/db/models/adminRole.model.ts
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
import { Admin } from './admin.model';
import { Role } from './role.model';

@Table({
  tableName: 'admin_roles',
  timestamps: true,
  updatedAt: false,
  indexes: [
      {
        unique: true,
        fields: ['admin_id', 'role_id'],
      },
    ],
})
export class AdminRole extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => Admin)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  adminId!: number;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  roleId!: number;

  @CreatedAt
  @Column({
    field: 'assigned_at',
  })
  assignedAt!: Date;

  // Relationships
  @BelongsTo(() => Admin)
  admin!: Admin;

  @BelongsTo(() => Role)
  role!: Role;
}

export default AdminRole;