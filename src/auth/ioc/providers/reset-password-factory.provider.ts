import { FactoryProvider } from '@nestjs/common';
import { PasswordResetUseCase } from '~/auth/application/use-case/password-reset.use-case';
import { IPasswordHashService } from '~/auth/infra/contracts/services/password-hash-service.contract';
import { AuthProvidersSymbols } from '~/auth/ioc/auth-providers.symbols';
import { DatabaseProvidersSymbols } from '~/shared/infra/database/ioc/providers/provider.symbols';
import { IUserRepository } from '~/users/infra/contracts/repository/user-repository.contract';

export class ResetPasswordProviderFactory {
  static register(): FactoryProvider {
    return {
      provide: AuthProvidersSymbols.PASSWORD_RESET_USE_CASE,
      useFactory: (
        userRepository: IUserRepository,
        passwordHash: IPasswordHashService,
      ) => new PasswordResetUseCase(userRepository, passwordHash),
      inject: [
        DatabaseProvidersSymbols.USER_REPOSITORY,
        AuthProvidersSymbols.PASSWORD_HASH_SERVICE,
      ],
    };
  }
}
