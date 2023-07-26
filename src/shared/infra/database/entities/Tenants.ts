import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Requests } from './Requests';
import { TenantBalancesDataMapper } from './TenantBalances';
import { TenantPayouts } from './TenantPayouts';
import { TenantStatusesDataMapper } from './TenantStatuses';
import { RecurringIntervals } from './RecurringIntervals';
import { BaseEntity } from '~/shared/infra/database/entities/base';
import { ColumnNumericTransformer } from '~/shared/infra/database/helpers/ColumnNumericTransformer.helper';

@Entity('tenants', { schema: 'public' })
export class TenantsDataMapper extends BaseEntity {
  @Column('character varying', { name: 'name', length: 200 })
  name: string;

  @Column('character varying', { name: 'google_tenant_id', length: 100 })
  googleTenantId: string;

  @Column('uuid', { name: 'agencies_id', nullable: true })
  agencyId: string | null;

  @Column('character varying', {
    name: 'agency_name',
    nullable: true,
    length: 200,
  })
  agencyName: string | null;

  @Column('smallint', {
    name: 'terms_recurring_interval_count',
    transformer: new ColumnNumericTransformer(),
  })
  termsRecurringIntervalCount: number;

  @Column('uuid', { name: 'terms_recurring_intervals_id', nullable: true })
  termsRecurringIntervalId: string;

  @Column('uuid', { name: 'tenant_statuses_id', nullable: true })
  statusId: string;

  @Column('numeric', {
    name: 'total_paid_amount',
    precision: 15,
    scale: 6,
    transformer: new ColumnNumericTransformer(),
  })
  totalPaidAmount: number;

  @OneToMany(
    () => TenantBalancesDataMapper,
    (tenantBalances) => tenantBalances.tenant,
    { cascade: true },
  )
  tenantBalances: TenantBalancesDataMapper[];

  @OneToMany(() => Requests, (requests) => requests.tenant)
  requests: Requests[];

  @OneToMany(() => TenantPayouts, (tenantPayouts) => tenantPayouts.tenant)
  tenantPayouts: TenantPayouts[];

  @ManyToOne(
    () => TenantPayouts,
    (tenantPayouts) => tenantPayouts.lastPayoutTenants,
    {
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    },
  )
  @JoinColumn([{ name: 'last_tenant_payouts_id', referencedColumnName: 'id' }])
  lastTenantPayout: TenantPayouts;

  @ManyToOne(
    () => TenantStatusesDataMapper,
    (tenantStatuses) => tenantStatuses.tenants,
    {
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    },
  )
  @JoinColumn([{ name: 'tenant_statuses_id', referencedColumnName: 'id' }])
  tenantStatus: TenantStatusesDataMapper;

  @ManyToOne(
    () => RecurringIntervals,
    (recurringIntervals) => recurringIntervals.tenants,
    { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' },
  )
  @JoinColumn([
    { name: 'terms_recurring_intervals_id', referencedColumnName: 'id' },
  ])
  termsRecurringInterval: RecurringIntervals;
}
