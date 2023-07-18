import { FactoryProvider } from '@nestjs/common';
import { PayoutProvidersSymbols } from '~/payouts/ioc/payouts-providers.symbols';
import { IFindOneTenantBalanceDao } from '~/payouts/application/daos/find-one-tenant-balance.dao.contract';
import { FindOneTenantBalanceQuery } from '~/payouts/application/queries/find-one-tenant-balance.query';
import { IFindOneCurrencyDao } from '~/currencies/application/daos/find-one-currency.dao.contract';
import { CurrencyProvidersSymbols } from '~/currencies/ioc/currencies.symbols';

export class FindOneTenantBalanceQueryFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: PayoutProvidersSymbols.FIND_ONE_TENANT_BALANCE_QUERY,
      useFactory: (
        findOneTenantBalanceDao: IFindOneTenantBalanceDao,
        findOneCurrencyDao: IFindOneCurrencyDao,
      ) =>
        new FindOneTenantBalanceQuery(
          findOneTenantBalanceDao,
          findOneCurrencyDao,
        ),
      inject: [
        PayoutProvidersSymbols.FIND_ONE_TENANT_BALANCE_DAO,
        CurrencyProvidersSymbols.FIND_ONE_CURRENCY_DAO,
      ],
    };
  }
}
