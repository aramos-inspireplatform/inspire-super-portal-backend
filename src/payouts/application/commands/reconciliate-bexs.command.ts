import { BadRequestException } from '@nestjs/common';
import { IReconciliateBexsCommand } from '~/payouts/application/commands/contracts/reconciliate-bexs.command.contract';
import { IInspirePaymentApiService } from '~/shared/application/services/inspire-api-services/payment/services/contracts/inspire-payment-api-service.contract';

export class ReconciliateBexsCommand implements IReconciliateBexsCommand {
  constructor(
    private readonly inspirePaymentService: IInspirePaymentApiService,
  ) {}

  async execute(
    attrs: IReconciliateBexsCommand.Input,
  ): IReconciliateBexsCommand.Output {
    if (!attrs.file) {
      throw new BadRequestException('File is required');
    }

    if (attrs.file.filename.split('.')[1]?.trim() !== 'xlsx') {
      throw new BadRequestException('Extension file must be xlsx');
    }

    const buffer = await attrs.file.toBuffer();

    await this.inspirePaymentService.reconciliateBexs({
      accessToken: attrs.accessToken,
      gTenantId: attrs.gTenantId,
      periodStartDate: attrs.periodStartDate,
      periodEndDate: attrs.periodEndDate,
      buffer,
    });
  }
}
