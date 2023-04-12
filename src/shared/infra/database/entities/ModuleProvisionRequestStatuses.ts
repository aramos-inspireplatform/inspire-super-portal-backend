import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseEntity } from '~/shared/infra/database/entities/base';

import { ModuleProvisionRequests } from './ModuleProvisionRequests';

@Index('uq__module_provision_request_statuses__name', ['deletedDate', 'name'], {
  unique: true,
})
@Index('pk__module_provision_request_statuses', ['id'], { unique: true })
@Index('uq__part__module_provision_request_statuses__name', ['name'], {
  unique: true,
})
@Entity('module_provision_request_statuses', { schema: 'public' })
export class ModuleProvisionRequestStatuses extends BaseEntity {
  @Column('character varying', { name: 'name', length: 200 })
  name: string;

  @OneToMany(
    () => ModuleProvisionRequests,
    (moduleProvisionRequests) =>
      moduleProvisionRequests.moduleProvisionRequestStatus,
  )
  moduleProvisionRequests: ModuleProvisionRequests[];
}
