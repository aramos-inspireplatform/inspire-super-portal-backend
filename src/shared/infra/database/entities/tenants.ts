import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Relation,
} from 'typeorm';
import { BaseEntity } from '~/shared/infra/database/entities/base';
import { ModuleRequests } from '~/shared/infra/database/entities/module-requests';
import { TenantStatuses } from '~/shared/infra/database/entities/tenant-statuses';

@Index('pk__tenants', ['id'], { unique: true })
@Entity('tenants', { schema: 'public' })
export class Tenants extends BaseEntity {
  @Column('character varying', { name: 'name', length: 200 })
  name: string;

  @Column('character varying', { name: 'wrapper_integration_id', length: 300 })
  wrapperIntegrationId: string;

  @Column('character varying', { name: 'created_by_user_id', length: 300 })
  createdByUserId: string;

  @OneToMany(() => ModuleRequests, (moduleRequests) => moduleRequests.tenant)
  moduleRequests: Relation<ModuleRequests[]>;

  @ManyToOne(() => TenantStatuses, (tenantStatuses) => tenantStatuses.tenants, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'tenant_status_id', referencedColumnName: 'id' }])
  tenantStatus: Relation<TenantStatuses>;
}
