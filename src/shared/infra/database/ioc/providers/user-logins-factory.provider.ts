import { FactoryProvider } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { DatabaseProvidersSymbols } from '~/shared/infra/database/ioc/providers/provider.symbols';
import { UserLoginsRepository } from '~/shared/infra/database/repositories/auth-logins.repository';

export class UserLoginsProviderFactory {
  static register(): FactoryProvider {
    return {
      provide: DatabaseProvidersSymbols.USER_LOGINS_REPOSITORY,
      useFactory: (dataSource: DataSource) =>
        new UserLoginsRepository(dataSource),
      inject: [DatabaseProvidersSymbols.DATA_SOURCE],
    };
  }
}
