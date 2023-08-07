import { Column, Entity, Index, OneToMany, Relation } from 'typeorm';
import { BaseEntity } from '~/shared/infra/database/entities/base';
import { TenantPayouts } from './TenantPayouts';

@Index('idx__uq__payout_statuses', ['deletedDate', 'slug'], { unique: true })
@Index('pk__payout_statuses', ['id'], { unique: true })
@Index('idx__part__uq__payout_statuses', ['slug'], { unique: true })
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
