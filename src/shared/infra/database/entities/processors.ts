import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '~/shared/infra/database/entities/base';

@Index('uq__processors__name', ['deletedDate', 'name'], { unique: true })
@Index('pk__processors', ['id'], { unique: true })
@Index('uq__part__processors__name', ['name'], { unique: true })
@Entity('processors', { schema: 'public' })
export class Processors extends BaseEntity {
  @Column('character varying', { name: 'name', length: 200 })
  name: string;

  @Column('boolean', { name: 'is_active' })
  isActive: boolean;

  @Column('character varying', {
    name: 'wrapper_integration_id',
    nullable: true,
    length: 300,
  })
  wrapperIntegrationId: string | null;
}
