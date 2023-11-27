import { IUpdatePaymentGatewayCommand } from '~/payments/application/commands/contracts';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';

export class UpdatePaymentGatewayCommandTypeOrmAdapter
  implements IUpdatePaymentGatewayCommand
{
  constructor(private readonly httpClient: IHttpClient) {}

  async execute(
    input: IUpdatePaymentGatewayCommand.Input,
  ): Promise<IUpdatePaymentGatewayCommand.Output> {
    const url = process.env.PAYMENT_API_URL + '/v2/payment-gateways';

    const responseOrError = await this.httpClient.patch<any>(
      `${url}/${input.id}`,
      {
        isCalculatorActive: input.isCalculatorActive,
      },
      {
        headers: {
          tenant: input.tenantId,
          'x-integration-key': process.env.TENANT_INTEGRATION_KEY,
        },
      },
    );

    if (responseOrError instanceof Error) throw responseOrError;

    return {
      id: input.id,
      isCalculatorActive: input.isCalculatorActive,
      isCalculatorAvailable: responseOrError.data.body.data
        .isCalculatorAvailable as boolean,
    };
  }
}
