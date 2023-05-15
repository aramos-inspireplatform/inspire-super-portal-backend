import { Column, Entity, Index, OneToMany, Relation } from 'typeorm';
import { RequestModuleAttempts } from './RequestModuleAttempts';
import { BaseEntity } from '~/shared/infra/database/entities/base';

@Index('uq__module_provision_request_statuses__name', ['deletedDate', 'name'], {
  unique: true,
})
@Index('pk__request_module_attempt_statuses', ['id'], { unique: true })
@Index('uq__part__module_provision_request_statuses__name', ['name'], {
  unique: true,
})
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
