import { FactoryProvider } from '@nestjs/common';
import { PayoutProvidersSymbols } from '~/payouts/ioc/providers/payouts-providers.symbols';
import { DatabaseProvidersSymbols } from '~/shared/infra/database/ioc/providers/provider.symbols';
import { DataSource } from 'typeorm';
import { FindOneTenantBalanceDao } from '~/payouts/infra/daos/find-one-tenant-balance.dao';

export class FindOneTenantBalanceDaoFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: PayoutProvidersSymbols.Daos.FIND_ONE_TENANT_BALANCE,
      useFactory: (dataSource: DataSource) =>
        new FindOneTenantBalanceDao(dataSource),
      inject: [DatabaseProvidersSymbols.DATA_SOURCE],
    };
  }
}
