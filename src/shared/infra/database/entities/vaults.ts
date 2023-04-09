import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '~/shared/infra/database/entities/base';

@Index('uq__vault__name', ['deletedDate', 'name'], { unique: true })
@Index('pk__vaults', ['id'], { unique: true })
@Index('uq__part__vault__name', ['name'], { unique: true })
@Entity('vaults', { schema: 'public' })
export class Vaults extends BaseEntity {
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
