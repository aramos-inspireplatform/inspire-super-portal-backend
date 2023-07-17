import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Requests } from './Requests';
import { TenantBalances } from './TenantBalances';
import { TenantPayouts } from './TenantPayouts';
import { TenantStatuses } from './TenantStatuses';
import { RecurringIntervals } from './RecurringIntervals';
import { BaseEntity } from '~/shared/infra/database/entities/base';

@Index('idx__tenants__agencies_id', ['agencyId', 'deletedDate'], {})
@Index('idx__uq__tenants', ['deletedDate', 'googleTenantId'], { unique: true })
@Index('idx__part__uq__tenants', ['googleTenantId'], { unique: true })
@Index('pk__tenants', ['id'], { unique: true })
@Entity('tenants', { schema: 'public' })
export class Tenants extends BaseEntity {
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

  @Column('smallint', { name: 'terms_recurring_interval_count' })
  termsRecurringIntervalCount: number;

  @Column('numeric', { name: 'total_paid_amount', precision: 15, scale: 6 })
  totalPaidAmount: number;

  @OneToMany(() => Requests, (requests) => requests.tenant)
  requests: Requests[];

  @OneToMany(() => TenantBalances, (tenantBalances) => tenantBalances.tenant)
  tenantBalances: TenantBalances[];

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

  @ManyToOne(() => TenantStatuses, (tenantStatuses) => tenantStatuses.tenants, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'tenant_statuses_id', referencedColumnName: 'id' }])
  tenantStatus: TenantStatuses;

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
