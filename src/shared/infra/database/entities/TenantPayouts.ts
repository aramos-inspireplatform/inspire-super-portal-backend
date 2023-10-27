import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Users } from './Users';
import { PayoutStatuses } from './PayoutStatuses';
import { Currencies } from './Currencies';
import { TenantsDataMapper } from './Tenants';
import { RecurringIntervalsDataMapper } from './RecurringIntervals';
import { BaseEntity } from '~/shared/infra/database/entities/base';
import { ColumnNumericTransformer } from '~/shared/infra/database/helpers/ColumnNumericTransformer.helper';

@Entity('tenant_payouts', { schema: 'public' })
export class TenantPayouts extends BaseEntity {
  @Column('bigint', { name: 'payout_alternative_id' })
  payoutAlternativeId: number;

  @Column('uuid', { name: 'creator_users_id' })
  creatorUserId: string;

  @Column('uuid', { name: 'updater_users_id' })
  updaterUserId: string;

  @Column('uuid', { name: 'deleter_users_id' })
  deleterUserId: string;

  @Column('uuid', { name: 'processor_users_id' })
  processorUserId: string;

  @Column('uuid', { name: 'tenants_id' })
  tenantId: string;

  @Column('uuid', { name: 'settlement_currencies_id' })
  settlementCurrencyId: string;

  @Column('uuid', { name: 'payout_statuses_id' })
  statusId: string;

  @Column('uuid', { name: 'terms_recurring_intervals_id' })
  termsRecurringIntervalId: string;

  @Column('date', { name: 'period_start_date' })
  periodStartDate: Date;

  @Column('date', { name: 'period_end_date' })
  periodEndDate: Date;

  @Column('numeric', {
    name: 'amount',
    precision: 15,
    scale: 6,
    transformer: new ColumnNumericTransformer(),
  })
  amount: number;

  @Column('smallint', {
    name: 'terms_recurring_interval_count',
    transformer: new ColumnNumericTransformer(),
  })
  termsRecurringIntervalCount: number;

  @Column('numeric', {
    name: 'customer_gross_amount',
    precision: 15,
    scale: 6,
    transformer: new ColumnNumericTransformer(),
  })
  customerGrossAmount: number;

  @Column('numeric', {
    name: 'customer_fee_amount',
    precision: 15,
    scale: 6,
    transformer: new ColumnNumericTransformer(),
  })
  customerFeeAmount: number;

  @Column('numeric', {
    name: 'payment_gateway_net_amount',
    precision: 15,
    scale: 6,
    transformer: new ColumnNumericTransformer(),
  })
  paymentGatewayNetAmount: number;

  @Column('date', { name: 'expected_arrival_date', nullable: true })
  expectedArrivalDate: Date | null;

  @Column('timestamp with time zone', {
    name: 'processed_date',
    nullable: true,
  })
  processedDate: Date | null;

  @Column('timestamp with time zone', {
    name: 'paid_date',
    nullable: true,
  })
  paidDate: Date | null;

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
  processorUser: Users;

  @ManyToOne(() => Users, (users) => users.paidPayouts, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'payer_users_id', referencedColumnName: 'id' }])
  payerUser: Users;

  @ManyToOne(() => Currencies, (currencies) => currencies.tenantPayouts, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([
    { name: 'settlement_currencies_id', referencedColumnName: 'id' },
  ])
  settlementCurrency: Currencies;

  @ManyToOne(() => TenantsDataMapper, (tenants) => tenants.tenantPayouts, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'tenants_id', referencedColumnName: 'id' }])
  tenant: TenantsDataMapper;

  @ManyToOne(
    () => RecurringIntervalsDataMapper,
    (recurringIntervals) => recurringIntervals.tenantPayouts,
    { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' },
  )
  @JoinColumn([
    { name: 'terms_recurring_intervals_id', referencedColumnName: 'id' },
  ])
  termsRecurringInterval: RecurringIntervalsDataMapper;

  @ManyToOne(() => Users, (users) => users.updaterUsersId, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'updater_users_id', referencedColumnName: 'id' }])
  updaterUsers: Users;

  @OneToMany(() => TenantsDataMapper, (tenants) => tenants.lastTenantPayout)
  lastPayoutTenants: TenantsDataMapper[];
}
