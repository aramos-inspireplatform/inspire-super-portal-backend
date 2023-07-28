import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Currencies } from './Currencies';
import { TenantsDataMapper } from './Tenants';
import { BaseEntity } from '~/shared/infra/database/entities/base';
import { ColumnNumericTransformer } from '~/shared/infra/database/helpers/ColumnNumericTransformer.helper';

@Entity('tenant_balances', { schema: 'public' })
export class TenantBalancesDataMapper extends BaseEntity {
  @Column('uuid', { name: 'tenants_id' })
  tenantId: string;

  @Column('uuid', { name: 'settlement_currencies_id' })
  settlementCurrencyId: string;

  @Column('numeric', {
    name: 'amount',
    precision: 15,
    scale: 6,
    transformer: new ColumnNumericTransformer(),
  })
  amount: number;

  @ManyToOne(() => TenantsDataMapper, (tenants) => tenants.tenantBalances, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'tenants_id', referencedColumnName: 'id' }])
  tenant: TenantsDataMapper;

  @ManyToOne(() => Currencies, (currencies) => currencies.tenantBalances, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([
    { name: 'settlement_currencies_id', referencedColumnName: 'id' },
  ])
  settlementCurrency: Currencies;
}
