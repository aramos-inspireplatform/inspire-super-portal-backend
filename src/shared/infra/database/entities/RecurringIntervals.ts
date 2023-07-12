import {
  BaseEntity,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TenantPayouts } from './TenantPayouts';
import { Tenants } from './Tenants';

@Index('idx__uq__recurring_intervals', ['deletedDate', 'name'], {
  unique: true,
})
@Index('pk__recurring_intervals', ['id'], { unique: true })
@Index('idx__part__uq__recurring_intervals', ['name'], { unique: true })
@Entity('recurring_intervals', { schema: 'public' })
export class RecurringIntervals extends BaseEntity {
  @Column('uuid', { primary: true, name: 'id' })
  id: string;

  @PrimaryGeneratedColumn({ type: 'bigint', name: 'alternative_id' })
  alternativeId: string;

  @Column('character varying', { name: 'name', length: 50 })
  name: string;

  @Column('character varying', { name: 'interval', length: 10 })
  interval: string;

  @Column('boolean', { name: 'is_active' })
  isActive: boolean;

  @Column('timestamp with time zone', { name: 'created_date' })
  createdDate: Date;

  @Column('timestamp with time zone', { name: 'updated_date', nullable: true })
  updatedDate: Date | null;

  @Column('timestamp with time zone', { name: 'deleted_date', nullable: true })
  deletedDate: Date | null;

  @OneToMany(
    () => TenantPayouts,
    (tenantPayouts) => tenantPayouts.termsRecurringIntervals,
  )
  tenantPayouts: TenantPayouts[];

  @OneToMany(() => Tenants, (tenants) => tenants.termsRecurringIntervals)
  tenants: Tenants[];
}
