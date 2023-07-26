import { IInspirePaymentApiService } from '~/shared/application/services/inspire-api-services/payment/services/contracts/inspire-payment-api-service.contract';
import { ICreatePayoutCommand } from '~/payouts/application/commands/contracts';
import {
  ITenantRepository,
  IPayoutRepository,
} from '~/payouts/infra/repositories/contracts';
import { PayoutDomainEntity } from '~/payouts/domain/entities/payout.entity';

export class CreatePayoutCommand implements ICreatePayoutCommand {
  constructor(
    private readonly inspirePaymentApiService: IInspirePaymentApiService,
    private readonly tenantRepository: ITenantRepository,
    private readonly payoutRepository: IPayoutRepository,
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
      selectedPayments,
      adjustmentFees,
      selectAllPayments,
    } = input;

    const tenant = await this.tenantRepository.findOneByGTenantId({
      gTenantId,
    });

    const result = await this.inspirePaymentApiService.createPayoutCommand({
      payoutId,
      accessToken,
      gTenantId,
      command,
      periodStartDate,
      periodEndDate,
      selectedPayments,
      adjustmentFees,
      selectAllPayments,
      termsRecurringIntervalCount:
        tenant.getState().termsRecurringIntervalCount,
      termsRecurringIntervalId: tenant.getState().termsRecurringIntervalId,
    });

    const payout = new PayoutDomainEntity().save({
      id: result.id,
      createdDate: result.createdDate,
      updatedDate: result.updatedDate,
      statusId: result.statusId,
      payoutAlternativeId: result.alternativeId,
      periodStartDate: result.periodStartDate,
      periodEndDate: result.periodEndDate,
      termsRecurringIntervalCount: result.termsRecurringIntervalCount,
      termsRecurringIntervalId: result.termsRecurringIntervalId,
      customerFeeAmount: result.customerFeeAmount,
      customerGrossAmount: result.customerGrossAmount,
      paymentGatewayNetAmount: result.paymentGatewayNetAmount,
      amount: result.amount,
      settlementCurrencyId: result.settlementCurrencyId,
      creatorUserId: result.creatorUserId,
      updaterUserId: result.updaterUserId,
      processorUserId: result.processorUserId,
      processedDate: result.processedDate,
      tenantId: tenant.getState().id,
    });

    await this.payoutRepository.save(payout);

    return { id: result.id };
  }
}
