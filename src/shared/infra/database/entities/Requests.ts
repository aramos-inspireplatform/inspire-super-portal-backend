import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '~/shared/infra/database/entities/base';

import { ModuleRequests } from './ModuleRequests';
import { RequestStatuses } from './RequestStatuses';
import { Tenants } from './Tenants';

@Index('pk__requests', ['id'], { unique: true })
@Entity('requests', { schema: 'public' })
export class Requests extends BaseEntity {
  @Column('character varying', { name: 'created_by_user_id', length: 300 })
  createdByUserId: string;

  @Column('character varying', { name: 'created_by_user_email', length: 300 })
  createdByUserEmail: string;

  @ManyToOne(
    () => ModuleRequests,
    (moduleRequests) => moduleRequests.requests,
    { onDelete: 'RESTRICT', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'module_request_id', referencedColumnName: 'id' }])
  moduleRequest: ModuleRequests;

  @ManyToOne(
    () => RequestStatuses,
    (requestStatuses) => requestStatuses.requests,
    { onDelete: 'RESTRICT', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'request_status', referencedColumnName: 'id' }])
  requestStatus: RequestStatuses;

  @ManyToOne(() => Tenants, (tenants) => tenants.requests, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'tenant_id', referencedColumnName: 'id' }])
  tenant: Tenants;
}
