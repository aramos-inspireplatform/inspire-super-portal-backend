import { BaseDomainEntity } from '~/shared/domain/entity/base-domain.entity';
import { BadRequestException } from '~/shared/domain/exceptions';
import { InstanceProperties } from '~/shared/types/class-properties.type';

export class Processor extends BaseDomainEntity {
  name: string;

  isActive: boolean;

  integrationCode?: string;

  isPayoutAvailable?: boolean;

  isCalculatorAvailable?: boolean;

  constructor(attrs: InstanceProperties<Processor>) {
    super(attrs);
    this.name = attrs?.name;
    this.isActive = attrs?.isActive;
    this.integrationCode = attrs?.integrationCode;
    this.isPayoutAvailable = attrs?.isPayoutAvailable;
    this.isCalculatorAvailable = attrs?.isCalculatorAvailable;
  }

  isCalculatorAvailableOrThrow() {
    if (!this.isCalculatorAvailable) {
      throw new BadRequestException(
        'Calculator is not available for this processor',
      );
    }
  }
}
