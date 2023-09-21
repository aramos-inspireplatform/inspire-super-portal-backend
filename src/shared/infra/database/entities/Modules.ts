import { Column, Entity, OneToMany, Relation } from 'typeorm';
import { RequestModules } from './RequestModules';
import { BaseEntity } from '~/shared/infra/database/entities/base';

@Entity('modules', { schema: 'public' })
export class Modules extends BaseEntity {
  @Column('character varying', { name: 'name', length: 200 })
  name: string;

  @Column('character varying', { name: 'deploy_url' })
  deployUrl: string;

  @Column('character varying', {
    name: 'integration_code',
    length: 50,
  })
  integrationCode: string;

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
