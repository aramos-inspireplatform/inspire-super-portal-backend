import { Column, Entity, Index, OneToMany } from 'typeorm';
import { TenantBalances } from './TenantBalances';
import { TenantPayouts } from './TenantPayouts';
import { BaseEntity } from '~/shared/infra/database/entities/base';

@Index('idx__uq__currencies', ['deletedDate', 'isoCode'], { unique: true })
@Index('pk__currencies', ['id'], { unique: true })
@Index('idx__part__uq__currencies', ['isoCode'], { unique: true })
@Entity('currencies', { schema: 'public' })
export class Currencies extends BaseEntity {
  @Column('character varying', { name: 'name', length: 50 })
  name: string;

  @Column('character varying', { name: 'symbol', length: 5 })
  symbol: string;

  @Column('character varying', { name: 'iso_code', length: 3 })
  isoCode: string;

  @OneToMany(
    () => TenantBalances,
    (tenantBalances) => tenantBalances.settlementCurrency,
  )
  tenantBalances: TenantBalances[];

  @OneToMany(
    () => TenantPayouts,
    (tenantPayouts) => tenantPayouts.settlementCurrency,
  )
  tenantPayouts: TenantPayouts[];
}
