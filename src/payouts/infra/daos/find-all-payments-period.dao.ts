import { IFindAllPaymentsPeriodDao } from '~/payouts/application/daos/find-all-payments-period.dao.contract';
import { IInspirePaymentApiService } from '~/shared/application/services/inspire-api-services/payment/services/contracts/inspire-payment-api-service.contract';

export class FindAllPaymentsPeriodDao implements IFindAllPaymentsPeriodDao {
  constructor(
    private readonly inspirePaymentApiService: IInspirePaymentApiService,
  ) {}

  async execute(
    attrs: IFindAllPaymentsPeriodDao.Input,
  ): IFindAllPaymentsPeriodDao.Output {
    const payments = await this.inspirePaymentApiService.findAllPaymentsPeriod({
      accessToken: attrs.accessToken,
      gTenantId: attrs.gTenantId,
      periodStartDate: attrs.periodStartDate,
      periodEndDate: attrs.periodEndDate,
      settlementCurrencyIsoCode: attrs.settlementCurrencyIsoCode,
      payoutId: attrs.payoutId,
    });
    if (payments instanceof Error) throw payments;

    return payments?.map((payment) => ({
      id: payment.id,
      date: payment.date,
      amount: payment.amount,
      receivedAmount: payment.receivedAmount,
      feeAmount: payment.feeAmount,
      payableAmount: payment.payableAmount,
      profitAmount: payment.profitAmount,
    }));
  }
}
