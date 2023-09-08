import { Column, Entity, OneToMany, Relation } from 'typeorm';
import { RequestModules } from './RequestModules';
import { BaseEntity } from '~/shared/infra/database/entities/base';

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
