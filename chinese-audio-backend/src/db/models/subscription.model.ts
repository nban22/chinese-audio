// backend/src/db/models/subscription.model.ts
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
  Default,
} from 'sequelize-typescript';
import { User } from './user.model';
import { Transaction } from './transaction.model';

export enum SubscriptionType {
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  ANNUAL = 'annual',
}

export enum SubscriptionStatus {
  ACTIVE = 'active',
  EXPIRED = 'expired',
  CANCELLED = 'cancelled',
  PENDING = 'pending',
}

@Table({
  tableName: 'subscriptions',
  timestamps: false,
})
export class Subscription extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId!: number;

  @Column({
    type: DataType.ENUM(...Object.values(SubscriptionType)),
    allowNull: false,
  })
  subscriptionType!: SubscriptionType;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  startDate!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  endDate!: Date;

  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  isAutoRenew!: boolean;

  @Default(SubscriptionStatus.PENDING)
  @Column({
    type: DataType.ENUM(...Object.values(SubscriptionStatus)),
    allowNull: false,
  })
  status!: SubscriptionStatus;

  // Relationships
  @BelongsTo(() => User)
  user!: User;

  @HasMany(() => Transaction)
  transactions?: Transaction[];

  // Utility methods
  get isActive(): boolean {
    return (
      this.status === SubscriptionStatus.ACTIVE &&
      new Date() <= this.endDate
    );
  }

  get daysRemaining(): number {
    if (!this.isActive) return 0;
    
    const today = new Date();
    const endDate = new Date(this.endDate);
    const diffTime = endDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
}

export default Subscription;