import { Column, Entity, OneToMany, Relation } from 'typeorm';
import { BaseEntity } from '~/shared/infra/database/entities/base';
import { TenantPayouts } from './TenantPayouts';

@Entity('payout_statuses', { schema: 'public' })
export class PayoutStatuses extends BaseEntity {
  @Column('character varying', { name: 'name', length: 50 })
  name: string;

  @Column('character varying', { name: 'slug', length: 50 })
  slug: string;

  @OneToMany(() => TenantPayouts, (tenantPayouts) => tenantPayouts.payoutStatus)
  tenantPayouts: TenantPayouts[];

  @OneToMany(() => TenantPayouts, (payouts) => payouts.payoutStatus)
  payoutStatus: Relation<PayoutStatuses>;
}
