import { IFindAllTenantPayoutsPagedDao } from '~/payouts/application/daos/find-all-tenant-payouts-paged.dao.contract';
import { IFindAllTenantPayoutsPagedQuery } from '~/payouts/application/queries/contracts/find-all-tenant-payouts-paged.query.contract';

export class FindAllTenantPayoutPagedQuery
  implements IFindAllTenantPayoutsPagedQuery
{
  constructor(
    private readonly findAllTenantPayoutsPagedDao: IFindAllTenantPayoutsPagedDao,
  ) {}

  async execute(
    attrs: IFindAllTenantPayoutsPagedQuery.Input,
  ): IFindAllTenantPayoutsPagedQuery.Output {
    const payouts = await this.findAllTenantPayoutsPagedDao.execute({
      ...attrs,
    });
    if (payouts instanceof Error) throw payouts;

    return {
      rows:
        payouts?.rows?.map((payout) => ({
          id: payout.id,
          alternativeId: payout.alternativeId?.toString()?.padStart(8, '0'),
          tenant: payout.tenant
            ? {
                id: payout.tenant.id,
                name: payout.tenant.name,
                gTenantId: payout.tenant.gTenantId,
                agency: payout.tenant.agency
                  ? {
                      id: payout.tenant.agency.id,
                      name: payout.tenant.agency.name,
                    }
                  : null,
              }
            : null,
          processorUser: payout.processorUser
            ? {
                id: payout.processorUser.id,
                firstName: payout.processorUser.firstName,
                lastName: payout.processorUser.lastName,
              }
            : null,
          status: payout.status
            ? {
                id: payout.status.id,
                name: payout.status.name,
                slug: payout.status.slug,
              }
            : null,
          amount: payout.amount,
          settlementCurrency: payout.settlementCurrency
            ? {
                id: payout.settlementCurrency.id,
                name: payout.settlementCurrency.name,
                isoCode: payout.settlementCurrency.isoCode,
                symbol: payout.settlementCurrency.symbol,
              }
            : null,
          createdDate: payout.createdDate,
          processedDate: payout.processedDate ?? null,
          paidDate: payout.paidDate ?? null,
          expectedArrivalDate: payout.expectedArrivalDate ?? null,
          terms: payout.terms
            ? {
                recurringIntervalCount: payout.terms.recurringIntervalCount,
                recurringInterval: {
                  id: payout.terms.recurringInterval.id,
                  name: payout.terms.recurringInterval.name,
                  interval: payout.terms.recurringInterval.interval,
                },
              }
            : null,
        })) ?? [],
      page: payouts.page,
      pageSize: payouts.pageSize,
      count: payouts.count,
      pageCount: payouts.pageCount,
      pageNumberIsGood: payouts.pageNumberIsGood,
      hasPreviousPage: payouts.hasPreviousPage,
      hasNextPage: payouts.hasNextPage,
      isFirstPage: payouts.isFirstPage,
      isLastPage: payouts.isLastPage,
      numberOfFirstItemOnPage: payouts.numberOfFirstItemOnPage,
      firstItemOnPage: payouts.firstItemOnPage,
      numberOfLastItemOnPage: payouts.numberOfLastItemOnPage,
      lastItemOnPage: payouts.lastItemOnPage,
    };
  }
}
