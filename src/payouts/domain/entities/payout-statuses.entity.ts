import { TenantPayoutsEntity } from '~/payouts/domain/entities/tenant-payouts.entity';
import { BaseDomainEntity } from '~/shared/domain/entity/base-domain.entity';
import { InstanceProperties } from '~/shared/types/class-properties.type';

export class PayoutStatusesEntity extends BaseDomainEntity {
  name: string;
  slug: string;
  tenantPayouts: TenantPayoutsEntity[];

  constructor(attrs: InstanceProperties<PayoutStatusesEntity>) {
    super(attrs);
    this.name = attrs?.name;
    this.slug = attrs?.slug;
    this.tenantPayouts = attrs?.tenantPayouts;
  }
}
