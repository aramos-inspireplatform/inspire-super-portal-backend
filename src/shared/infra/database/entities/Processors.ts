import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '~/shared/infra/database/entities/base';

@Entity('processors', { schema: 'public' })
export class Processors extends BaseEntity {
  @Column('character varying', { name: 'name', length: 200 })
  name: string;

  @Column('boolean', { name: 'is_active' })
  isActive: boolean;

  @Column('character varying', {
    name: 'integration_code',
    length: 50,
  })
  integrationCode: string;

  @Column('boolean', { name: 'is_payout_available' })
  isPayoutAvailable: boolean;

  @Column('boolean', { name: 'is_calculator_available' })
  isCalculatorAvailable: boolean;
}
