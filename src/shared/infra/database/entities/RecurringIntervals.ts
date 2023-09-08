import { Column, Entity, OneToMany } from 'typeorm';
import { TenantPayouts } from './TenantPayouts';
import { TenantsDataMapper } from './Tenants';
import { BaseEntity } from '~/shared/infra/database/entities/base';

@Entity('recurring_intervals', { schema: 'public' })
export class RecurringIntervalsDataMapper extends BaseEntity {
  @Column('character varying', { name: 'name', length: 50 })
  name: string;

  @Column('character varying', { name: 'interval', length: 10 })
  interval: string;

  @Column('boolean', { name: 'is_active' })
  isActive: boolean;

  @OneToMany(
    () => TenantPayouts,
    (tenantPayouts) => tenantPayouts.termsRecurringInterval,
  )
  tenantPayouts: TenantPayouts[];

  @OneToMany(
    () => TenantsDataMapper,
    (tenants) => tenants.termsRecurringInterval,
  )
  tenants: TenantsDataMapper[];
}
