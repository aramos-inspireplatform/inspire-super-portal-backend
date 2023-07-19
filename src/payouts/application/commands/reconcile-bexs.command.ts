import { IReconcileBexsCommand } from '~/payouts/application/commands/contracts/reconcile-bexs.command.contract';
import { IInspirePaymentApiService } from '~/shared/application/services/inspire-api-services/payment/services/contracts/inspire-payment-api-service.contract';

export class ReconcileBexsCommand implements IReconcileBexsCommand {
  constructor(
    private readonly inspirePaymentService: IInspirePaymentApiService,
  ) {}

  async execute(
    attrs: IReconcileBexsCommand.Input,
  ): IReconcileBexsCommand.Output {
    const buffer = await attrs.file.toBuffer();
    console.log(attrs.file.filename);
    await this.inspirePaymentService.reconcileBexs({
      buffer,
      filename: attrs.file.filename,
      ...attrs,
    });
  }
}
