import { Column, Entity, Index, OneToMany, Relation } from 'typeorm';
import { AgencyTenants } from '~/shared/infra/database/entities/agency-tenants';
import { BaseEntity } from '~/shared/infra/database/entities/base';
import { UserAgencies } from '~/shared/infra/database/entities/user-agencies';

@Index('pk__agencies', ['id'], { unique: true })
@Entity('agencies', { schema: 'public' })
export class Agencies extends BaseEntity {
  @Column('character varying', { name: 'name', length: 300 })
  name: string;

  @OneToMany(() => AgencyTenants, (agencyTenants) => agencyTenants.agencies)
  agencyTenants: Relation<AgencyTenants>[];

  @OneToMany(() => UserAgencies, (userAgencies) => userAgencies.agencies)
  userAgencies: Relation<UserAgencies>[];
}
