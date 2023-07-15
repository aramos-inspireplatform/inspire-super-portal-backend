import { IFindAllPaymentsPeriodPagedDao } from '~/payouts/application/daos/find-all-payments-period-paged.dao.contract';
import { IInspirePaymentApiService } from '~/shared/application/services/inspire-api-services/payment/services/contracts/inspire-payment-api-service.contract';

export class FindAllPaymentsPeriodPagedDao
  implements IFindAllPaymentsPeriodPagedDao
{
  constructor(
    private readonly inspirePaymentApiService: IInspirePaymentApiService,
  ) {}

  async execute(
    attrs: IFindAllPaymentsPeriodPagedDao.Input,
  ): IFindAllPaymentsPeriodPagedDao.Output {
    const payments =
      await this.inspirePaymentApiService.findAllPaymentsPeriodPaged({
        ...attrs,
        pagination: {
          page: attrs.pagination.page,
          size: attrs.pagination.pagesize,
          sortby: attrs.pagination.sortby,
          keywords: attrs.pagination.keywords,
        },
      });

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
