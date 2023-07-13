import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Users } from './Users';
import { PayoutStatuses } from './PayoutStatuses';
import { Currencies } from './Currencies';
import { Tenants } from './Tenants';
import { RecurringIntervals } from './RecurringIntervals';
import { BaseEntity } from '~/shared/infra/database/entities/base';

@Index('pk__tenant_payouts', ['id'], { unique: true })
@Entity('tenant_payouts', { schema: 'public' })
export class TenantPayouts extends BaseEntity {
  @Column('bigint', { name: 'payout_alternative_id' })
  payoutAlternativeId: string;

  @Column('date', { name: 'period_start_date' })
  periodStartDate: Date;

  @Column('date', { name: 'period_end_date' })
  periodEndDate: Date;

  @Column('numeric', { name: 'amount', precision: 15, scale: 6 })
  amount: number;

  @Column('smallint', { name: 'terms_recurring_interval_count' })
  termsRecurringIntervalCount: number;

  @Column('numeric', { name: 'customer_gross_amount', precision: 15, scale: 6 })
  customerGrossAmount: number;

  @Column('numeric', { name: 'customer_fee_amount', precision: 15, scale: 6 })
  customerFeeAmount: number;

  @Column('numeric', {
    name: 'payment_gateway_net_amount',
    precision: 15,
    scale: 6,
  })
  paymentGatewayNetAmount: number;

  @Column('date', { name: 'expected_arrival_date', nullable: true })
  expectedArrivalDate: Date | null;

  @Column('timestamp with time zone', {
    name: 'processed_date',
    nullable: true,
  })
  processedDate: Date | null;

  @ManyToOne(() => Users, (users) => users.creatorUsersId, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'creator_users_id', referencedColumnName: 'id' }])
  creatorUsers: Users;

  @ManyToOne(() => Users, (users) => users.deleterUsersId, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'deleter_users_id', referencedColumnName: 'id' }])
  deleterUsers: Users;

  @ManyToOne(
    () => PayoutStatuses,
    (payoutStatuses) => payoutStatuses.tenantPayouts,
    { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' },
  )
  @JoinColumn([{ name: 'payout_statuses_id', referencedColumnName: 'id' }])
  payoutStatus: PayoutStatuses;

  @ManyToOne(() => Users, (users) => users.processorUsersId, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'processor_users_id', referencedColumnName: 'id' }])
  processorUsers: Users;

  @ManyToOne(() => Currencies, (currencies) => currencies.tenantPayouts, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([
    { name: 'settlement_currencies_id', referencedColumnName: 'id' },
  ])
  settlementCurrency: Currencies;

  @ManyToOne(() => Tenants, (tenants) => tenants.tenantPayouts, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'tenants_id', referencedColumnName: 'id' }])
  tenantsId: Tenants;

  @ManyToOne(
    () => RecurringIntervals,
    (recurringIntervals) => recurringIntervals.tenantPayouts,
    { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' },
  )
  @JoinColumn([
    { name: 'terms_recurring_intervals_id', referencedColumnName: 'id' },
  ])
  termsRecurringIntervals: RecurringIntervals;

  @ManyToOne(() => Users, (users) => users.updaterUsersId, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'updater_users_id', referencedColumnName: 'id' }])
  updaterUsers: Users;

  @OneToMany(() => Tenants, (tenants) => tenants.lastTenantPayout)
  tenants: Tenants[];
}
