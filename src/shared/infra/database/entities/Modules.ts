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

  @Column('character varying', { name: 'status_url' })
  statusUrl: string;

  @Column('integer', { name: 'time_span' })
  timeSpan: number;

  @Column('integer', { name: 'minimum_time_span' })
  minimumTimeSpan: number;

  @Column('character varying', { name: 'integration_key' })
  integrationKey: string;

  @OneToMany(() => RequestModules, (requestModules) => requestModules.module)
  requestModules: Relation<RequestModules[]>;
}
