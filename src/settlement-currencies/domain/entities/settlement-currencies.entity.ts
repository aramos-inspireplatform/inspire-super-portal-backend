import { BaseDomainEntity } from '~/shared/domain/entity/base-domain.entity';
import { InstanceProperties } from '~/shared/types/class-properties.type';

export class SettlementCurrency extends BaseDomainEntity {
  id: string;
  name: string;
  isActive: boolean;
  integrationCode: string;

  constructor(attrs: InstanceProperties<SettlementCurrency>) {
    super(attrs);
    this.name = attrs?.name;
    this.isActive = attrs?.isActive;
    this.integrationCode = attrs?.integrationCode;
  }
}
