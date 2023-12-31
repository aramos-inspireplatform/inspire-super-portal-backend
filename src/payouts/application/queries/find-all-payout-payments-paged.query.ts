import { IFindAllPayoutPaymentsPagedDao } from '~/payouts/application/daos/find-all-payout-payments-paged.dao.contract';
import { IFindAllPayoutPaymentsPagedQuery } from '~/payouts/application/queries/contracts/find-all-payout-payments-paged.query.contract';

export class FindAllPayoutPaymentsPagedQuery
  implements IFindAllPayoutPaymentsPagedQuery
{
  constructor(
    private readonly findAllPayoutPaymentsPagedDao: IFindAllPayoutPaymentsPagedDao,
  ) {}

  async execute(
    attrs: IFindAllPayoutPaymentsPagedQuery.Input,
  ): IFindAllPayoutPaymentsPagedQuery.Output {
    const payments = await this.findAllPayoutPaymentsPagedDao.execute({
      ...attrs,
    });
    if (payments instanceof Error) throw payments;

    return {
      rows: payments.rows.map((payment) => ({
        id: payment.id,
        date: payment.date,
        status: payment.status,
        amount: payment.amount,
        receivedAmount: payment.receivedAmount,
        feeAmount: payment.feeAmount,
        payableAmount: payment.payableAmount,
        profitAmount: payment.profitAmount,
        paymentProcessorName: payment.paymentProcessorName,
        paymentMethodName: payment.paymentMethodName,
        creditCardBrandName: payment.creditCardBrandName,
        installments: payment.installments,
        paymentProcessorId: payment.paymentProcessorId,
        reconciliationMethod: payment.reconciliationMethod,
        paymentProcessorConfirmation: payment.paymentProcessorConfirmation,
      })),
      page: payments.page,
      pageSize: payments.pageSize,
      count: payments.count,
      pageCount: payments.pageCount,
      pageNumberIsGood: payments.pageNumberIsGood,
      hasPreviousPage: payments.hasPreviousPage,
      hasNextPage: payments.hasNextPage,
      isFirstPage: payments.isFirstPage,
      isLastPage: payments.isLastPage,
      numberOfFirstItemOnPage: payments.numberOfFirstItemOnPage,
      firstItemOnPage: payments.firstItemOnPage,
      numberOfLastItemOnPage: payments.numberOfLastItemOnPage,
      lastItemOnPage: payments.lastItemOnPage,
    };
  }
}
