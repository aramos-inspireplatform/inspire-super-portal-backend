import { IFindOneTenantBalanceDao } from '~/payouts/application/daos/find-one-tenant-balance.dao.contract';
import { IFindOneTenantBalanceQuery } from '~/payouts/application/queries/contracts/find-one-tenant-balance.query.contract';

export class FindOneTenantBalanceQuery implements IFindOneTenantBalanceQuery {
  constructor(
    private readonly findOneTenantBalanceDao: IFindOneTenantBalanceDao,
  ) {}

  async execute(
    attrs: IFindOneTenantBalanceQuery.Input,
  ): IFindOneTenantBalanceQuery.Output {
    const tenantBalance = await this.findOneTenantBalanceDao.execute({
      ...attrs,
    });
    if (tenantBalance instanceof Error) throw tenantBalance;

    console.log('tenantBalance-query:', tenantBalance);

    return {
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
            amount: tenantBalance.lastPayout.amount,
            settlementCurrency: {
              id: tenantBalance.lastPayout.settlementCurrency.id,
              name: tenantBalance.lastPayout.settlementCurrency.name,
              isoCode: tenantBalance.lastPayout.settlementCurrency.isoCode,
              symbol: tenantBalance.lastPayout.settlementCurrency.symbol,
            },
            periodStartDate: tenantBalance.lastPayout.periodStartDate,
            periodEndDate: tenantBalance.lastPayout.periodEndDate,
          }
        : null,
      totalPaidAmount: tenantBalance.totalPaidAmount,
      balance: tenantBalance.balance
        ? {
            id: tenantBalance.balance.id,
            amount: tenantBalance.balance.amount,
            settlementCurrency: {
              id: tenantBalance.balance.settlementCurrency.id,
              name: tenantBalance.balance.settlementCurrency.name,
              isoCode: tenantBalance.balance.settlementCurrency.isoCode,
              symbol: tenantBalance.balance.settlementCurrency.symbol,
            },
          }
        : null,
    };
  }
}
