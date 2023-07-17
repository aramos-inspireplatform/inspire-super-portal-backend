import { IFindAllPaymentsPeriodDao } from '~/payouts/application/daos/find-all-payments-period.dao.contract';
import { IFindAllPaymentsPeriodQuery } from '~/payouts/application/queries/contracts/find-all-payments-period.query.contract';

export class SearchAllPayoutPaymentsQuery
  implements IFindAllPaymentsPeriodQuery
{
  constructor(
    private readonly findAllPaymentsPeriodDao: IFindAllPaymentsPeriodDao,
  ) {}

  async execute(
    attrs: IFindAllPaymentsPeriodQuery.Input,
  ): Promise<IFindAllPaymentsPeriodQuery.Output> {
    const payments = await this.findAllPaymentsPeriodDao.execute({
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
      feeAmount: payment.feeAmount,
      payableAmount: payment.payableAmount,
      profitAmount: payment.profitAmount,
      receivedAmount: payment.receivedAmount,
    }));
  }
}
