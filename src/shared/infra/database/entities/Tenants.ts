import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Relation,
} from 'typeorm';
import { Requests } from './Requests';
import { TenantStatuses } from './TenantStatuses';
import { BaseEntity } from '~/shared/infra/database/entities/base';
import { RecurringIntervals } from '~/shared/infra/database/entities/RecurringIntervals';

@Index('pk__tenants', ['id'], { unique: true })
@Entity('tenants', { schema: 'public' })
export class Tenants extends BaseEntity {
  @Column('character varying', { name: 'name', length: 200 })
  name: string;

  @Column('character varying', { name: 'google_tenant_id', length: 100 })
  googleTenantId: string;

  @Column('character varying', { name: 'agencies_id', length: 36 })
  agencyId: string;

  @Column('character varying', { name: 'agency_name', length: 200 })
  agencyName: string;

  @Column('smallint', { name: 'terms_recurring_interval_count' })
  termsRecurringIntervalCount: number;

  @ManyToOne(
    () => RecurringIntervals,
    (recurringIntervals) => recurringIntervals.tenants,
    {
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
      eager: true,
    },
  )
  @JoinColumn([
    { name: 'terms_recurring_intervals_id', referencedColumnName: 'id' },
  ])
  termsRecurringInterval: Relation<RecurringIntervals>;

  @OneToMany(() => Requests, (requests) => requests.tenant)
  requests: Relation<Requests[]>;

  @ManyToOne(() => TenantStatuses, (tenantStatuses) => tenantStatuses.tenants, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
    eager: true,
  })
  @JoinColumn([{ name: 'tenant_statuses_id', referencedColumnName: 'id' }])
  tenantStatus: Relation<TenantStatuses>;

  @Column('numeric', { name: 'total_paid_amount', precision: 15, scale: 6 })
  totalPaidAmount: number;

  //this.lastTenantPayout = attrs.lastTenantPayout;
}
