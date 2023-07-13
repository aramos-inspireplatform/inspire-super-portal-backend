import { FactoryProvider } from '@nestjs/common';
import { IFindAllTenantBalancesDao } from '~/payouts/application/daos/find-all-tenant-balances.dao.contract';
import { FindAllTenantBalancesQuery } from '~/payouts/application/queries/find-all-tenant-balances.query';
import { PayoutProvidersSymbols } from '~/payouts/ioc/payouts-providers.symbols';

export class FindAllTenantBalancesQueryFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: PayoutProvidersSymbols.FIND_ALL_TENANT_BALANCES_QUERY,
      useFactory: (findAllTenantBalancesDao: IFindAllTenantBalancesDao) =>
        new FindAllTenantBalancesQuery(findAllTenantBalancesDao),
      inject: [PayoutProvidersSymbols.FIND_ALL_TENANT_BALANCES_DAO],
    };
  }
}
