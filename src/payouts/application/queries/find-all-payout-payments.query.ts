import { IFindAllPayoutPaymentsDao } from '~/payouts/application/daos/find-all-payments.dao.contract';
import { IFindAllPayoutPaymentsQuery } from '~/payouts/application/queries/contracts/find-all-payments.query.contract';

export class FindAllPayoutPaymentsQuery implements IFindAllPayoutPaymentsQuery {
  constructor(
    private readonly findAllPayoutPaymentsDao: IFindAllPayoutPaymentsDao,
  ) {}

  async execute(
    attrs: IFindAllPayoutPaymentsQuery.Input,
  ): Promise<IFindAllPayoutPaymentsQuery.Output> {
    const payments = await this.findAllPayoutPaymentsDao.execute({
      ...attrs,
    });
    if (payments instanceof Error) throw payments;

    return {
      // rows: [],
      // page: payments.page,
      // pageSize: payments.pageSize,
      // count: payments.count,
      // pageCount: payments.pageCount,
      // pageNumberIsGood: payments.pageNumberIsGood,
      // hasPreviousPage: payments.hasPreviousPage,
      // hasNextPage: payments.hasNextPage,
      // isFirstPage: payments.isFirstPage,
      // isLastPage: payments.isLastPage,
      // numberOfFirstItemOnPage: payments.numberOfFirstItemOnPage,
      // firstItemOnPage: payments.firstItemOnPage,
      // numberOfLastItemOnPage: payments.numberOfLastItemOnPage,
      // lastItemOnPage: payments.lastItemOnPage,
    };
  }
}
