import { BaseDomainEntity } from '~/shared/domain/entity/base-domain.entity';
import { InstanceProperties } from '~/shared/types/class-properties.type';

export class RecurringInterval extends BaseDomainEntity {
  name: string;
  interval: string;
  isActive: boolean;

  constructor(attrs: InstanceProperties<RecurringInterval>) {
    super(attrs);
    this.name = attrs?.name;
    this.interval = attrs?.interval;
    this.isActive = attrs?.isActive;
  }
}
