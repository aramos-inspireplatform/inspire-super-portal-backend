import { FactoryProvider } from '@nestjs/common';
import { IJsonWebTokensGenerator } from '~/auth/infra/contracts/services/json-web-tokens-service.contract';
import { AuthProvidersSymbols } from '~/auth/ioc/auth-providers.symbols';
import { JwtAuthStrategy } from '~/auth/ioc/guards/jwt/auth.strategy';
import { DatabaseProvidersSymbols } from '~/shared/infra/database/ioc/providers/provider.symbols';
import { IUserRepository } from '~/users/infra/contracts/repository/user-repository.contract';

export class JwtAuthStrategyProviderFactory {
  static register(): FactoryProvider {
    return {
      provide: Symbol('JwtAuthStrategy'),
      useFactory: (
        accessTokenJwtService: IJsonWebTokensGenerator,
        userRepository: IUserRepository,
      ) => new JwtAuthStrategy(accessTokenJwtService, userRepository),
      inject: [
        AuthProvidersSymbols.JWT_ACCESS_TOKEN_SERVICE,
        DatabaseProvidersSymbols.USER_REPOSITORY,
      ],
    };
  }
}
