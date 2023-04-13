import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  Relation,
} from 'typeorm';
import { RequestModules } from './RequestModules';
import { RequestModuleAttemptStatuses } from './RequestModuleAttemptStatuses';
import { BaseEntity } from '~/shared/infra/database/entities/base';

@Index('pk__module_request_attempts', ['id'], { unique: true })
@Entity('request_module_attempts', { schema: 'public' })
export class RequestModuleAttempts extends BaseEntity {
  @Column('character varying', { name: 'created_by_user_id', length: 300 })
  createdByUserId: string;

  @Column('jsonb', { name: 'provision_api_request_body', nullable: true })
  provisionApiRequestBody: object | null;

  @Column('jsonb', { name: 'provision_api_response_body', nullable: true })
  provisionApiResponseBody: object | null;

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

  @Column('jsonb', { name: 'webhook_response_body', nullable: true })
  webhookResponseBody: object | null;

  @ManyToOne(
    () => RequestModules,
    (requestModules) => requestModules.requestModuleAttempts,
    { onDelete: 'RESTRICT', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'module_request_id', referencedColumnName: 'id' }])
  moduleRequest: Relation<RequestModules>;

  @ManyToOne(
    () => RequestModuleAttemptStatuses,
    (requestModuleAttemptStatuses) =>
      requestModuleAttemptStatuses.requestModuleAttempts,
    { onDelete: 'RESTRICT', onUpdate: 'CASCADE' },
  )
  @JoinColumn([
    { name: 'request_module_attempt_status_id', referencedColumnName: 'id' },
  ])
  requestModuleAttemptStatus: Relation<RequestModuleAttemptStatuses>;
}
