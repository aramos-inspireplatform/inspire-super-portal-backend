import { FactoryProvider } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { DatabaseProvidersSymbols } from '~/shared/infra/database/ioc/providers/provider.symbols';
import { UserRepositoriesSymbols } from '~/shared/infra/database/ioc/providers/users/users-repositories.symbols';
import { UserRepositoryTypeOrmAdapter } from '~/shared/infra/database/repositories/user.repository';

export class UserRepositoryFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: UserRepositoriesSymbols.GLOBAL_USER_REPOSITORY,
      useFactory: (dataSource: DataSource) =>
        new UserRepositoryTypeOrmAdapter(dataSource),
      inject: [DatabaseProvidersSymbols.DATA_SOURCE],
    };
  }
}
