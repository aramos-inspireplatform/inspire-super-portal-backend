import { IReconcileStripeCommand } from '~/payouts/application/commands/contracts/reconcile-stripe.command.contract';
import { IInspirePaymentApiService } from '~/shared/application/services/inspire-api-services/payment/services/contracts/inspire-payment-api-service.contract';

export class ReconcileStripeCommand implements IReconcileStripeCommand {
  constructor(
    private readonly inspirePaymentService: IInspirePaymentApiService,
  ) {}

  async execute(
    attrs: IReconcileStripeCommand.Input,
  ): IReconcileStripeCommand.Output {
    await this.inspirePaymentService.reconcileStripe({
      ...attrs,
    });
  }
}
