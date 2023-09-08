import { PaymentProcessorDomainEntity } from '~/requests/domain/entities/payment-processor.entity';

export class PaymentProcessorAssembler {
  static assembly(input: PaymentProcessorAssembler.Input) {
    if (!input) return new PaymentProcessorDomainEntity();
    return new PaymentProcessorDomainEntity({
      id: input.id,
      name: input.name,
      isActive: input.isActive,
      isPayoutAvailable: input.isPayoutAvailable,
    });
  }
}

export namespace PaymentProcessorAssembler {
  export type Input = {
    id: string;
    name: string;
    isActive: boolean;
    isPayoutAvailable: boolean;
  };
}
