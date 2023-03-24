import { FactoryProvider } from '@nestjs/common';
import { SignInUseCase } from '~/auth/application/use-case/sign-in.use-case';
import { AuthProvidersSymbols } from '~/auth/ioc/providers/auth-providers.symbols';
import { DatabaseProvidersSymbols } from '~/shared/infra/database/ioc/providers/provider.symbols';

export class SignInUseCaseProviderFactory {
  static register(): FactoryProvider {
    return {
      provide: AuthProvidersSymbols.SIGN_IN_USE_CASE,
      useFactory: (findUser: any, authSignInService: any) =>
        new SignInUseCase(findUser, authSignInService),
      inject: [
        DatabaseProvidersSymbols.USER_REPOSITORY,
        AuthProvidersSymbols.AUTH_SIGN_IN_SERVICE,
      ],
    };
  }
}
