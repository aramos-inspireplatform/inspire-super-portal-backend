import { BaseDomainEntity } from '~/shared/domain/entity/base-domain.entity';
import { InstanceProperties } from '~/shared/types/class-properties.type';

export class Module extends BaseDomainEntity {
  name: string;

  deployUrl: string;

  constructor(attrs: InstanceProperties<Module>) {
    super(attrs);
    this.name = attrs.name;
    this.deployUrl = attrs.deployUrl;
  }
}
