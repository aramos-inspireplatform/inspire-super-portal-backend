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
import { ModuleRequestModuleProvisionRequests } from '~/shared/infra/database/entities/module-request-module-provision-requests';
import { ModuleRequestStatuses } from '~/shared/infra/database/entities/module-request-statuses';
import { ModuleRequestTypes } from '~/shared/infra/database/entities/module-request-types';
import { Tenants } from '~/shared/infra/database/entities/tenants';

@Index(
  'uq__tenant__module_request_type',
  ['deletedDate', 'moduleRequestTypeId', 'tenantId'],
  { unique: true },
)
@Index('pk__module_requests', ['id'], { unique: true })
@Index(
  'uq__part__tenant__module_request_type',
  ['moduleRequestTypeId', 'tenantId'],
  { unique: true },
)
@Entity('module_requests', { schema: 'public' })
export class ModuleRequests extends BaseEntity {
  @Column('uuid', { name: 'tenant_id' })
  tenantId: string;

  @Column('uuid', { name: 'module_request_type_id' })
  moduleRequestTypeId: string;

  @Column('character varying', {
    name: 'wrapper_integration_id',
    nullable: true,
    length: 300,
  })
  wrapperIntegrationId: string | null;

  @Column('smallint', { name: 'attempts' })
  attempts: number;

  @Column('jsonb', { name: 'request_settings' })
  requestSettings: object;

  @Column('jsonb', { name: 'request_notes', nullable: true })
  requestNotes: object | null;

  @Column('jsonb', { name: 'api_request_body', nullable: true })
  apiRequestBody: object | null;

  @Column('jsonb', { name: 'api_response_body', nullable: true })
  apiResponseBody: object | null;

  @OneToMany(
    () => ModuleRequestModuleProvisionRequests,
    (moduleRequestModuleProvisionRequests) =>
      moduleRequestModuleProvisionRequests.moduleRequest,
  )
  moduleRequestModuleProvisionRequests: Relation<
    ModuleRequestModuleProvisionRequests[]
  >;

  @ManyToOne(
    () => ModuleRequestStatuses,
    (moduleRequestStatuses) => moduleRequestStatuses.moduleRequests,
    { onDelete: 'RESTRICT', onUpdate: 'CASCADE' },
  )
  @JoinColumn([
    { name: 'module_request_status_id', referencedColumnName: 'id' },
  ])
  moduleRequestStatus: Relation<ModuleRequestStatuses>;

  @ManyToOne(
    () => ModuleRequestTypes,
    (moduleRequestTypes) => moduleRequestTypes.moduleRequests,
    { onDelete: 'RESTRICT', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'module_request_type_id', referencedColumnName: 'id' }])
  moduleRequestType: ModuleRequestTypes;

  @ManyToOne(() => Tenants, (tenants) => tenants.moduleRequests, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'tenant_id', referencedColumnName: 'id' }])
  tenant: Relation<Tenants>;
}
