import { BaseDomainEntity } from '~/shared/domain/entity/base-domain.entity';
import { InstanceProperties } from '~/shared/types/class-properties.type';

/**
 * Ref: request_statuses
 */
export class RequestStatus extends BaseDomainEntity {
  name: string;

  constructor(attrs: InstanceProperties<RequestStatus>) {
    super(attrs);
    this.name = attrs.name;
  }
}
