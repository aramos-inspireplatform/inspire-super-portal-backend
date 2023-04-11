import { BaseDomainEntity } from '~/shared/domain/entity/base-domain.entity';
import { InstanceProperties } from '~/shared/types/class-properties.type';

export class ModuleRequestType extends BaseDomainEntity {
  name: string;

  wrapperIntegrationId?: string;

  constructor(attrs: InstanceProperties<ModuleRequestType>) {
    super(attrs);
    this.name = attrs?.name;
    this.wrapperIntegrationId = attrs?.wrapperIntegrationId;
  }
}
