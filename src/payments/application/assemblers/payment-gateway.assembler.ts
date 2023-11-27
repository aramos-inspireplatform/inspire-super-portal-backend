import { PaymentGatewayEntity } from '~/payments/domain/entity/payment-gateway.entity';

export class PaymentGatewayAssembler {
  static assembly(input?: PaymentGatewayAssembler.Input): PaymentGatewayEntity {
    if (!input) return new PaymentGatewayEntity();
    return new PaymentGatewayEntity({
      id: input.id,
      isCalculatorActive: input.isCalculatorActive,
      isCalculatorAvailable: input.isCalculatorAvailable,
    });
  }
}

export namespace PaymentGatewayAssembler {
  export type Input = {
    id: string;
    isCalculatorActive: boolean;
    isCalculatorAvailable: boolean;
  };
}
