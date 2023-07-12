import {
  BaseEntity,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TenantPayouts } from './TenantPayouts';

@Index('pk__templates_cp', ['id'], { unique: true })
@Entity('users', { schema: 'public' })
export class Users extends BaseEntity {
  @Column('uuid', { primary: true, name: 'id' })
  id: string;

  @PrimaryGeneratedColumn({ type: 'bigint', name: 'alternative_id' })
  alternativeId: string;

  @Column('character varying', { name: 'first_name', length: 100 })
  firstName: string;

  @Column('character varying', { name: 'last_name', length: 200 })
  lastName: string;

  @Column('character varying', { name: 'email', length: 300 })
  email: string;

  @Column('timestamp with time zone', { name: 'created_date' })
  createdDate: Date;

  @Column('timestamp with time zone', { name: 'updated_date', nullable: true })
  updatedDate: Date | null;

  @Column('timestamp with time zone', { name: 'deleted_date', nullable: true })
  deletedDate: Date | null;

  @OneToMany(() => TenantPayouts, (tenantPayouts) => tenantPayouts.creatorUsers)
  tenantPayouts: TenantPayouts[];

  @OneToMany(() => TenantPayouts, (tenantPayouts) => tenantPayouts.deleterUsers)
  tenantPayouts2: TenantPayouts[];

  @OneToMany(
    () => TenantPayouts,
    (tenantPayouts) => tenantPayouts.processorUsers,
  )
  tenantPayouts3: TenantPayouts[];

  @OneToMany(() => TenantPayouts, (tenantPayouts) => tenantPayouts.updaterUsers)
  tenantPayouts4: TenantPayouts[];
}
