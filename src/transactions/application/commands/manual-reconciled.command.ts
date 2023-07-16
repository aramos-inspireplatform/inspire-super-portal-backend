import { IInspirePaymentApiService } from '~/shared/application/services/inspire-api-services/payment/services/contracts/inspire-payment-api-service.contract';
import { IManualReconciledCommand } from '~/transactions/application/commands/contracts';

export class ManualReconciledCommand implements IManualReconciledCommand {
  constructor(
    private readonly inspirePaymentApiService: IInspirePaymentApiService,
  ) {
    //
  }

  async execute(
    input: IManualReconciledCommand.Input,
  ): Promise<IManualReconciledCommand.Output> {
    const { transactionId, status, accessToken, gTenantId } = input;

    await this.inspirePaymentApiService.manualReconciledCommand({
      transactionId,
      status,
      accessToken,
      gTenantId,
    });
  }
}
