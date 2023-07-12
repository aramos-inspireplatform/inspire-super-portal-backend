import { FactoryProvider } from '@nestjs/common';
import { PayoutProvidersSymbols } from '~/payouts/ioc/payouts-providers.symbols';
import { FindAllTenantPayoutsDao } from '~/payouts/infra/daos/find-all-tenant-payouts.dao';
import { DatabaseProvidersSymbols } from '~/shared/infra/database/ioc/providers/provider.symbols';
import { DataSource } from 'typeorm';

export class FindAllTenantPayoutsDaoFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: PayoutProvidersSymbols.FIND_ALL_TENANT_PAYOUT_DAO,
      useFactory: (dataSource: DataSource) =>
        new FindAllTenantPayoutsDao(dataSource),
      inject: [DatabaseProvidersSymbols.DATA_SOURCE],
    };
  }
}
