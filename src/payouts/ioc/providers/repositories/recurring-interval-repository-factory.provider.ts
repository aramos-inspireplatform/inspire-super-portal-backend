import { FactoryProvider } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { DatabaseProvidersSymbols } from '~/shared/infra/database/ioc/providers/provider.symbols';
import { PayoutProvidersSymbols } from '~/payouts/ioc/providers/payouts-providers.symbols';
import { RecurringIntervalRepositoryTypeOrmAdapter } from '~/payouts/infra/repositories/recurring-interval.repository';

export class RecurringIntervalRepositoryFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: PayoutProvidersSymbols.Repositories.RECURRING_INTERVAL,
      useFactory: (dataSource: DataSource) =>
        new RecurringIntervalRepositoryTypeOrmAdapter(dataSource),
      inject: [DatabaseProvidersSymbols.DATA_SOURCE],
    };
  }
}
