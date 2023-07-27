import { FactoryProvider } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { PayoutRepositoryTypeOrmAdapter } from '~/payouts/infra/repositories/payout.repository';
import { DatabaseProvidersSymbols } from '~/shared/infra/database/ioc/providers/provider.symbols';
import { PayoutProvidersSymbols } from '~/payouts/ioc/providers/payouts-providers.symbols';

export class PayoutRepositoryFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: PayoutProvidersSymbols.Repositories.PAYOUT,
      useFactory: (dataSource: DataSource) =>
        new PayoutRepositoryTypeOrmAdapter(dataSource),
      inject: [DatabaseProvidersSymbols.DATA_SOURCE],
    };
  }
}
