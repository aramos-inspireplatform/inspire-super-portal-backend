import { Column, Entity, Index, OneToMany, Relation } from 'typeorm';
import { BaseEntity } from '~/shared/infra/database/entities/base';

import { Requests } from './Requests';

@Index('uq__request_statuses__name', ['deletedDate', 'name'], { unique: true })
@Index('pk__request_statuses', ['id'], { unique: true })
@Index('uq__part__request_statuses__name', ['name'], { unique: true })
@Entity('request_statuses', { schema: 'public' })
export class RequestStatuses extends BaseEntity {
  @Column('character varying', { name: 'name', length: 200 })
  name: string;

  @OneToMany(() => Requests, (requests) => requests.requestStatus)
  requests: Relation<Requests[]>;
}
