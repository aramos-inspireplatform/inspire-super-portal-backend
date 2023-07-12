import {
  BaseEntity,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TenantPayouts } from './TenantPayouts';

@Index('idx__uq__payout_statuses', ['deletedDate', 'slug'], { unique: true })
@Index('pk__payout_statuses', ['id'], { unique: true })
@Index('idx__part__uq__payout_statuses', ['slug'], { unique: true })
@Entity('payout_statuses', { schema: 'public' })
export class PayoutStatuses extends BaseEntity {
  @Column('uuid', { primary: true, name: 'id' })
  id: string;

  @PrimaryGeneratedColumn({ type: 'bigint', name: 'alternative_id' })
  alternativeId: string;

  @Column('character varying', { name: 'name', length: 50 })
  name: string;

  @Column('character varying', { name: 'slug', length: 50 })
  slug: string;

  @Column('timestamp with time zone', { name: 'created_date' })
  createdDate: Date;

  @Column('timestamp with time zone', { name: 'updated_date', nullable: true })
  updatedDate: Date | null;

  @Column('timestamp with time zone', { name: 'deleted_date', nullable: true })
  deletedDate: Date | null;

  @OneToMany(
    () => TenantPayouts,
    (tenantPayouts) => tenantPayouts.payoutStatuses,
  )
  tenantPayouts: TenantPayouts[];
}
