import { IFindAllPayoutPaymentsDao } from '~/payouts/application/daos/find-all-payments.dao.contract';
import { IInspirePaymentApiService } from '~/shared/application/services/inspire-api-services/payment/services/contracts/inspire-payment-api-service.contract';

export class FindAllPayoutPaymentsDao implements IFindAllPayoutPaymentsDao {
  constructor(
    private readonly inspirePaymentApiService: IInspirePaymentApiService,
  ) {}

  async execute(
    attrs: IFindAllPayoutPaymentsDao.Input,
  ): Promise<IFindAllPayoutPaymentsDao.Output> {
    //if (payments instanceof Error) throw payments;

    return {
      //rows: [],
      //page: payments.page,
      //pageSize: payments.pageSize,
      //count: payments.count,
      //pageCount: payments.pageCount,
      //pageNumberIsGood: payments.pageNumberIsGood,
      //hasPreviousPage: payments.hasPreviousPage,
      //hasNextPage: payments.hasNextPage,
      //isFirstPage: payments.isFirstPage,
      //isLastPage: payments.isLastPage,
      //numberOfFirstItemOnPage: payments.numberOfFirstItemOnPage,
      //firstItemOnPage: payments.firstItemOnPage,
      //numberOfLastItemOnPage: payments.numberOfLastItemOnPage,
      //lastItemOnPage: payments.lastItemOnPage,
    };
  }
}
