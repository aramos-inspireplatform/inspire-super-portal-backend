import { BaseDomainEntity } from '~/shared/domain/entity/base-domain.entity';
import { InstanceProperties } from '~/shared/types/class-properties.type';

export class PaymentGatewayEntity extends BaseDomainEntity {
  isCalculatorActive: boolean;
  isCalculatorAvailable: boolean;

  constructor(attrs?: InstanceProperties<PaymentGatewayEntity>) {
    super(attrs);
    Object.assign(this, attrs);
  }
}
