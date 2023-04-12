import { Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '~/shared/infra/database/entities/base';

import { ModuleProvisionRequests } from './ModuleProvisionRequests';
import { ModuleRequests } from './ModuleRequests';

@Index('pk__module_request_module_provision_requests', ['id'], { unique: true })
@Entity('module_request_module_provision_requests', { schema: 'public' })
export class ModuleRequestModuleProvisionRequests extends BaseEntity {
  @ManyToOne(
    () => ModuleProvisionRequests,
    (moduleProvisionRequests) =>
      moduleProvisionRequests.moduleRequestModuleProvisionRequests,
    { onDelete: 'RESTRICT', onUpdate: 'CASCADE' },
  )
  @JoinColumn([
    { name: 'module_provision_request_id', referencedColumnName: 'id' },
  ])
  moduleProvisionRequest: ModuleProvisionRequests;

  @ManyToOne(
    () => ModuleRequests,
    (moduleRequests) => moduleRequests.moduleRequestModuleProvisionRequests,
    { onDelete: 'RESTRICT', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'module_request_id', referencedColumnName: 'id' }])
  moduleRequest: ModuleRequests;
}
