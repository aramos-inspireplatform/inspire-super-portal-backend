import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Currencies } from './Currencies';
import { Tenants } from './Tenants';

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
  @Column('uuid', { primary: true, name: 'id' })
  id: string;

  @PrimaryGeneratedColumn({ type: 'bigint', name: 'alternative_id' })
  alternativeId: string;

  @Column('uuid', { name: 'tenants_id' })
  tenantsId: string;

  @Column('uuid', { name: 'settlement_currencies_id' })
  settlementCurrenciesId: string;

  @Column('numeric', { name: 'amount', precision: 15, scale: 6 })
  amount: string;

  @Column('timestamp with time zone', { name: 'created_date' })
  createdDate: Date;

  @Column('timestamp with time zone', { name: 'updated_date', nullable: true })
  updatedDate: Date | null;

  @Column('timestamp with time zone', { name: 'deleted_date', nullable: true })
  deletedDate: Date | null;

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
