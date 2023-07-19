import { FactoryProvider } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { PayoutRepositoryTypeOrmAdapter } from '~/payouts/infra/repositories/payout.repository';
import { DatabaseProvidersSymbols } from '~/shared/infra/database/ioc/providers/provider.symbols';
import { PayoutRepositoriesSymbols } from '~/payouts/ioc/payouts-repositories.symbols';

export class PayoutRepositoryFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: PayoutRepositoriesSymbols.PAYOUT_REPOSITORY,
      useFactory: (dataSource: DataSource) =>
        new PayoutRepositoryTypeOrmAdapter(dataSource),
      inject: [DatabaseProvidersSymbols.DATA_SOURCE],
    };
  }
}
