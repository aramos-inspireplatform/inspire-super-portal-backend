import { BaseEntity, Column, Entity, Index, OneToMany } from 'typeorm';
import { TenantPayouts } from './TenantPayouts';
import { Tenants } from './Tenants';

@Index('idx__uq__recurring_intervals', ['deletedDate', 'name'], {
  unique: true,
})
@Index('pk__recurring_intervals', ['id'], { unique: true })
@Index('idx__part__uq__recurring_intervals', ['name'], { unique: true })
@Entity('recurring_intervals', { schema: 'public' })
export class RecurringIntervals extends BaseEntity {
  @Column('character varying', { name: 'name', length: 50 })
  name: string;

  @Column('character varying', { name: 'interval', length: 10 })
  interval: string;

  @Column('boolean', { name: 'is_active' })
  isActive: boolean;

  @OneToMany(
    () => TenantPayouts,
    (tenantPayouts) => tenantPayouts.termsRecurringIntervals,
  )
  tenantPayouts: TenantPayouts[];

  @OneToMany(() => Tenants, (tenants) => tenants.termsRecurringIntervals)
  tenants: Tenants[];
}
