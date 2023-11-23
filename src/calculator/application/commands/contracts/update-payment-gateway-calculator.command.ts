export interface IUpdatePaymentGatewayCalculatorCommand {
  execute(
    input: IUpdatePaymentGatewayCalculatorCommand.Input,
  ): Promise<IUpdatePaymentGatewayCalculatorCommand.Output>;
}

export namespace IUpdatePaymentGatewayCalculatorCommand {
  export type Input = {
    accessToken: string;
    tenantId: string;
    paymentGatewayId: string;
    isEnable: boolean;
  };
  export type Output = {
    paymentGatewayId: string;
    isEnable: boolean;
  };
}
