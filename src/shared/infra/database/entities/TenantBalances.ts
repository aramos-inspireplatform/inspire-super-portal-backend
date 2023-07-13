import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Currencies } from './Currencies';
import { Tenants } from './Tenants';
import { BaseEntity } from '~/shared/infra/database/entities/base';
import { ColumnNumericTransformer } from '~/shared/infra/database/helpers/ColumnNumericTransformer.helper';

@Index(
  'idx__uq__tenant_balances',
  ['deletedDate', 'settlementCurrenciesId', 'tenantId'],
  { unique: true },
)
@Index('pk__tenant_balances', ['id'], { unique: true })
@Index(
  'idx__part__uq__tenant_balances',
  ['settlementCurrenciesId', 'tenantId'],
  { unique: true },
)
@Entity('tenant_balances', { schema: 'public' })
export class TenantBalances extends BaseEntity {
  @Column('uuid', { name: 'tenants_id' })
  tenantId: string;

  @Column('uuid', { name: 'settlement_currencies_id' })
  settlementCurrenciesId: string;

  @Column('numeric', {
    name: 'amount',
    precision: 15,
    scale: 6,
    transformer: new ColumnNumericTransformer(),
  })
  amount: number;

  @ManyToOne(() => Currencies, (currencies) => currencies.tenantBalances, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([
    { name: 'settlement_currencies_id', referencedColumnName: 'id' },
  ])
  settlementCurrency: Currencies;

  @ManyToOne(() => Tenants, (tenants) => tenants.tenantBalances, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'tenants_id', referencedColumnName: 'id' }])
  tenant: Tenants;
}
