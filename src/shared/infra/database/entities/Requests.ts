import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Relation,
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

  @OneToMany(() => RequestModules, (requestModules) => requestModules.request)
  requestModules: Relation<RequestModules[]>;

  @ManyToOne(
    () => RequestStatuses,
    (requestStatuses) => requestStatuses.requests,
    { onDelete: 'RESTRICT', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'request_status', referencedColumnName: 'id' }])
  requestStatus: Relation<RequestStatuses>;

  @ManyToOne(() => Tenants, (tenants) => tenants.requests, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'tenant_id', referencedColumnName: 'id' }])
  tenant: Relation<Tenants>;
}
