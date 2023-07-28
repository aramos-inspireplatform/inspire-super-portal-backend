import { IReconciliateStripeCommand } from '~/payouts/application/commands/contracts/reconciliate-stripe.command.contract';
import { IInspirePaymentApiService } from '~/shared/application/services/inspire-api-services/payment/services/contracts/inspire-payment-api-service.contract';

export class ReconciliateStripeCommand implements IReconciliateStripeCommand {
  constructor(
    private readonly inspirePaymentService: IInspirePaymentApiService,
  ) {}

  async execute(
    attrs: IReconciliateStripeCommand.Input,
  ): IReconciliateStripeCommand.Output {
    await this.inspirePaymentService.reconciliateStripe({
      accessToken: attrs.accessToken,
      gTenantId: attrs.gTenantId,
      periodStartDate: attrs.periodStartDate,
      periodEndDate: attrs.periodEndDate,
    });
  }
}
