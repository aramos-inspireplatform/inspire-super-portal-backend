import { Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Agencies } from '~/shared/infra/database/entities/agencies';
import { BaseEntity } from '~/shared/infra/database/entities/base';
import { Tenants } from '~/shared/infra/database/entities/tenants';

@Index('pk__agency_tenants', ['id'], { unique: true })
@Entity('agency_tenants', { schema: 'public' })
export class AgencyTenants extends BaseEntity {
  @ManyToOne(() => Agencies, (agencies) => agencies.agencyTenants, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'agencies_id', referencedColumnName: 'id' }])
  agencies: Agencies;

  @ManyToOne(() => Tenants, (tenants) => tenants.agencyTenants, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'tenants_id', referencedColumnName: 'id' }])
  tenants: Tenants;
}
