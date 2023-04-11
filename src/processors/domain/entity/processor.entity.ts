import { BaseDomainEntity } from '~/shared/domain/entity/base-domain.entity';
import { InstanceProperties } from '~/shared/types/class-properties.type';

export class Processor extends BaseDomainEntity {
  name: string;

  isActive: boolean;

  wrapperIntegrationId?: string;

  constructor(attrs: InstanceProperties<Processor>) {
    super(attrs);
    this.name = attrs?.name;
    this.isActive = attrs?.isActive;
    this.wrapperIntegrationId = attrs?.wrapperIntegrationId;
  }
}
