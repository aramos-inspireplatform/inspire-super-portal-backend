import { FactoryProvider } from '@nestjs/common';
import { PayoutProvidersSymbols } from '~/payouts/ioc/providers/payouts-providers.symbols';
import { FindAllTenantPayoutsPagedDao } from '~/payouts/infra/daos/find-all-tenant-payouts-paged.dao';
import { DatabaseProvidersSymbols } from '~/shared/infra/database/ioc/providers/provider.symbols';
import { DataSource } from 'typeorm';

export class FindAllTenantPayoutsPagedDaoFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: PayoutProvidersSymbols.Daos.FIND_ALL_TENANT_PAYOUT_PAGED,
      useFactory: (dataSource: DataSource) =>
        new FindAllTenantPayoutsPagedDao(dataSource),
      inject: [DatabaseProvidersSymbols.DATA_SOURCE],
    };
  }
}
