import { FactoryProvider } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { FindOneTenantPayoutDao } from '~/payouts/infra/daos/find-one-tenant-payout.dao';
import { PayoutProvidersSymbols } from '~/payouts/ioc/payouts-providers.symbols';
import { DatabaseProvidersSymbols } from '~/shared/infra/database/ioc/providers/provider.symbols';

export class FindOneTenantPayoutDaoFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: PayoutProvidersSymbols.FIND_ONE_TENANT_PAYOUT_DAO,
      useFactory: (dataSource: DataSource) =>
        new FindOneTenantPayoutDao(dataSource),
      inject: [DatabaseProvidersSymbols.DATA_SOURCE],
    };
  }
}
