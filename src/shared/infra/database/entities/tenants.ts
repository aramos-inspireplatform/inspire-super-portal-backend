import { Column, Entity, Index, OneToMany, Relation } from 'typeorm';
import { AgencyTenants } from '~/shared/infra/database/entities/agency-tenants';
import { BaseEntity } from '~/shared/infra/database/entities/base';
import { UserAllowedTenants } from '~/shared/infra/database/entities/user-allowed-tenants';

@Index('pk__tenants', ['id'], { unique: true })
@Entity('tenants', { schema: 'public' })
export class Tenants extends BaseEntity {
  @Column('character varying', { name: 'name', length: 300 })
  name: string;

  @Column('character varying', { name: 'tenant_code', length: 100 })
  tenantCode: string;

  @OneToMany(() => AgencyTenants, (agencyTenants) => agencyTenants.tenants)
  agencyTenants: Relation<AgencyTenants>[];

  @OneToMany(
    () => UserAllowedTenants,
    (userAllowedTenants) => userAllowedTenants.tenants,
  )
  userAllowedTenants: Relation<UserAllowedTenants>[];
}
