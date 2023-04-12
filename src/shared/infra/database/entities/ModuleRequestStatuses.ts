import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseEntity } from '~/shared/infra/database/entities/base';

import { ModuleRequests } from './ModuleRequests';

@Index('uq__module_request_statuses__name', ['deletedDate', 'name'], {
  unique: true,
})
@Index('pk__module_request_statuses', ['id'], { unique: true })
@Index('uq__part__module_request_statuses__name', ['name'], { unique: true })
@Entity('module_request_statuses', { schema: 'public' })
export class ModuleRequestStatuses extends BaseEntity {
  @Column('character varying', { name: 'name', length: 200 })
  name: string;

  @OneToMany(
    () => ModuleRequests,
    (moduleRequests) => moduleRequests.moduleRequestStatus,
  )
  moduleRequests: ModuleRequests[];
}
