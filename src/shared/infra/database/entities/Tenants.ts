import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Relation,
} from 'typeorm';
import { Requests } from './Requests';
import { TenantStatuses } from './TenantStatuses';
import { BaseEntity } from '~/shared/infra/database/entities/base';

@Index('pk__tenants', ['id'], { unique: true })
@Entity('tenants', { schema: 'public' })
export class Tenants extends BaseEntity {
  @Column('character varying', { name: 'name', length: 200 })
  name: string;

  @Column('character varying', { name: 'tenant_id', length: 300 })
  tenantId: string;

  @Column('character varying', {
    name: 'integration_code',
    nullable: true,
    length: 50,
  })
  integrationCode: string | null;

  @Column('character varying', { name: 'created_by_user_id', length: 300 })
  createdByUserId: string;

  @Column('character varying', { name: 'created_by_user_email', length: 300 })
  createdByUserEmail: string;

  @OneToMany(() => Requests, (requests) => requests.tenant)
  requests: Relation<Requests[]>;

  @ManyToOne(() => TenantStatuses, (tenantStatuses) => tenantStatuses.tenants, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
    eager: true,
  })
  @JoinColumn([{ name: 'tenant_status_id', referencedColumnName: 'id' }])
  tenantStatus: Relation<TenantStatuses>;
}
