import { BaseDomainEntity } from '~/shared/domain/entity/base-domain.entity';
import { InstanceProperties } from '~/shared/types/class-properties.type';

export class TenantPayouts extends BaseDomainEntity {
  constructor(attrs: InstanceProperties<TenantPayouts>) {
    super(attrs);
  }
}
