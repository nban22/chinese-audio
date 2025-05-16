// backend/src/db/models/admin.model.ts
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
  BelongsToMany,
  Default,
} from 'sequelize-typescript';
import { User } from './user.model';
import { Playlist } from './playlist.model';
import { ArtistVerification } from './artistVerification.model';
import { Coupon } from './coupon.model';
import { Role } from './role.model';
import { AdminRole } from './adminRole.model';

export enum AdminLevel {
  JUNIOR = 'junior',
  SENIOR = 'senior',
  SUPER = 'super',
}

@Table({
  tableName: 'admins',
  timestamps: true,
})
export class Admin extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
  })
  userId!: number;

  @Default(AdminLevel.JUNIOR)
  @Column({
    type: DataType.ENUM(...Object.values(AdminLevel)),
    allowNull: false,
  })
  adminLevel!: AdminLevel;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  // Relationships
  @BelongsTo(() => User)
  user!: User;

  @HasMany(() => Playlist)
  editorialPlaylists?: Playlist[];

  @HasMany(() => ArtistVerification)
  processedVerifications?: ArtistVerification[];

  @HasMany(() => Coupon)
  createdCoupons?: Coupon[];

  @BelongsToMany(() => Role, () => AdminRole)
  roles?: Role[];
}

export default Admin;