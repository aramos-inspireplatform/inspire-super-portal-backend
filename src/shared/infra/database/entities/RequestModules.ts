import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Relation,
} from 'typeorm';
import { RequestModuleAttempts } from './RequestModuleAttempts';
import { ModuleRequestStatuses } from './ModuleRequestStatuses';
import { Modules } from './Modules';
import { Requests } from './Requests';
import { BaseEntity } from '~/shared/infra/database/entities/base';

@Index('pk__request_module', ['id'], { unique: true })
@Entity('request_modules', { schema: 'public' })
export class RequestModules extends BaseEntity {
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
    () => RequestModuleAttempts,
    (requestModuleAttempts) => requestModuleAttempts.moduleRequest,
    {
      eager: true,
      cascade: ['insert'],
    },
  )
  requestModuleAttempts: Relation<RequestModuleAttempts[]>;

  @ManyToOne(
    () => ModuleRequestStatuses,
    (moduleRequestStatuses) => moduleRequestStatuses.requestModules,
    {
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
      eager: true,
    },
  )
  @JoinColumn([
    { name: 'module_request_status_id', referencedColumnName: 'id' },
  ])
  moduleRequestStatus: Relation<ModuleRequestStatuses>;

  @ManyToOne(() => Modules, (modules) => modules.requestModules, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
    eager: true,
  })
  @JoinColumn([{ name: 'module_request_type_id', referencedColumnName: 'id' }])
  moduleRequestType: Relation<Modules>;

  @ManyToOne(() => Requests, (requests) => requests.requestModules, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'request_id', referencedColumnName: 'id' }])
  request: Relation<Requests>;
}
