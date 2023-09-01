import { Column, Entity, OneToMany, Relation } from 'typeorm';
import { Requests } from './Requests';
import { BaseEntity } from '~/shared/infra/database/entities/base';

@Entity('request_statuses', { schema: 'public' })
export class RequestStatuses extends BaseEntity {
  @Column('character varying', { name: 'name', length: 200 })
  name: string;

  @OneToMany(() => Requests, (requests) => requests.requestStatus)
  requests: Relation<Requests[]>;
}
