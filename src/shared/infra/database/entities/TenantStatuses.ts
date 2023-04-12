import { Column, Entity, Index, OneToMany, Relation } from 'typeorm';
import { BaseEntity } from '~/shared/infra/database/entities/base';

import { Tenants } from './Tenants';

@Index('uq__tenant_statuses__name', ['deletedDate', 'name'], { unique: true })
@Index('pk__tenant_statuses', ['id'], { unique: true })
@Index('uq__part__tenant_statuses__name', ['name'], { unique: true })
@Entity('tenant_statuses', { schema: 'public' })
export class TenantStatuses extends BaseEntity {
  @Column('character varying', { name: 'name', length: 200 })
  name: string;

  @OneToMany(() => Tenants, (tenants) => tenants.tenantStatus)
  tenants: Relation<Tenants[]>;
}
