import { FactoryProvider } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { FindOnePaymentsPayoutDao } from '~/payouts/infra/daos/find-one-payments-payout.dao';
import { PayoutProvidersSymbols } from '~/payouts/ioc/payouts-providers.symbols';
import { DatabaseProvidersSymbols } from '~/shared/infra/database/ioc/providers/provider.symbols';

export class FindOnePaymentsPayoutDaoFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: PayoutProvidersSymbols.FIND_ONE_TENANT_PAYOUT_DAO,
      useFactory: (dataSource: DataSource) =>
        new FindOnePaymentsPayoutDao(dataSource),
      inject: [DatabaseProvidersSymbols.DATA_SOURCE],
    };
  }
}
