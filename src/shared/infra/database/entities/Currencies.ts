import { Column, Entity, OneToMany } from 'typeorm';
import { TenantBalancesDataMapper } from './TenantBalances';
import { TenantPayouts } from './TenantPayouts';
import { BaseEntity } from '~/shared/infra/database/entities/base';

@Entity('currencies', { schema: 'public' })
export class Currencies extends BaseEntity {
  @Column('character varying', { name: 'name', length: 50 })
  name: string;

  @Column('character varying', { name: 'symbol', length: 5 })
  symbol: string;

  @Column('character varying', { name: 'iso_code', length: 3 })
  isoCode: string;

  @OneToMany(
    () => TenantBalancesDataMapper,
    (tenantBalances) => tenantBalances.settlementCurrency,
  )
  tenantBalances: TenantBalancesDataMapper[];

  @OneToMany(
    () => TenantPayouts,
    (tenantPayouts) => tenantPayouts.settlementCurrency,
  )
  tenantPayouts: TenantPayouts[];
}
