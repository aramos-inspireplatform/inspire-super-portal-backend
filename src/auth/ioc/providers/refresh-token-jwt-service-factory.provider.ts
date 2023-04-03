import { FactoryProvider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtAccessTokenService } from '~/auth/infra/json-web-tokens/jwt-access-token';
import { AuthProvidersSymbols } from '~/auth/ioc/auth-providers.symbols';

export class RefreshTokenJwtServiceProviderFactory {
  static register(): FactoryProvider {
    return {
      provide: AuthProvidersSymbols.JWT_REFRESH_TOKEN_SERVICE,
      useFactory: (configService: ConfigService) =>
        new JwtAccessTokenService(
          configService.getOrThrow('JWT_REFRESH_TOKEN_SECRET'),
          configService.getOrThrow('JWT_REFRESH_TOKEN_EXPIRES_IN'),
          configService.getOrThrow('JWT_REFRESH_TOKEN_ISSUER'),
        ),
      inject: [ConfigService],
    };
  }
}
