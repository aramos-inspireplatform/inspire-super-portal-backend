import { IUpdatePaymentGatewayCalculatorCommand } from '~/calculator/application/commands/contracts';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';

export class UpdatePaymentGatewayCalculatorCommandTypeOrmAdapter
  implements IUpdatePaymentGatewayCalculatorCommand
{
  constructor(private readonly httpClient: IHttpClient) {}

  async execute(
    input: IUpdatePaymentGatewayCalculatorCommand.Input,
  ): Promise<IUpdatePaymentGatewayCalculatorCommand.Output> {
    const url = process.env.PAYMENT_API_URL + '/payment-gateway-calculator';

    const responseOrError = await this.httpClient.patch<any>(
      url,
      {
        paymentGatewayId: input.paymentGatewayId,
        isEnable: input.isEnable,
      },
      {
        headers: {
          tenant: input.tenantId,
          'x-integration-key': process.env.TENANT_INTEGRATION_KEY,
          authorization: input.accessToken,
        },
      },
    );

    if (responseOrError instanceof Error) throw responseOrError;

    return {
      paymentGatewayId: input.paymentGatewayId,
      isEnable: input.isEnable,
    };
  }
}
