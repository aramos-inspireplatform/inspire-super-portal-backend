import { Column, Entity, OneToMany, Relation } from 'typeorm';
import { TenantsDataMapper } from './Tenants';
import { BaseEntity } from '~/shared/infra/database/entities/base';

@Entity('tenant_statuses', { schema: 'public' })
export class TenantStatusesDataMapper extends BaseEntity {
  @Column('character varying', { name: 'name', length: 50 })
  name: string;

  @Column('character varying', { name: 'slug', length: 50 })
  slug: string;

  @OneToMany(() => TenantsDataMapper, (tenants) => tenants.tenantStatus)
  tenants: Relation<TenantsDataMapper[]>;
}
