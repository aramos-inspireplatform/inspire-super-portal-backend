import { Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '~/shared/infra/database/entities/base';

import { ModuleRequests } from './ModuleRequests';
import { Requests } from './Requests';

@Index('pk__request_module_requests', ['id'], { unique: true })
@Entity('request_module_requests', { schema: 'public' })
export class RequestModuleRequests extends BaseEntity {
  @ManyToOne(
    () => ModuleRequests,
    (moduleRequests) => moduleRequests.requestModuleRequests,
    { onDelete: 'RESTRICT', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'module_request_id', referencedColumnName: 'id' }])
  moduleRequest: ModuleRequests;

  @ManyToOne(() => Requests, (requests) => requests.requestModuleRequests, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'request_id', referencedColumnName: 'id' }])
  request: Requests;
}
