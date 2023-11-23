import { PaymentGatewayCalculatorEntity } from '~/calculator/domain/entity/payment-gateway-calculator.entity';

export class PaymentGatewayCalculatorAssembler {
  static assembly(
    input?: PaymentGatewayCalculatorAssembler.Input,
  ): PaymentGatewayCalculatorEntity {
    if (!input) return new PaymentGatewayCalculatorEntity();
    return new PaymentGatewayCalculatorEntity({
      paymentGatewayId: input.paymentGatewayId,
      isEnable: input.isEnable,
    });
  }
}

export namespace PaymentGatewayCalculatorAssembler {
  export type Input = {
    paymentGatewayId: string;
    isEnable: boolean;
  };
}
