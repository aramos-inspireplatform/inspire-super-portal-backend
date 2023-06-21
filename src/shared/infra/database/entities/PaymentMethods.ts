import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '~/shared/infra/database/entities/base';

@Index('uq__payment_methods__name', ['deletedDate', 'name'], { unique: true })
@Index('pk__payment_methods', ['id'], { unique: true })
@Index('uq__part__payment_methods__name', ['name'], { unique: true })
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
