import { IFindAllTenantBalancesPagedDao } from '~/payouts/application/daos/find-all-tenant-balances-paged.dao.contract';
import { IFindAllTenantBalancesPagedQuery } from '~/payouts/application/queries/contracts/find-all-tenant-balances-paged.query.contract';

export class FindAllTenantBalancesPagedQuery
  implements IFindAllTenantBalancesPagedQuery
{
  constructor(
    private readonly findAllTenantBalancesPagedDao: IFindAllTenantBalancesPagedDao,
  ) {}

  async execute(
    attrs: IFindAllTenantBalancesPagedQuery.Input,
  ): IFindAllTenantBalancesPagedQuery.Output {
    const tenantBalances = await this.findAllTenantBalancesPagedDao.execute({
      ...attrs,
    });
    if (tenantBalances instanceof Error) throw tenantBalances;

    return {
      rows: tenantBalances.rows.map((tenantBalance) => ({
        id: tenantBalance.id,
        name: tenantBalance.name,
        gTenantId: tenantBalance.gTenantId,
        agency: tenantBalance.agency
          ? {
              id: tenantBalance.agency.id,
              name: tenantBalance.agency.name,
            }
          : null,
        terms: {
          recurringIntervalCount: tenantBalance.terms.recurringIntervalCount,
          recurringInterval: {
            id: tenantBalance.terms.recurringInterval.id,
            name: tenantBalance.terms.recurringInterval.name,
            interval: tenantBalance.terms.recurringInterval.interval,
          },
        },
        status: {
          id: tenantBalance.status.id,
          name: tenantBalance.status.name,
          slug: tenantBalance.status.slug,
        },
        lastPayout: tenantBalance.lastPayout
          ? {
              id: tenantBalance.lastPayout.id,
              status: {
                id: tenantBalance.lastPayout.status.id,
                name: tenantBalance.lastPayout.status.name,
                slug: tenantBalance.lastPayout.status.slug,
              },
              amount: Number(tenantBalance.lastPayout.amount),
              settlementCurrency: {
                id: tenantBalance.lastPayout.settlementCurrency.id,
                name: tenantBalance.lastPayout.settlementCurrency.name,
                isoCode: tenantBalance.lastPayout.settlementCurrency.isoCode,
                symbol: tenantBalance.lastPayout.settlementCurrency.symbol,
              },
              periodStartDate: tenantBalance.lastPayout.periodStartDate,
              periodEndDate: tenantBalance.lastPayout.periodEndDate,
              processedDate: tenantBalance.lastPayout.processedDate,
            }
          : null,
        totalPaidAmount: Number(tenantBalance.totalPaidAmount),
        balances: tenantBalance.balances?.length
          ? tenantBalance.balances.map((balance) => ({
              id: balance.id,
              amount: Number(balance.amount),
              updatedDate: balance.updatedDate,
              settlementCurrency: {
                id: balance.settlementCurrency.id,
                name: balance.settlementCurrency.name,
                isoCode: balance.settlementCurrency.isoCode,
                symbol: balance.settlementCurrency.symbol,
              },
            }))
          : null,
      })),
      page: tenantBalances.page,
      pageSize: tenantBalances.pageSize,
      count: tenantBalances.count,
      pageCount: tenantBalances.pageCount,
      pageNumberIsGood: tenantBalances.pageNumberIsGood,
      hasPreviousPage: tenantBalances.hasPreviousPage,
      hasNextPage: tenantBalances.hasNextPage,
      isFirstPage: tenantBalances.isFirstPage,
      isLastPage: tenantBalances.isLastPage,
      numberOfFirstItemOnPage: tenantBalances.numberOfFirstItemOnPage,
      firstItemOnPage: tenantBalances.firstItemOnPage,
      numberOfLastItemOnPage: tenantBalances.numberOfLastItemOnPage,
      lastItemOnPage: tenantBalances.lastItemOnPage,
    };
  }
}
