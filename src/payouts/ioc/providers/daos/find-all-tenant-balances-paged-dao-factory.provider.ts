import { FactoryProvider } from '@nestjs/common';
import { PayoutProvidersSymbols } from '~/payouts/ioc/providers/payouts-providers.symbols';
import { FindAllTenantBalancesPagedDao } from '~/payouts/infra/daos/find-all-tenant-balances-paged.dao';
import { DatabaseProvidersSymbols } from '~/shared/infra/database/ioc/providers/provider.symbols';
import { DataSource } from 'typeorm';

export class FindAllTenantBalancesPagedDaoFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: PayoutProvidersSymbols.Daos.FIND_ALL_TENANT_BALANCES_PAGED,
      useFactory: (dataSource: DataSource) =>
        new FindAllTenantBalancesPagedDao(dataSource),
      inject: [DatabaseProvidersSymbols.DATA_SOURCE],
    };
  }
}
