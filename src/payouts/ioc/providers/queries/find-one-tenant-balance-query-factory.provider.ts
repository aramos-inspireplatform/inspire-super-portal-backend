import { FactoryProvider } from '@nestjs/common';
import { PayoutProvidersSymbols } from '~/payouts/ioc/payouts-providers.symbols';
import { IFindOneTenantBalanceDao } from '~/payouts/application/daos/find-one-tenant-balance.dao.contract';
import { FindOneTenantBalanceQuery } from '~/payouts/application/queries/find-one-tenant-balance.query';

export class FindOneTenantBalanceQueryFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: PayoutProvidersSymbols.FIND_ONE_TENANT_BALANCE_QUERY,
      useFactory: (findOneTenantBalanceDao: IFindOneTenantBalanceDao) =>
        new FindOneTenantBalanceQuery(findOneTenantBalanceDao),
      inject: [PayoutProvidersSymbols.FIND_ONE_TENANT_BALANCE_DAO],
    };
  }
}
