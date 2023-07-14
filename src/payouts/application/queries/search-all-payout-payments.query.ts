import { ISearchAllPayoutPaymentsDao } from '~/payouts/application/daos/search-all-payments.dao.contract';
import { ISearchAllPayoutPaymentsQuery } from '~/payouts/application/queries/contracts/search-all-payments.query.contract';

export class SearchAllPayoutPaymentsQuery
  implements ISearchAllPayoutPaymentsQuery
{
  constructor(
    private readonly searchAllPayoutPaymentsDao: ISearchAllPayoutPaymentsDao,
  ) {}

  async execute(
    attrs: ISearchAllPayoutPaymentsQuery.Input,
  ): Promise<ISearchAllPayoutPaymentsQuery.Output> {
    const payments = await this.searchAllPayoutPaymentsDao.execute({
      accessToken: attrs.accessToken,
      gTenantId: attrs.gTenantId,
      periodStartDate: attrs.periodStartDate,
      periodEndDate: attrs.periodEndDate,
      settlementCurrencyIsoCode: attrs.settlementCurrencyIsoCode,
      payoutId: attrs.payoutId,
    });
    if (payments instanceof Error) throw payments;

    return {
      rows: payments.map((payment) => {
        return {
          id: payment.id,
          date: payment.date,
          amount: payment.amount,
          feeAmount: payment.feeAmount,
          payableAmount: payment.payableAmount,
          profitAmount: payment.profitAmount,
          receivedAmount: payment.receivedAmount,
        };
      }),
    };
  }
}
