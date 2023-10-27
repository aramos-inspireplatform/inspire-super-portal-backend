import { Column, Entity } from 'typeorm';
import { BaseEntity } from '~/shared/infra/database/entities/base';

@Entity('vaults', { schema: 'public' })
export class Vaults extends BaseEntity {
  @Column('character varying', { name: 'name', length: 200 })
  name: string;

  @Column('boolean', { name: 'is_active' })
  isActive: boolean;

  @Column('character varying', {
    name: 'integration_code',
    length: 50,
  })
  integrationCode: string;
}
