import { Column, Entity, OneToMany } from 'typeorm';
import { TenantPayouts } from './TenantPayouts';
import { BaseEntity } from '~/shared/infra/database/entities/base';

@Entity('users', { schema: 'public' })
export class Users extends BaseEntity {
  @Column('character varying', { name: 'first_name', length: 100 })
  firstName: string;

  @Column('character varying', { name: 'last_name', length: 200 })
  lastName: string;

  @Column('character varying', { name: 'email', length: 300 })
  email: string;

  @OneToMany(() => TenantPayouts, (tenantPayouts) => tenantPayouts.creatorUsers)
  creatorUsersId: TenantPayouts[];

  @OneToMany(() => TenantPayouts, (tenantPayouts) => tenantPayouts.deleterUsers)
  deleterUsersId: TenantPayouts[];

  @OneToMany(
    () => TenantPayouts,
    (tenantPayouts) => tenantPayouts.processorUser,
  )
  processorUsersId: TenantPayouts[];

  @OneToMany(() => TenantPayouts, (tenantPayouts) => tenantPayouts.payerUser)
  paidPayouts: TenantPayouts[];

  @OneToMany(() => TenantPayouts, (tenantPayouts) => tenantPayouts.updaterUsers)
  updaterUsersId: TenantPayouts[];
}
