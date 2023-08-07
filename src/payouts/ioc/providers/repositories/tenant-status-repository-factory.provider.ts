import { FactoryProvider } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { DatabaseProvidersSymbols } from '~/shared/infra/database/ioc/providers/provider.symbols';
import { TenantStatusRepositoryTypeOrmAdapter } from '~/payouts/infra/repositories/tenant-status.repository';
import { PayoutProvidersSymbols } from '~/payouts/ioc/providers/payouts-providers.symbols';

export class TenantStatusRepositoryFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: PayoutProvidersSymbols.Repositories.TENANT_STATUS,
      useFactory: (dataSource: DataSource) =>
        new TenantStatusRepositoryTypeOrmAdapter(dataSource),
      inject: [DatabaseProvidersSymbols.DATA_SOURCE],
    };
  }
}
