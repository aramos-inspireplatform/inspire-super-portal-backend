import { Column, Entity, Index, OneToMany, Relation } from 'typeorm';
import { BaseEntity } from '~/shared/infra/database/entities/base';

import { ModuleRequests } from './ModuleRequests';

@Index('uq__module_request_types__name', ['deletedDate', 'name'], {
  unique: true,
})
@Index('pk__module_types', ['id'], { unique: true })
@Index('uq__part__module_request_types__name', ['name'], { unique: true })
@Entity('module_request_types', { schema: 'public' })
export class ModuleRequestTypes extends BaseEntity {
  @Column('character varying', { name: 'name', length: 200 })
  name: string;

  @Column('character varying', {
    name: 'wrapper_integration_id',
    nullable: true,
    length: 300,
  })
  wrapperIntegrationId: string | null;

  @OneToMany(
    () => ModuleRequests,
    (moduleRequests) => moduleRequests.moduleRequestType,
  )
  moduleRequests: Relation<ModuleRequests[]>;
}
