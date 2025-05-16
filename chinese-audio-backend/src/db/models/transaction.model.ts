// backend/src/db/models/transaction.model.ts
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
import { Subscription } from './subscription.model';
import { Coupon } from './coupon.model';

export enum PaymentMethod {
  CREDIT_CARD = 'credit_card',
  PAYPAL = 'paypal',
  BANK_TRANSFER = 'bank_transfer',
  CRYPTO = 'crypto',
  OTHER = 'other',
}

export enum TransactionStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

@Table({
  tableName: 'transactions',
  timestamps: true,
  updatedAt: false,
})
export class Transaction extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => Subscription)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  subscriptionId!: number;

  @ForeignKey(() => Coupon)
  @Column(DataType.INTEGER)
  couponId?: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  amount!: number;

  @Column({
    type: DataType.ENUM(...Object.values(PaymentMethod)),
    allowNull: false,
  })
  paymentMethod!: PaymentMethod;

  @Default(TransactionStatus.PENDING)
  @Column({
    type: DataType.ENUM(...Object.values(TransactionStatus)),
    allowNull: false,
  })
  status!: TransactionStatus;

  @CreatedAt
  @Column({
    field: 'transaction_date',
  })
  transactionDate!: Date;

  // Metadata for external payment systems
  @Column(DataType.JSON)
  paymentDetails?: any;

  // Relationships
  @BelongsTo(() => Subscription)
  subscription!: Subscription;

  @BelongsTo(() => Coupon)
  coupon?: Coupon;
}

export default Transaction;