import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '~/shared/infra/database/entities/base';

@Index('uq__settlement_currencies__name', ['deletedDate', 'name'], {
  unique: true,
})
@Index('pk__settlement_currencies', ['id'], { unique: true })
@Index('uq__part__settlement_currencies__name', ['name'], { unique: true })
@Entity('settlement_currencies', { schema: 'public' })
export class SettlementCurrencies extends BaseEntity {
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
