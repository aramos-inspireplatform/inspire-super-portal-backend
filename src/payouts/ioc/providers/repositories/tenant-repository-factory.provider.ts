import { FactoryProvider } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { TenantRepositoryTypeOrmAdapter } from '~/payouts/infra/repositories/tenant.repository';
import { DatabaseProvidersSymbols } from '~/shared/infra/database/ioc/providers/provider.symbols';
import { PayoutRepositoriesSymbols } from '~/payouts/ioc/payouts-repositories.symbols';

export class TenantRepositoryFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: PayoutRepositoriesSymbols.TENANT_REPOSITORY,
      useFactory: (dataSource: DataSource) =>
        new TenantRepositoryTypeOrmAdapter(dataSource),
      inject: [DatabaseProvidersSymbols.DATA_SOURCE],
    };
  }
}
