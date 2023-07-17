import { FactoryProvider } from '@nestjs/common';
import { IFindAllTenantBalancesPagedDao } from '~/payouts/application/daos/find-all-tenant-balances-paged.dao.contract';
import { FindAllTenantBalancesPagedQuery } from '~/payouts/application/queries/find-all-tenant-balances-paged.query';
import { PayoutProvidersSymbols } from '~/payouts/ioc/payouts-providers.symbols';

export class FindAllTenantBalancesPagedQueryFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: PayoutProvidersSymbols.FIND_ALL_TENANT_BALANCES_PAGED_QUERY,
      useFactory: (
        findAllTenantBalancesPagedDao: IFindAllTenantBalancesPagedDao,
      ) => new FindAllTenantBalancesPagedQuery(findAllTenantBalancesPagedDao),
      inject: [PayoutProvidersSymbols.FIND_ALL_TENANT_BALANCES_PAGED_DAO],
    };
  }
}
