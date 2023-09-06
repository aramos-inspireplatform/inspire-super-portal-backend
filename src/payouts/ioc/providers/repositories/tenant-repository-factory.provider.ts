import { FactoryProvider } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { TenantRepositoryTypeOrmAdapter } from '~/payouts/infra/repositories/tenant.repository';
import { DatabaseProvidersSymbols } from '~/shared/infra/database/ioc/providers/provider.symbols';
import { PayoutProvidersSymbols } from '~/payouts/ioc/providers/payouts-providers.symbols';

export class TenantRepositoryFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: PayoutProvidersSymbols.Repositories.TENANT,
      useFactory: (dataSource: DataSource) =>
        new TenantRepositoryTypeOrmAdapter(dataSource),
      inject: [DatabaseProvidersSymbols.DATA_SOURCE],
    };
  }
}
