import { DataSource } from 'typeorm';
import { DatabaseProvidersSymbols } from '~/shared/infra/database/ioc/providers/provider.symbols';
import { UserRepository } from '~/shared/infra/database/repositories/users.repository';

export class UserRepositoryProviderFactory {
  static register() {
    return {
      provide: DatabaseProvidersSymbols.USER_REPOSITORY,
      useFactory: (dataSource: DataSource) => new UserRepository(dataSource),
      inject: [DatabaseProvidersSymbols.DATA_SOURCE],
    };
  }
}
