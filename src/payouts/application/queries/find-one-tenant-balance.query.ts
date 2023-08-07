import { IFindOneCurrencyDao } from '~/currencies/application/daos/find-one-currency.dao.contract';
import { CurrenciesExceptionsConstants } from '~/currencies/domain/exceptions/currencies-exceptions.enum';
import { IFindOneTenantBalanceDao } from '~/payouts/application/daos/find-one-tenant-balance.dao.contract';
import { IFindOneTenantBalanceQuery } from '~/payouts/application/queries/contracts/find-one-tenant-balance.query.contract';
import { PayoutsExceptionsConstants } from '~/payouts/domain/exceptions/payouts-exceptions.enum';
import { NotFoundException } from '~/shared/domain/exceptions/not-found.exception';

export class FindOneTenantBalanceQuery implements IFindOneTenantBalanceQuery {
  constructor(
    private readonly findOneTenantBalanceDao: IFindOneTenantBalanceDao,
    private readonly findOneCurrencyDao: IFindOneCurrencyDao,
  ) {}

  async execute(
    attrs: IFindOneTenantBalanceQuery.Input,
  ): IFindOneTenantBalanceQuery.Output {
    const currency = await this.findOneCurrencyDao.execute({
      currencyIsoCode: attrs.settlementCurrencyIsoCode,
    });
    if (!currency)
      throw new NotFoundException(CurrenciesExceptionsConstants.NOT_FOUND);

    const tenantBalance = await this.findOneTenantBalanceDao.execute({
      userAuth: attrs.userAuth,
      gTenantId: attrs.gTenantId,
      settlementCurrencyId: currency.id,
    });
    if (!tenantBalance)
      throw new NotFoundException(
        PayoutsExceptionsConstants.TENANT_BALANCE_NOT_FOUND,
      );

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
      balance: tenantBalance.balance
        ? {
            id: tenantBalance.balance.id,
            amount: Number(tenantBalance.balance.amount),
            updatedDate: tenantBalance.balance.updatedDate,
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
