import { BaseDomainEntity } from '~/shared/domain/entity/base-domain.entity';
import { InstanceProperties } from '~/shared/types/class-properties.type';

export class RequestModuleAttemptsStatus extends BaseDomainEntity {
  name: string;

  constructor(attrs: InstanceProperties<RequestModuleAttemptsStatus>) {
    super(attrs);
    this.name = attrs.name;
  }
}
