// backend/src/db/models/artistVerification.model.ts
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
  Default,
} from 'sequelize-typescript';
import { Artist } from './artist.model';
import { Admin } from './admin.model';

export enum VerificationStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  ADDITIONAL_INFO_REQUIRED = 'additional_info_required',
}

@Table({
  tableName: 'artist_verifications',
  timestamps: true,
  updatedAt: false,
})
export class ArtistVerification extends Model {
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

  @ForeignKey(() => Admin)
  @Column(DataType.INTEGER)
  adminId?: number;

  @Default(VerificationStatus.PENDING)
  @Column({
    type: DataType.ENUM(...Object.values(VerificationStatus)),
    allowNull: false,
  })
  verificationStatus!: VerificationStatus;

  @Column(DataType.STRING)
  documentsUrl?: string;

  @CreatedAt
  @Column({
    field: 'submitted_at',
  })
  submittedAt!: Date;

  @Column(DataType.DATE)
  processedAt?: Date;

  @Column(DataType.TEXT)
  adminNotes?: string;

  // Relationships
  @BelongsTo(() => Artist)
  artist!: Artist;

  @BelongsTo(() => Admin)
  admin?: Admin;
}

export default ArtistVerification;