import { Column, Entity, Index, OneToMany, Relation } from 'typeorm';
import { Tenants } from './Tenants';
import { BaseEntity } from '~/shared/infra/database/entities/base';

@Index('idx__uq__tenant_statuses', ['deletedDate', 'name'], { unique: true })
@Index('pk__tenant_statuses', ['id'], { unique: true })
@Index('idx__part__uq__tenant_statuses', ['name'], { unique: true })
@Entity('tenant_statuses', { schema: 'public' })
export class TenantStatuses extends BaseEntity {
  @Column('character varying', { name: 'name', length: 50 })
  name: string;

  @Column('character varying', { name: 'slug', length: 50 })
  slug: string;

  @OneToMany(() => Tenants, (tenants) => tenants.tenantStatuses)
  tenants: Relation<Tenants[]>;
}
