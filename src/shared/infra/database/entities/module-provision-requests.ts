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
import { ModuleProvisionRequestStatuses } from '~/shared/infra/database/entities/module-provision-request-statuses';
import { ModuleRequestModuleProvisionRequests } from '~/shared/infra/database/entities/module-request-module-provision-requests';

@Index('pk__module_provision_requests', ['id'], { unique: true })
@Entity('module_provision_requests', { schema: 'public' })
export class ModuleProvisionRequests extends BaseEntity {
  @Column('character varying', { name: 'created_by_user_id', length: 300 })
  createdByUserId: string;

  @Column('character varying', {
    name: 'provision_api_request_body',
    nullable: true,
  })
  provisionApiRequestBody: string | null;

  @Column('character varying', {
    name: 'provision_api_response_body',
    nullable: true,
  })
  provisionApiResponseBody: string | null;

  @Column('smallint', {
    name: 'provision_api_response_status_code',
    nullable: true,
  })
  provisionApiResponseStatusCode: number | null;

  @Column('character varying', {
    name: 'wrapper_integration_id',
    nullable: true,
    length: 300,
  })
  wrapperIntegrationId: string | null;

  @ManyToOne(
    () => ModuleProvisionRequestStatuses,
    (moduleProvisionRequestStatuses) =>
      moduleProvisionRequestStatuses.moduleProvisionRequests,
    { onDelete: 'RESTRICT', onUpdate: 'CASCADE' },
  )
  @JoinColumn([
    { name: 'module_provision_request_status_id', referencedColumnName: 'id' },
  ])
  moduleProvisionRequestStatus: Relation<ModuleProvisionRequestStatuses>;

  @OneToMany(
    () => ModuleRequestModuleProvisionRequests,
    (moduleRequestModuleProvisionRequests) =>
      moduleRequestModuleProvisionRequests.moduleProvisionRequest,
  )
  moduleRequestModuleProvisionRequests: Relation<
    ModuleRequestModuleProvisionRequests[]
  >;
}
