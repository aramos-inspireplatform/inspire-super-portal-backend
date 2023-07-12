import {
  BaseEntity,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TenantBalances } from './TenantBalances';
import { TenantPayouts } from './TenantPayouts';

@Index('idx__uq__currencies', ['deletedDate', 'isoCode'], { unique: true })
@Index('pk__currencies', ['id'], { unique: true })
@Index('idx__part__uq__currencies', ['isoCode'], { unique: true })
@Entity('currencies', { schema: 'public' })
export class Currencies extends BaseEntity {
  @Column('uuid', { primary: true, name: 'id' })
  id: string;

  @PrimaryGeneratedColumn({ type: 'bigint', name: 'alternative_id' })
  alternativeId: string;

  @Column('character varying', { name: 'name', length: 50 })
  name: string;

  @Column('character varying', { name: 'symbol', length: 5 })
  symbol: string;

  @Column('character varying', { name: 'iso_code', length: 3 })
  isoCode: string;

  @Column('timestamp with time zone', { name: 'created_date' })
  createdDate: Date;

  @Column('timestamp with time zone', { name: 'updated_date', nullable: true })
  updatedDate: Date | null;

  @Column('timestamp with time zone', { name: 'deleted_date', nullable: true })
  deletedDate: Date | null;

  @OneToMany(
    () => TenantBalances,
    (tenantBalances) => tenantBalances.settlementCurrencies,
  )
  tenantBalances: TenantBalances[];

  @OneToMany(
    () => TenantPayouts,
    (tenantPayouts) => tenantPayouts.settlementCurrencies,
  )
  tenantPayouts: TenantPayouts[];
}
