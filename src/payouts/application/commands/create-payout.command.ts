import { IInspirePaymentApiService } from '~/shared/application/services/inspire-api-services/payment/services/contracts/inspire-payment-api-service.contract';
import { ICreatePayoutCommand } from '~/payouts/application/commands/contracts';

export class CreatePayoutCommand implements ICreatePayoutCommand {
  constructor(
    private readonly inspirePaymentApiService: IInspirePaymentApiService,
  ) {
    //
  }

  async execute(
    input: ICreatePayoutCommand.Input,
  ): Promise<ICreatePayoutCommand.Output> {
    const {
      payoutId,
      accessToken,
      gTenantId,
      command,
      periodStartDate,
      periodEndDate,
      termsRecurringIntervalCount,
      termsRecurringIntervalId,
      selectedPayments,
      adjustmentFees,
      selectAllPayments,
    } = input;

    return this.inspirePaymentApiService.createPayoutCommand({
      payoutId,
      accessToken,
      gTenantId,
      command,
      periodStartDate,
      periodEndDate,
      termsRecurringIntervalCount,
      termsRecurringIntervalId,
      selectedPayments,
      adjustmentFees,
      selectAllPayments,
    });
  }
}
