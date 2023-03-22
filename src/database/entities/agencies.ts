import { Column, Entity, Index, OneToMany } from 'typeorm';
import { AgencyTenants } from '~/database/entities/agency-tenants';
import { BaseEntity } from '~/database/entities/base';
import { UserAgencies } from '~/database/entities/user-agencies';

@Index('pk__agencies', ['id'], { unique: true })
@Entity('agencies', { schema: 'public' })
export class Agencies extends BaseEntity {
  @Column('character varying', { name: 'name', length: 300 })
  name: string;

  @OneToMany(() => AgencyTenants, (agencyTenants) => agencyTenants.agencies)
  agencyTenants: AgencyTenants[];

  @OneToMany(() => UserAgencies, (userAgencies) => userAgencies.agencies)
  userAgencies: UserAgencies[];
}
