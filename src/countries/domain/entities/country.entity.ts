import { BaseDomainEntity } from '~/shared/domain/entity/base-domain.entity';
import { InstanceProperties } from '~/shared/types/class-properties.type';

export class Country extends BaseDomainEntity {
  name: string;
  code: string;
  nativeName: string;
  flagSvgUrl: string;
  wrapperIntegrationId: string;

  constructor(attrs: InstanceProperties<Country>) {
    super(attrs);
    this.name = attrs?.name;
    this.code = attrs?.code;
    this.nativeName = attrs?.nativeName;
    this.flagSvgUrl = attrs?.flagSvgUrl;
    this.wrapperIntegrationId = attrs?.wrapperIntegrationId;
  }
}
