import { Column, Entity, Index, OneToMany, Relation } from 'typeorm';
import { RequestModules } from './RequestModules';
import { BaseEntity } from '~/shared/infra/database/entities/base';

@Index('uq__module_request_types__name', ['deletedDate', 'name'], {
  unique: true,
})
@Index('pk__modules', ['id'], { unique: true })
@Index('uq__part__module_request_types__name', ['name'], { unique: true })
@Entity('modules', { schema: 'public' })
export class Modules extends BaseEntity {
  @Column('character varying', { name: 'name', length: 200 })
  name: string;

  @Column('character varying', { name: 'deploy_url' })
  deployUrl: string;

  @Column('character varying', {
    name: 'wrapper_integration_id',
    nullable: true,
    length: 300,
  })
  wrapperIntegrationId: string | null;

  @OneToMany(
    () => RequestModules,
    (requestModules) => requestModules.moduleRequestType,
  )
  requestModules: Relation<RequestModules[]>;
}
