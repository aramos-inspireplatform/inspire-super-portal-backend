import { BaseDomainEntity } from '~/shared/domain/entity/base-domain.entity';
import { InstanceProperties } from '~/shared/types/class-properties.type';

export class RequestModuleStatus extends BaseDomainEntity {
  name: string;

  constructor(attrs: InstanceProperties<RequestModuleStatus>) {
    super(attrs);
    this.name = attrs.name;
  }
}
