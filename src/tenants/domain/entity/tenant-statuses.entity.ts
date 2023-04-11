import { BaseDomainEntity } from '~/shared/domain/entity/base-domain.entity';
import { InstanceProperties } from '~/shared/types/class-properties.type';

export class TenantStatus extends BaseDomainEntity {
  name: string;

  constructor(attrs: InstanceProperties<TenantStatus>) {
    super(attrs);
    this.name = attrs?.name;
  }
}
