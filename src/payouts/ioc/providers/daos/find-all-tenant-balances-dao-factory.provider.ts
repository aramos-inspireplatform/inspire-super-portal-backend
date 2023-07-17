import { FactoryProvider } from '@nestjs/common';
import { PayoutProvidersSymbols } from '~/payouts/ioc/payouts-providers.symbols';
import { FindAllTenantBalancesDao } from '~/payouts/infra/daos/find-all-tenant-balances.dao';
import { DatabaseProvidersSymbols } from '~/shared/infra/database/ioc/providers/provider.symbols';
import { DataSource } from 'typeorm';

export class FindAllTenantBalancesDaoFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: PayoutProvidersSymbols.FIND_ALL_TENANT_BALANCES_DAO,
      useFactory: (dataSource: DataSource) =>
        new FindAllTenantBalancesDao(dataSource),
      inject: [DatabaseProvidersSymbols.DATA_SOURCE],
    };
  }
}
