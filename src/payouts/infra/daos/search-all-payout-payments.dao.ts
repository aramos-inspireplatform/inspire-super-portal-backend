import { ISearchAllPayoutPaymentsDao } from '~/payouts/application/daos/search-all-payments.dao.contract';
import { IInspirePaymentApiService } from '~/shared/application/services/inspire-api-services/payment/services/contracts/inspire-payment-api-service.contract';

export class SearchAllPayoutPaymentsDao implements ISearchAllPayoutPaymentsDao {
  constructor(
    private readonly inspirePaymentApiService: IInspirePaymentApiService,
  ) {}

  async execute(
    attrs: ISearchAllPayoutPaymentsDao.Input,
  ): ISearchAllPayoutPaymentsDao.Output {
    const payments =
      await this.inspirePaymentApiService.searchAllPayoutPayments({
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
