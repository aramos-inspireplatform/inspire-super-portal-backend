import { IFindAllPaymentsPeriodPagedDao } from '~/payouts/application/daos/find-all-payments-period-paged.dao.contract';
import { IFindAllPaymentsPeriodPagedQuery } from '~/payouts/application/queries/contracts/find-all-payments-period-paged.query.contract';

export class FindAllPaymentsPeriodPagedQuery
  implements IFindAllPaymentsPeriodPagedQuery
{
  constructor(
    private readonly findAllPaymentsPeriodPagedDao: IFindAllPaymentsPeriodPagedDao,
  ) {}

  async execute(
    attrs: IFindAllPaymentsPeriodPagedQuery.Input,
  ): IFindAllPaymentsPeriodPagedQuery.Output {
    const payments = await this.findAllPaymentsPeriodPagedDao.execute({
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
