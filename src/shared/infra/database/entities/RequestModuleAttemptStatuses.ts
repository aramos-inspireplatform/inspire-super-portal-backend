import { Column, Entity, OneToMany, Relation } from 'typeorm';
import { RequestModuleAttempts } from './RequestModuleAttempts';
import { BaseEntity } from '~/shared/infra/database/entities/base';

@Entity('request_module_attempt_statuses', { schema: 'public' })
export class RequestModuleAttemptStatuses extends BaseEntity {
  @Column('character varying', { name: 'name', length: 200 })
  name: string;

  @OneToMany(
    () => RequestModuleAttempts,
    (requestModuleAttempts) => requestModuleAttempts.requestModuleAttemptStatus,
  )
  requestModuleAttempts: Relation<RequestModuleAttempts[]>;
}
