export interface IUpdatePaymentGatewayCommand {
  execute(
    input: IUpdatePaymentGatewayCommand.Input,
  ): Promise<IUpdatePaymentGatewayCommand.Output>;
}

export namespace IUpdatePaymentGatewayCommand {
  export type Input = {
    id: string;
    tenantId: string;
    isCalculatorActive: boolean;
  };
  export type Output = {
    id: string;
    isCalculatorAvailable: boolean;
    isCalculatorActive: boolean;
  };
}
