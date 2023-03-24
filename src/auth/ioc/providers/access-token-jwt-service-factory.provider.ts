import { FactoryProvider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtAccessTokenService } from '~/auth/infra/json-web-tokens/jwt-access-token.service';
import { AuthProvidersSymbols } from '~/auth/ioc/providers/auth-providers.symbols';

export class AccessTokenJwtServiceProviderFactory {
  static register(): FactoryProvider {
    return {
      provide: AuthProvidersSymbols.JWT_ACCESS_TOKEN_SERVICE,
      useFactory: (configService: ConfigService) =>
        new JwtAccessTokenService(
          configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET'),
          configService.getOrThrow('JWT_ACCESS_TOKEN_EXPIRES_IN'),
          configService.getOrThrow('JWT_ACCESS_TOKEN_ISSUER'),
        ),
      inject: [ConfigService],
    };
  }
}
