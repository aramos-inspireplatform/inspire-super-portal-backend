import { IFindAllTenantPayoutsDao } from '~/payouts/application/daos/find-all-tenant-payouts.dao.contract';
import { IFindAllTenantPayoutsQuery } from '~/payouts/application/queries/contracts/find-all-tenant-payouts.query.contract';

export class FindAllTenantPayoutQuery implements IFindAllTenantPayoutsQuery {
  constructor(
    private readonly findAllTenantPayoutDao: IFindAllTenantPayoutsDao,
  ) {}

  async execute(
    attrs: IFindAllTenantPayoutsQuery.Input,
  ): IFindAllTenantPayoutsQuery.Output {
    const tenantPayouts = await this.findAllTenantPayoutDao.execute({
      ...attrs,
    });
    if (tenantPayouts instanceof Error) throw tenantPayouts;

    return {
      rows: tenantPayouts.rows.map((tenantPayout) => tenantPayout),
      page: tenantPayouts.page,
      pageSize: tenantPayouts.pageSize,
      count: tenantPayouts.count,
      pageCount: tenantPayouts.pageCount,
      pageNumberIsGood: tenantPayouts.pageNumberIsGood,
      hasPreviousPage: tenantPayouts.hasPreviousPage,
      hasNextPage: tenantPayouts.hasNextPage,
      isFirstPage: tenantPayouts.isFirstPage,
      isLastPage: tenantPayouts.isLastPage,
      numberOfFirstItemOnPage: tenantPayouts.numberOfFirstItemOnPage,
      firstItemOnPage: tenantPayouts.firstItemOnPage,
      numberOfLastItemOnPage: tenantPayouts.numberOfLastItemOnPage,
      lastItemOnPage: tenantPayouts.lastItemOnPage,
    };
  }
}
