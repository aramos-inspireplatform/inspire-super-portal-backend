import { BaseDomainEntity } from '~/shared/domain/entity/base-domain.entity';
import { InstanceProperties } from '~/shared/types/class-properties.type';

export class PaymentGatewayCalculatorEntity extends BaseDomainEntity {
  paymentGatewayId: string;

  isEnable: boolean;

  hashLink?: string;

  constructor(attrs?: InstanceProperties<PaymentGatewayCalculatorEntity>) {
    super(attrs);
    Object.assign(this, attrs);
  }
}
