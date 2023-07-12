import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Currencies } from './Currencies';
import { Tenants } from './Tenants';
import { BaseEntity } from '~/shared/infra/database/entities/base';

@Index(
  'idx__uq__tenant_balances',
  ['deletedDate', 'settlementCurrenciesId', 'tenantsId'],
  { unique: true },
)
@Index('pk__tenant_balances', ['id'], { unique: true })
@Index(
  'idx__part__uq__tenant_balances',
  ['settlementCurrenciesId', 'tenantsId'],
  { unique: true },
)
@Entity('tenant_balances', { schema: 'public' })
export class TenantBalances extends BaseEntity {
  @Column('uuid', { name: 'tenants_id' })
  tenantsId: string;

  @Column('uuid', { name: 'settlement_currencies_id' })
  settlementCurrenciesId: string;

  @Column('numeric', { name: 'amount', precision: 15, scale: 6 })
  amount: number;

  @ManyToOne(() => Currencies, (currencies) => currencies.tenantBalances, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([
    { name: 'settlement_currencies_id', referencedColumnName: 'id' },
  ])
  settlementCurrencies: Currencies;

  @ManyToOne(() => Tenants, (tenants) => tenants.tenantBalances, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'tenants_id', referencedColumnName: 'id' }])
  tenants: Tenants;
}
