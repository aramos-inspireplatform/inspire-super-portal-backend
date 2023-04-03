import { FactoryProvider } from '@nestjs/common';
import { SignInUseCase } from '~/auth/application/use-case/sign-in.use-case';
import { IJsonWebTokensGenerator } from '~/auth/infra/contracts/services/json-web-tokens-service.contract';
import { IPasswordHashService } from '~/auth/infra/contracts/services/password-hash-service.contract';
import { AuthProvidersSymbols } from '~/auth/ioc/auth-providers.symbols';
import { DatabaseProvidersSymbols } from '~/shared/infra/database/ioc/providers/provider.symbols';
import { IUserLoginsRepository } from '~/users/infra/contracts/repository/user-logins-repository.contract';
import { IUserRepository } from '~/users/infra/contracts/repository/user-repository.contract';

export class SignInUseCaseProviderFactory {
  static register(): FactoryProvider {
    return {
      provide: AuthProvidersSymbols.SIGN_IN_USE_CASE,
      useFactory: (
        userRepository: IUserRepository,
        passwordHashService: IPasswordHashService,
        accessTokenJwtService: IJsonWebTokensGenerator,
        refreshTokenJwtService: IJsonWebTokensGenerator,
        userLoginsRepository: IUserLoginsRepository,
      ) =>
        new SignInUseCase(
          userRepository,
          passwordHashService,
          accessTokenJwtService,
          refreshTokenJwtService,
          userLoginsRepository,
        ),
      inject: [
        DatabaseProvidersSymbols.USER_REPOSITORY,
        AuthProvidersSymbols.PASSWORD_HASH_SERVICE,
        AuthProvidersSymbols.JWT_ACCESS_TOKEN_SERVICE,
        AuthProvidersSymbols.JWT_REFRESH_TOKEN_SERVICE,
        DatabaseProvidersSymbols.USER_LOGINS_REPOSITORY,
        ,
      ],
    };
  }
}
