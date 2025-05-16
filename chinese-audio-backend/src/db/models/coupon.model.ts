// backend/src/db/models/coupon.model.ts
import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
  HasMany,
  Unique,
  Default,
  Validate,
} from 'sequelize-typescript';
import { Admin } from './admin.model';
import { Transaction } from './transaction.model';

@Table({
  tableName: 'coupons',
  timestamps: false,
})
export class Coupon extends Model {
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

  @Unique
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  code!: string;

  @Validate({
    customValidator(value: number) {
      if (value === 0 && this.discountPercent === 0) {
        throw new Error('Either discountAmount or discountPercent must be greater than 0');
      }
    },
  })
  @Default(0)
  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  discountAmount!: number;

  @Validate({
    min: 0,
    max: 100,
    customValidator(value: number) {
      if (value === 0 && this.discountAmount === 0) {
        throw new Error('Either discountAmount or discountPercent must be greater than 0');
      }
    },
  })
  @Default(0)
  @Column({
    type: DataType.DECIMAL(5, 2),
    allowNull: false,
  })
  discountPercent!: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  validFrom!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  validTo!: Date;

  @Column(DataType.INTEGER)
  usageLimit?: number;

  @Default(0)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  usedCount!: number;

  // Relationships
  @BelongsTo(() => Admin)
  admin!: Admin;

  @HasMany(() => Transaction)
  transactions?: Transaction[];

  // Utility methods
  get isValid(): boolean {
    const now = new Date();
    return (
      now >= this.validFrom &&
      now <= this.validTo &&
      (this.usageLimit == null || this.usedCount < this.usageLimit)
    );
  }

  get isExpired(): boolean {
    return new Date() > this.validTo;
  }

  get isExhausted(): boolean {
    return this.usageLimit != null && this.usedCount >= (this.usageLimit ?? 0);
  }

  calculateDiscount(originalAmount: number): number {
    let discount = 0;
    
    if (this.discountAmount > 0) {
      discount = this.discountAmount;
    } else if (this.discountPercent > 0) {
      discount = (originalAmount * this.discountPercent) / 100;
    }
    
    // Don't allow discount to exceed original amount
    return Math.min(discount, originalAmount);
  }
}

export default Coupon;