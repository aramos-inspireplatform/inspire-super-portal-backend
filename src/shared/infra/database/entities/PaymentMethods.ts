import { Column, Entity } from 'typeorm';
import { BaseEntity } from '~/shared/infra/database/entities/base';

@Entity('payment_methods', { schema: 'public' })
export class PaymentMethods extends BaseEntity {
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
