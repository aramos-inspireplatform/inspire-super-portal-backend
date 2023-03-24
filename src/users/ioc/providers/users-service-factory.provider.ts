import { FactoryProvider } from '@nestjs/common';
import { DatabaseProvidersSymbols } from '~/shared/infra/database/ioc/providers/provider.symbols';
import { UsersService } from '~/users/application/services/users.service';
import { UsersProvidersSymbols } from '~/users/ioc/providers/users-providers.symbols';

export class UsersServiceProviderFactory {
  static register(): FactoryProvider {
    return {
      provide: UsersProvidersSymbols.USERS_SERVICE,
      useFactory: (userRepository) => new UsersService(userRepository),
      inject: [DatabaseProvidersSymbols.USER_REPOSITORY],
    };
  }
}
