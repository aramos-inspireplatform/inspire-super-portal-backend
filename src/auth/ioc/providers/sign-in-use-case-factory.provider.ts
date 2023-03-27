import { FactoryProvider } from '@nestjs/common';
import { SignInUseCase } from '~/auth/application/use-case/sign-in.use-case';
import { IJsonWebTokensService } from '~/auth/infra/contracts/services/json-web-tokens-service.contract';
import { IPasswordHashService } from '~/auth/infra/contracts/services/password-hash-service.contract';
import { AuthProvidersSymbols } from '~/auth/ioc/providers/auth-providers.symbols';
import { DatabaseProvidersSymbols } from '~/shared/infra/database/ioc/providers/provider.symbols';
import { IUserRepository } from '~/users/infra/contracts/repository/user-repository.contract';

export class SignInUseCaseProviderFactory {
  static register(): FactoryProvider {
    return {
      provide: AuthProvidersSymbols.SIGN_IN_USE_CASE,
      useFactory: (
        userRepository: IUserRepository,
        passwordHashService: IPasswordHashService,
        accessTokenJwtService: IJsonWebTokensService,
        refreshTokenJwtService: IJsonWebTokensService,
      ) =>
        new SignInUseCase(
          userRepository,
          passwordHashService,
          accessTokenJwtService,
          refreshTokenJwtService,
        ),
      inject: [
        DatabaseProvidersSymbols.USER_REPOSITORY,
        AuthProvidersSymbols.PASSWORD_HASH_SERVICE,
        AuthProvidersSymbols.JWT_ACCESS_TOKEN_SERVICE,
        AuthProvidersSymbols.JWT_REFRESH_TOKEN_SERVICE,
      ],
    };
  }
}
