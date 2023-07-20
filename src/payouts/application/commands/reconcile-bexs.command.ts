import { BadRequestException } from '@nestjs/common';
import { IReconcileBexsCommand } from '~/payouts/application/commands/contracts/reconcile-bexs.command.contract';
import { IInspirePaymentApiService } from '~/shared/application/services/inspire-api-services/payment/services/contracts/inspire-payment-api-service.contract';

export class ReconcileBexsCommand implements IReconcileBexsCommand {
  constructor(
    private readonly inspirePaymentService: IInspirePaymentApiService,
  ) {}

  async execute(
    attrs: IReconcileBexsCommand.Input,
  ): IReconcileBexsCommand.Output {
    if (!attrs.file) {
      throw new BadRequestException('File is required');
    }

    if (attrs.file.filename.split('.')[1]?.trim() !== 'xlsx') {
      throw new BadRequestException('Extension file must be xlsx');
    }

    const buffer = await attrs.file.toBuffer();

    await this.inspirePaymentService.reconcileBexs({
      buffer,
      ...attrs,
    });
  }
}
