import { BaseDomainEntity } from '~/shared/domain/entity/base-domain.entity';
import { InstanceProperties } from '~/shared/types/class-properties.type';

export class ModuleRequestStatus extends BaseDomainEntity {
  name: string;

  constructor(attrs: InstanceProperties<ModuleRequestStatus>) {
    super(attrs);
    this.name = attrs?.name;
  }
}
