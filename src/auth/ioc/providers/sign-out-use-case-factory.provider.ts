import { FactoryProvider } from '@nestjs/common';
import { SignOutUseCase } from '~/auth/application/use-case/sign-out.use-case';
import { AuthProvidersSymbols } from '~/auth/ioc/auth-providers.symbols';
import { DatabaseProvidersSymbols } from '~/shared/infra/database/ioc/providers/provider.symbols';
import { IUserRepository } from '~/users/infra/contracts/repository/user-repository.contract';

export class SignOutUseCaseFactoryProviderFactory {
  static register(): FactoryProvider {
    return {
      provide: AuthProvidersSymbols.SIGN_OUT_USE_CASE,
      useFactory: (userRepository: IUserRepository) =>
        new SignOutUseCase(userRepository),
      inject: [DatabaseProvidersSymbols.USER_REPOSITORY],
    };
  }
}
