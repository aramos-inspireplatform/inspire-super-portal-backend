import { Column, Entity, Index, OneToMany, Relation } from 'typeorm';
import { RequestModules } from './RequestModules';
import { BaseEntity } from '~/shared/infra/database/entities/base';

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
    () => RequestModules,
    (requestModules) => requestModules.moduleRequestStatus,
  )
  requestModules: Relation<RequestModules[]>;
}
