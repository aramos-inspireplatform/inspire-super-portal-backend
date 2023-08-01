import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { RequestModules } from './RequestModules';
import { RequestStatuses } from './RequestStatuses';
import { Tenants } from './Tenants';
import { BaseEntity } from '~/shared/infra/database/entities/base';

@Index('pk__requests', ['id'], { unique: true })
@Entity('requests', { schema: 'public' })
export class Requests extends BaseEntity {
  @Column('character varying', { name: 'created_by_user_id', length: 300 })
  createdByUserId: string;

  @Column('character varying', { name: 'created_by_user_email', length: 300 })
  createdByUserEmail: string;

  @OneToMany(() => RequestModules, (requestModules) => requestModules.request, {
    cascade: ['update'],
  })
  requestModules: RequestModules[];

  @ManyToOne(
    () => RequestStatuses,
    (requestStatuses) => requestStatuses.requests,
    {
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',

      cascade: ['update'],
    },
  )
  @JoinColumn([{ name: 'request_status_id', referencedColumnName: 'id' }])
  requestStatus: RequestStatuses;

  @ManyToOne(() => Tenants, (tenants) => tenants.requests, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
    cascade: ['update'],
  })
  @JoinColumn([{ name: 'tenant_id', referencedColumnName: 'id' }])
  tenant: Tenants;
}
